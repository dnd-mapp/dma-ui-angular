import {
    AnimationCallbackEvent,
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    inject,
    input,
    signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map, pairwise, tap, timer } from 'rxjs';
import { TOOLTIP_CONFIG, TooltipConfig } from './providers';
import { TooltipState, TooltipStates } from './tooltip-state';

@Component({
    selector: 'dma-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrl: './tooltip.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class TooltipComponent {
    private readonly destroyRef = inject(DestroyRef);
    private readonly tooltipConfig = inject<TooltipConfig>(TOOLTIP_CONFIG);

    public readonly label = input.required<string>();

    public readonly state = signal<TooltipState>(TooltipStates.HIDDEN);

    public readonly hidden = computed(() => this.state() === TooltipStates.HIDDEN);

    protected readonly showing = computed(() =>
        [TooltipStates.SHOWING, TooltipStates.SHOWN].some((state) => state === this.state()),
    );

    private readonly previousState = new BehaviorSubject<TooltipState>(this.state());

    constructor() {
        toObservable(this.state)
            .pipe(
                pairwise(),
                map((states) => states[0]),
                tap((state) => this.previousState.next(state)),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }

    protected onEnter(event: AnimationCallbackEvent) {
        timer(this.tooltipConfig.enterDelay)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => this.onEnterCompleted(event),
            });
    }

    protected onLeave(event: AnimationCallbackEvent) {
        if (this.previousState.value === TooltipStates.SHOWING) {
            this.onLeaveCompleted(event);
            return;
        }
        timer(this.tooltipConfig.leaveDelay)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => this.onLeaveCompleted(event),
            });
    }

    private onEnterCompleted(event: AnimationCallbackEvent) {
        event.animationComplete();
        this.state.set(TooltipStates.SHOWN);
    }

    private onLeaveCompleted(event: AnimationCallbackEvent) {
        event.animationComplete();
        this.state.set(TooltipStates.HIDDEN);
    }
}
