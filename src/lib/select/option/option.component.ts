import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    ElementRef,
    inject,
    input,
    output,
    signal,
    viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Component({
    selector: 'dma-option',
    templateUrl: './option.component.html',
    styleUrl: './option.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.selected]': 'selectedAttr()',
        '[attr.value]': 'value()',
        '(click)': 'onSelect()',
    },
    imports: [],
})
export class OptionComponent {
    private readonly destroyRef = inject(DestroyRef);

    public readonly value = input<unknown>(null);

    public readonly selected = input(false, { transform: booleanAttribute });

    public readonly selectedChange = output<boolean>();

    public readonly isSelected = signal(false);

    public readonly labelRef = viewChild('label', { read: ElementRef<HTMLElement> });

    public readonly label = computed(() => this.labelRef().nativeElement.textContent);

    protected readonly selectedAttr = computed(() => (this.isSelected() ? '' : undefined));

    constructor() {
        toObservable(this.selected)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (selected) => this.isSelected.set(selected),
            });
    }

    protected onSelect() {
        this.isSelected.set(true);
        this.selectedChange.emit(this.selected());
    }
}
