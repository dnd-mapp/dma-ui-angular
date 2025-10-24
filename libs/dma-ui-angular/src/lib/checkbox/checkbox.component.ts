import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    inject,
    input,
    output,
    signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { SoCheckIconComponent, SoMinusIconComponent } from '../icons';

@Component({
    selector: 'dma-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.checked]': 'checkedAttribute()',
        '[attr.indeterminate]': 'indeterminateAttribute()',
        '[attr.disabled]': 'disableAttribute()',
        '(click)': 'onToggle()',
        '(mouseenter)': 'onMouseenter()',
        '(mouseleave)': 'onMouseleave()',
    },
    imports: [SoMinusIconComponent, SoCheckIconComponent],
})
export class CheckboxComponent {
    private readonly destroyRef = inject(DestroyRef);

    public readonly label = input<string>(null);

    public readonly value = input<string>(undefined);

    public readonly checked = input(false, { transform: booleanAttribute });

    public readonly checkedChange = output<boolean>();

    public readonly indeterminate = input(false, { transform: booleanAttribute });

    public readonly indeterminateChange = output<boolean>();

    public readonly disabled = input(false, { transform: booleanAttribute });

    public readonly isChecked = signal(false);

    public readonly isIndeterminate = signal(false);

    public readonly isDisabled = signal(false);

    public readonly checkboxValue = signal<string>(undefined);

    protected readonly checkedAttribute = computed(() => (this.isChecked() ? '' : undefined));

    protected readonly indeterminateAttribute = computed(() =>
        this.isIndeterminate() && !this.overwriteIndeterminate ? '' : undefined,
    );

    protected readonly disableAttribute = computed(() => (this.isDisabled() ? '' : undefined));

    protected readonly hasLabel = computed(() => Boolean(this.label()));

    protected overwriteIndeterminate = false;

    constructor() {
        toObservable(this.checked)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (checked) => this.isChecked.set(checked),
            });

        toObservable(this.indeterminate)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (indeterminate) => this.isIndeterminate.set(indeterminate),
            });

        toObservable(this.disabled)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (disabled) => this.isDisabled.set(disabled),
            });

        toObservable(this.value)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (value) => this.checkboxValue.set(value),
            });
    }

    protected onToggle() {
        if (this.isDisabled()) return;

        if (this.isIndeterminate()) {
            this.isIndeterminate.set(false);
            this.overwriteIndeterminate = false;
            this.indeterminateChange.emit(this.isIndeterminate());
        }
        this.isChecked.update((checked) => !checked);
        this.checkedChange.emit(this.isChecked());
    }

    protected onMouseenter() {
        if (!this.isIndeterminate()) return;
        this.overwriteIndeterminate = true;
    }

    protected onMouseleave() {
        if (!this.isIndeterminate() && !this.overwriteIndeterminate) return;
        this.overwriteIndeterminate = false;
    }
}
