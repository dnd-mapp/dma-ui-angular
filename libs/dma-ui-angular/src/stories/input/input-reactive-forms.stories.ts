import { JsonPipe } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '@dnd-mapp/dma-ui-angular';
import { Meta, StoryObj } from '@storybook/angular';
import { storyWrapper } from '../story-wrapper';

@Component({
    selector: 'dma-input-reactive-forms-story',
    templateUrl: './input-reactive-forms-story.component.html',
    styleUrl: './input-reactive-forms-story.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, InputComponent, JsonPipe],
})
class InputReactiveFormStoryComponent {
    private readonly formBuilder = inject(FormBuilder);
    private readonly destroyRef = inject(DestroyRef);

    public readonly disabled = input(false, { transform: booleanAttribute });

    public readonly value = input<string>();

    protected readonly form = this.formBuilder.group({
        input: this.formBuilder.control(''),
    });

    constructor() {
        toObservable(this.disabled)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (disabled) => this.toggleDisabled(disabled),
            });

        toObservable(this.value)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (value) => this.form.controls.input.setValue(value),
            });
    }

    private toggleDisabled(disabled: boolean) {
        if (disabled) this.form.controls.input.disable();
        else this.form.controls.input.enable();
    }
}

const metadata = {
    args: {
        disabled: false,
        value: undefined as string,
    },
    argTypes: {
        value: {
            type: {
                name: 'string',
            },
        },
    },
    component: InputReactiveFormStoryComponent,
    decorators: [storyWrapper({ position: 'top-start' })],
    title: 'Input/Text Input',
} satisfies Meta<InputReactiveFormStoryComponent>;

export default metadata;

type Story = StoryObj<InputReactiveFormStoryComponent>;

export const ReactiveForms = {} satisfies Story;
