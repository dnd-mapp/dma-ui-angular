import { Component, inject, signal, Type } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { createTestEnvironment, InputHarness } from '@dnd-mapp/dma-ui-angular/test';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
    @Component({
        template: ` <dma-input
            [label]="label()"
            [hideLabel]="hideLabel()"
            [value]="value()"
            [placeholder]="placeholder()"
            [disabled]="disabled()"
            [readonly]="readonly()"
            (valueChange)="onValueChange($event)"
        />`,
        imports: [InputComponent],
    })
    class TestComponent {
        public readonly label = signal('My label');

        public readonly hideLabel = signal(false);

        public readonly value = signal('');

        public readonly placeholder = signal('');

        public readonly readonly = signal(false);

        public readonly disabled = signal(false);

        public valueHasChanged = false;

        protected onValueChange(value: string) {
            this.value.set(value);
            this.valueHasChanged = false;
        }
    }

    @Component({
        template: `<form [formGroup]="form"><dma-input label="My label" formControlName="input" /></form>`,
        imports: [InputComponent, ReactiveFormsModule],
    })
    class InputFormTestComponent {
        private readonly formBuilder = inject(FormBuilder);

        public readonly form = this.formBuilder.group({
            input: this.formBuilder.control(''),
        });
    }

    interface SetupTestParams<C> {
        component: Type<C>;
        label?: string;
        hideLabel?: boolean;
        value?: string;
        placeholder?: string;
        readonly?: boolean;
        disabled?: boolean;
    }

    async function setupTest<C>(params: SetupTestParams<C>) {
        const { harness, component } = await createTestEnvironment({
            testComponent: params.component,
            harness: InputHarness,
        });

        if (component instanceof TestComponent) {
            if (params.label) {
                component.label.set(params.label);
            }
            if (params.hideLabel !== undefined) {
                component.hideLabel.set(params.hideLabel);
            }
            if (params.value) {
                component.value.set(params.value);
            }
            if (params.placeholder) {
                component.placeholder.set(params.placeholder);
            }
            if (params.readonly !== undefined) {
                component.readonly.set(params.readonly);
            }
            if (params.disabled !== undefined) {
                component.disabled.set(params.disabled);
            }
        }
        if (component instanceof InputFormTestComponent) {
            if (params.disabled !== undefined) {
                component.form.controls.input.disable();
            }
        }
        return {
            harness: harness,
            component: component,
        };
    }

    it('should create', async () => {
        const { harness } = await setupTest({ component: TestComponent });

        expect(await harness.isLabelVisible()).toEqual(true);
        expect(await harness.label()).toEqual('My label');
        expect(await harness.value()).toEqual('');
    });

    it('should hide the label', async () => {
        const { harness } = await setupTest({ component: TestComponent, hideLabel: true });

        expect(await harness.isLabelVisible()).toEqual(false);
    });

    it('should set placeholder', async () => {
        const { harness } = await setupTest({ component: TestComponent, placeholder: 'Type some text here...' });

        expect(await harness.placeholder()).toEqual('Type some text here...');
    });

    it('should set value through API', async () => {
        const { harness, component } = await setupTest({ component: TestComponent });

        expect(await harness.value()).toEqual('');
        expect(component.valueHasChanged).toEqual(false);

        component.value.set('Hello world');

        expect(await harness.value()).toEqual('Hello world');
        expect(component.valueHasChanged).toEqual(false);
    });

    it('should set disabled state', async () => {
        const { harness, component } = await setupTest({ component: TestComponent, disabled: true });

        expect(await harness.isDisabled()).toEqual(true);
        expect(await harness.value()).toEqual('');

        await harness.typeText('Hello World');

        expect(await harness.value()).toEqual('');

        component.disabled.set(false);
        await harness.typeText('Hello World');

        expect(await harness.value()).toEqual('Hello World');
    });

    it('should set readonly state', async () => {
        const { harness, component } = await setupTest({
            component: TestComponent,
            readonly: true,
            value: 'Hello World',
        });

        expect(await harness.isReadonly()).toEqual(true);
        expect(await harness.value()).toEqual('Hello World');

        await harness.typeText(' from outer space');

        expect(await harness.value()).toEqual('Hello World');

        component.readonly.set(false);
        await harness.typeText(' from outer space');

        expect(await harness.value()).toEqual('Hello World from outer space');
    });

    describe('FormControl', () => {
        it('should setup the form control correctly', async () => {
            const { harness } = await setupTest({ component: InputFormTestComponent });

            expect(await harness.value()).toEqual('');
        });

        it('should set disabled through the form', async () => {
            const { harness, component } = await setupTest({ component: InputFormTestComponent, disabled: true });

            expect(await harness.isDisabled()).toEqual(true);
            expect(await harness.value()).toEqual('');

            await harness.typeText('Hello World');

            expect(await harness.value()).toEqual('');

            component.form.controls.input.enable();
            await harness.typeText('Hello World');

            expect(await harness.value()).toEqual('Hello World');
        });

        it('should set value trough the form', async () => {
            const { harness, component } = await setupTest({ component: InputFormTestComponent });

            expect(await harness.value()).toEqual('');

            component.form.controls.input.setValue('Hello World');
            expect(await harness.value()).toEqual('Hello World');
        });

        it('should set value of the form through the control', async () => {
            const { harness, component } = await setupTest({ component: InputFormTestComponent });

            expect(component.form.value).toEqual({ input: '' });

            await harness.typeText('Hello World');

            expect(component.form.value).toEqual({ input: 'Hello World' });
        });
    });
});
