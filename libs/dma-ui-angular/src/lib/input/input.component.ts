import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ExistingProvider,
    forwardRef,
    inject,
    input,
    output,
    signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

function provideValueAccessor(): ExistingProvider {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true,
    };
}

@Component({
    selector: 'dma-input',
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor()],
    imports: [],
})
export class InputComponent implements ControlValueAccessor {
    private readonly destroyRef = inject(DestroyRef);

    public readonly label = input.required<string>();

    public readonly hideLabel = input(false, { transform: booleanAttribute });

    public readonly placeholder = input<string>();

    public readonly value = input<string>('');

    public readonly valueChange = output<string>();

    public readonly disabled = input(false, { transform: booleanAttribute });

    public readonly readonly = input(false, { transform: booleanAttribute });

    public readonly inputValue = signal<string>('');

    public readonly isDisabled = signal(false);

    public readonly isReadonly = signal(false);

    protected ngOnTouched?: () => void;

    private ngOnChange?: (value: string) => void;

    constructor() {
        toObservable(this.value)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (value) => this.inputValue.set(value),
            });

        toObservable(this.disabled)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (disabled) => this.isDisabled.set(disabled),
            });

        toObservable(this.readonly)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (readonly) => this.isReadonly.set(readonly),
            });
    }

    public writeValue(value: string) {
        this.inputValue.set(value);
    }

    public setDisabledState(isDisabled: boolean) {
        this.isDisabled.set(isDisabled);
    }

    public registerOnTouched(fn: () => void) {
        this.ngOnTouched = fn;
    }

    public registerOnChange(fn: (value: string) => void) {
        this.ngOnChange = fn;
    }

    protected onValueChange(value: string) {
        this.inputValue.set(value);
        this.valueChange.emit(value);

        if (this.ngOnChange) this.ngOnChange(value);
    }

    protected onBlur() {
        if (this.ngOnTouched) this.ngOnTouched();
    }
}
