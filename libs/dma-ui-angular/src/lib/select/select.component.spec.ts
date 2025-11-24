import { Component, Type } from '@angular/core';
import { createTestEnvironment, SelectHarness } from '@dnd-mapp/dma-ui-angular/test';
import { OptionComponent } from './option/option.component';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
    @Component({
        template: `
            <dma-select>
                <dma-option value="option-1">Option 1</dma-option>
                <dma-option value="option-2">Option 2</dma-option>
                <dma-option value="option-3">Option 3</dma-option>
                <dma-option value="option-4">Option 4</dma-option>
            </dma-select>
        `,
        imports: [SelectComponent, OptionComponent],
    })
    class TestComponent {}

    @Component({
        template: `
            <dma-select (valueChange)="onSelectionChange()">
                <dma-option value="option-1">Option 1</dma-option>
                <dma-option value="option-2">Option 2</dma-option>
                <dma-option value="option-3" selected>Option 3</dma-option>
                <dma-option value="option-4">Option 4</dma-option>
            </dma-select>
        `,
        imports: [SelectComponent, OptionComponent],
    })
    class SelectedOptionTestComponent {
        public selectionChanged = false;

        protected onSelectionChange() {
            this.selectionChanged = true;
        }
    }

    interface SetupTestParams<T> {
        component: Type<T>;
    }

    async function setupTest<T>(params: SetupTestParams<T>) {
        const { harness, harnessLoader, fixture, component } = await createTestEnvironment({
            testComponent: params.component,
            harness: SelectHarness,
        });

        return {
            harness: harness,
            harnessLoader: harnessLoader,
            fixture: fixture,
            component: component,
        };
    }

    it('should select the first value if none selected initially', async () => {
        const { harness } = await setupTest({ component: TestComponent });

        expect(await harness.value()).toEqual('Option 1');
    });

    it('should start with initial selected value', async () => {
        const { harness } = await setupTest({ component: SelectedOptionTestComponent });

        expect(await harness.value()).toEqual('Option 3');

        await harness.toggleOpen();

        expect(await harness.optionsContainerVisible()).toEqual(true);

        const optionHarness = await harness.selectedOption();
        expect(await optionHarness.label()).toEqual('Option 3');
    });

    it('should change selected a value', async () => {
        const { harness } = await setupTest({ component: SelectedOptionTestComponent });

        expect(await harness.value()).toEqual('Option 3');

        await harness.toggleOpen();
        await harness.selectOptionByIndex(0);

        expect(await harness.optionsContainerVisible()).toEqual(false);
        expect(await harness.value()).toEqual('Option 1');
    });

    it('should close on click outside of host element', async () => {
        const { harness, fixture } = await setupTest({ component: TestComponent });

        await harness.toggleOpen();

        expect(await harness.optionsContainerVisible()).toEqual(true);

        (fixture.nativeElement as HTMLElement).click();
        fixture.detectChanges();

        expect(await harness.optionsContainerVisible()).toEqual(false);
    });

    it('should not emit selection change when selecting selected option', async () => {
        const { harness, component } = await setupTest({ component: SelectedOptionTestComponent });

        expect(component.selectionChanged).toEqual(false);

        await harness.toggleOpen();
        await harness.selectOptionByIndex(2);

        expect(component.selectionChanged).toEqual(false);
    });
});
