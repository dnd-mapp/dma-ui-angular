import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChildren,
    DestroyRef,
    ElementRef,
    inject,
    input,
    output,
    signal,
    TemplateRef,
    viewChild,
    ViewContainerRef,
} from '@angular/core';
import { outputToObservable, takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { map, merge, switchMap } from 'rxjs';
import { BaseContainerComponent } from '../base-container';
import { SoChevronDownIconComponent, SoChevronUpIconComponent } from '../icons';
import { OptionComponent } from './option/option.component';
import {
    PanelPosition,
    PanelPositionByClass,
    PanelPositions,
    PositionPanelClass,
    selectPositions,
} from './select.positions';

@Component({
    selector: 'dma-select',
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.open]': 'isOpen()',
        '[class]': 'panelPositionedAt()',
        '(window:click)': 'onWindowClick($event)',
    },
    imports: [SoChevronUpIconComponent, SoChevronDownIconComponent, BaseContainerComponent],
})
export class SelectComponent implements AfterContentInit, AfterViewInit {
    private readonly overlay = inject(Overlay);
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly destroyRef = inject(DestroyRef);

    public readonly label = input<string>(null);

    public readonly valueChange = output<unknown>();

    public readonly value = computed(() => this.selectedOption().value());

    protected readonly hasLabel = computed(() => Boolean(this.label()));

    protected readonly isOpen = signal(false);

    protected readonly displayValue = computed(() => this.selectedOption().label());

    protected readonly hasOptions = computed(() => this.options().length > 0);

    protected readonly panelPositionedAt = signal<PanelPosition>(PanelPositions.BELOW);

    private readonly overlayOriginRef = viewChild.required('origin', { read: ElementRef<HTMLElement> });

    private readonly overlayTemplateRef = viewChild.required('overlay', { read: TemplateRef });

    private readonly options = contentChildren(OptionComponent);

    private readonly selectedOption = signal<OptionComponent>(null);

    private readonly hasOptionSelected = computed(() => Boolean(this.selectedOption()));

    private overlayRef: OverlayRef = null;

    private width: string;

    constructor() {
        toObservable(this.options)
            .pipe(
                switchMap((options) =>
                    merge(
                        ...options.map((option) => outputToObservable(option.selectedChange).pipe(map(() => option))),
                    ),
                ),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe({
                next: (option) => this.onOptionSelected(option),
            });
    }

    public ngAfterContentInit() {
        this.selectedOption.set(this.findSelectedOption());

        if (!this.hasOptionSelected() && this.hasOptions()) {
            this.selectOption(this.options()[0]);
        }
    }

    public ngAfterViewInit() {
        this.getWidth();
    }

    protected onWindowClick(event: PointerEvent) {
        if (!this.isOpen() || !this.isClickOutsideSelect(event.target)) return;
        this.onToggleOpen();
    }

    protected onToggleOpen() {
        if (this.isOpen()) this.close();
        else this.open();
    }

    private open() {
        this.isOpen.set(true);

        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.overlayOriginRef())
            .withLockedPosition(false)
            .withGrowAfterOpen(true)
            .withViewportMargin(16)
            .withPositions(selectPositions);

        this.overlayRef = this.overlay.create({
            positionStrategy: positionStrategy,
            width: this.width,
        });

        positionStrategy.positionChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (positionChange) =>
                this.panelPositionedAt.set(
                    PanelPositionByClass[positionChange.connectionPair.panelClass as PositionPanelClass],
                ),
        });

        this.overlayRef.attach(new TemplatePortal(this.overlayTemplateRef(), this.viewContainerRef));
    }

    private close() {
        this.isOpen.set(false);

        this.overlayRef.dispose();
        this.overlayRef = null;
    }

    private findSelectedOption() {
        return this.options().find((option) => option.isSelected()) ?? null;
    }

    private selectOption(option: OptionComponent) {
        if (this.hasOptionSelected()) {
            this.selectedOption().isSelected.set(false);
        }
        if (!option.isSelected()) {
            option.isSelected.set(true);
        }
        this.selectedOption.set(option);
    }

    private getWidth() {
        const widthPx = this.overlayOriginRef().nativeElement.getBoundingClientRect().width;

        const widthEm = widthPx / 16;
        this.width = `${widthEm}em`;
    }

    private onOptionSelected(option: OptionComponent) {
        this.close();

        if (this.value() === option.value()) return;
        this.selectOption(option);
        this.valueChange.emit(this.value());
    }

    private isClickOutsideSelect(target: EventTarget) {
        let element = target as HTMLElement;

        while (element.tagName !== 'DMA-SELECT') {
            element = element.parentElement;
            if (element === null) break;
        }
        return element === null;
    }
}
