import { Component, inject, signal, Type } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CheckboxHarness, createTestEnvironment } from '@dnd-mapp/dma-ui-angular/test';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
    @Component({
        template: `<dma-checkbox
            label="My checkbox"
            value="My value"
            [checked]="checked()"
            [indeterminate]="indeterminate()"
            [disabled]="disabled()"
            (checkedChange)="onCheckedChange()"
            (indeterminateChange)="onIndeterminateChange()"
        />`,
        imports: [CheckboxComponent],
    })
    class TestComponent {
        public readonly checked = signal(false);

        public readonly indeterminate = signal(false);

        public readonly disabled = signal(false);

        public checkHasChanged = false;

        public indeterminateHasChanged = false;

        protected onCheckedChange() {
            this.checkHasChanged = true;
        }

        protected onIndeterminateChange() {
            this.indeterminateHasChanged = true;
        }
    }

    @Component({
        template: `
            <form [formGroup]="form">
                <dma-checkbox label="My checkbox" value="Hello World" formControlName="checkbox" />
            </form>
        `,
        imports: [ReactiveFormsModule, CheckboxComponent],
    })
    class CheckboxFormTestComponent {
        private readonly formBuilder = inject(FormBuilder);

        public readonly form = this.formBuilder.group({
            checkbox: this.formBuilder.control(false),
        });
    }

    interface SetupTestParams<C> {
        component: Type<C>;
        checked?: boolean;
        indeterminate?: boolean;
        disabled?: boolean;
    }

    async function setupTest<C>(params: SetupTestParams<C>) {
        const { component, harness } = await createTestEnvironment({
            testComponent: params.component,
            harness: CheckboxHarness,
        });

        if (component instanceof TestComponent) {
            if (params.checked !== undefined) {
                component.checked.set(params.checked);
            }
            if (params.indeterminate !== undefined) {
                component.indeterminate.set(params.indeterminate);
            }
            if (params.disabled !== undefined) {
                component.disabled.set(params.disabled);
            }
        }
        return {
            component: component,
            harness: harness,
        };
    }

    it('should set checked state', async () => {
        const { harness, component } = await setupTest({ component: TestComponent });

        expect(await harness.isChecked()).toEqual(false);
        expect(component.checkHasChanged).toEqual(false);

        await harness.toggleChecked();
        expect(component.checkHasChanged).toEqual(true);
        expect(await harness.isChecked()).toEqual(true);

        await harness.toggleChecked();
        expect(await harness.isChecked()).toEqual(false);
    });

    it('should change properly from indeterminate state', async () => {
        const { harness, component } = await setupTest({ component: TestComponent });

        expect(await harness.isIndeterminate()).toEqual(false);
        expect(component.indeterminateHasChanged).toEqual(false);

        component.indeterminate.set(true);

        expect(await harness.isIndeterminate()).toEqual(true);
        expect(component.indeterminateHasChanged).toEqual(false);
        expect(component.checkHasChanged).toEqual(false);

        await harness.toggleChecked();
        expect(await harness.isChecked()).toEqual(true);
        expect(await harness.isIndeterminate()).toEqual(false);
        expect(component.checkHasChanged).toEqual(true);
        expect(component.indeterminateHasChanged).toEqual(true);

        await harness.toggleChecked();
        expect(await harness.isChecked()).toEqual(false);
        expect(await harness.isIndeterminate()).toEqual(false);
    });

    it('should overwrite indeterminate on hover to indicate next state', async () => {
        const { harness } = await setupTest({ component: TestComponent, indeterminate: true });

        expect(await harness.isMinusIconVisible()).toEqual(true);
        expect(await harness.isCheckIconVisible()).toEqual(false);

        await harness.hover();

        expect(await harness.isMinusIconVisible()).toEqual(false);
        expect(await harness.isCheckIconVisible()).toEqual(true);

        await harness.mouseAway();

        expect(await harness.isMinusIconVisible()).toEqual(true);
        expect(await harness.isCheckIconVisible()).toEqual(false);

        await harness.hover();
        await harness.toggleChecked();
        await harness.mouseAway();

        expect(await harness.isMinusIconVisible()).toEqual(false);
        expect(await harness.isCheckIconVisible()).toEqual(true);

        await harness.hover();
        expect(await harness.isCheckIconVisible()).toEqual(true);
    });

    it('should not toggle when disabled', async () => {
        const { harness } = await setupTest({ component: TestComponent, disabled: true });

        expect(await harness.isChecked()).toEqual(false);

        await harness.toggleChecked();
        expect(await harness.isChecked()).toEqual(false);
    });

    describe('FormControl', () => {
        it('should setup the form control correctly', async () => {
            const { harness, component } = await setupTest({ component: CheckboxFormTestComponent });

            expect(component.form.controls.checkbox.value).toEqual(false);
            expect(await harness.isChecked()).toEqual(false);

            await harness.toggleChecked();

            expect(component.form.controls.checkbox.value).toEqual(true);
            expect(await harness.isChecked()).toEqual(true);

            component.form.controls.checkbox.setValue(false);

            expect(component.form.controls.checkbox.value).toEqual(false);
            expect(await harness.isChecked()).toEqual(false);
        });

        it('should set disabled through form', async () => {
            const { harness, component } = await setupTest({ component: CheckboxFormTestComponent });

            expect(await harness.isDisabled()).toEqual(false);

            component.form.controls.checkbox.disable();

            expect(await harness.isDisabled()).toEqual(true);

            component.form.controls.checkbox.enable();

            expect(await harness.isDisabled()).toEqual(false);
        });
    });
});
