import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
    ComponentRef,
    computed,
    DestroyRef,
    Directive,
    ElementRef,
    inject,
    Injector,
    input,
    OnDestroy,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter, take } from 'rxjs';
import { tooltipVerticalOverlayPositions } from './tooltip-overlay.positions';
import { TooltipStates } from './tooltip-state';
import { TooltipComponent } from './tooltip.component';

@Directive({
    selector: '[dmaTooltip]',
    host: {
        '[attr.dmaTooltip]': 'label()',
        '(mouseenter)': 'show()',
        '(mouseleave)': 'hide()',
    },
})
export class TooltipAnchorDirective implements OnDestroy {
    private readonly overlay = inject(Overlay);
    private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly destroyRef = inject(DestroyRef);
    private readonly injector = inject(Injector);

    public readonly label = input<string>(null, { alias: 'dmaTooltip' });

    private readonly hasLabel = computed(() => Boolean(this.label()));

    private overlayRef: OverlayRef;

    private componentRef: ComponentRef<TooltipComponent>;

    public ngOnDestroy() {
        this.overlayRef?.dispose();
    }

    protected show() {
        if (!this.hasLabel()) return;
        if (this.overlayRef) {
            this.attachTooltip();
            return;
        }
        const scrollStrategy = this.overlay.scrollStrategies.reposition({ scrollThrottle: 100, autoClose: true });
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.elementRef)
            .withPositions(tooltipVerticalOverlayPositions)
            .withLockedPosition(false)
            .withViewportMargin(16)
            .withGrowAfterOpen(true);

        this.overlayRef = this.overlay.create({
            scrollStrategy: scrollStrategy,
            positionStrategy: positionStrategy,
            hasBackdrop: false,
            disposeOnNavigation: true,
        });

        this.attachTooltip();
    }

    protected hide() {
        if (!this.componentRef) return;
        this.componentRef.instance.state.set(TooltipStates.HIDING);

        toObservable(this.componentRef.instance.hidden, { injector: this.injector })
            .pipe(filter(Boolean), take(1), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => this.onTooltipHidden(),
            });
    }

    private attachTooltip() {
        this.componentRef = this.overlayRef.attach(new ComponentPortal(TooltipComponent));
        this.componentRef.setInput('label', this.label());

        this.componentRef.instance.state.set(TooltipStates.SHOWING);
    }

    private onTooltipHidden() {
        this.overlayRef.detach();
    }
}
