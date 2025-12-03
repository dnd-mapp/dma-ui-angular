import { Component, signal } from '@angular/core';
import { ButtonHarness, createTestEnvironment } from '@dnd-mapp/dma-ui-angular/test';
import { ButtonSizes, DEFAULT_BUTTON_SIZE } from './button-size';
import { ButtonTypes, DEFAULT_BUTTON_TYPE } from './button-type';
import { ButtonComponent } from './button.component';

describe.skip('ButtonComponent', () => {
    @Component({
        template: `<button [dma-button]="type()" [size]="size()">My Button</button>`,
        imports: [ButtonComponent],
    })
    class TestComponent {
        public readonly type = signal<string>(DEFAULT_BUTTON_TYPE);

        public readonly size = signal<string>(DEFAULT_BUTTON_SIZE);
    }

    interface SetupTestParams {
        type?: string;
        size?: string;
    }

    async function setupTest(params: SetupTestParams = {}) {
        const { harness, component } = await createTestEnvironment({
            testComponent: TestComponent,
            harness: ButtonHarness,
        });

        if (params.type) {
            component.type.set(params.type);
        }
        if (params.size) {
            component.size.set(params.size);
        }
        return {
            harness: harness,
            component: component,
        };
    }

    it('should set the button type', async () => {
        const { harness, component } = await setupTest({ type: ButtonTypes.SECONDARY });

        expect(await harness.type()).toEqual(ButtonTypes.SECONDARY);

        component.type.set('INCORRECT');
        expect(await harness.type()).toEqual(DEFAULT_BUTTON_TYPE);
    });

    it('should set the button size', async () => {
        const { harness, component } = await setupTest({ size: ButtonSizes.SMALL });

        expect(await harness.size()).toEqual(ButtonSizes.SMALL);

        component.size.set('INCORRECT');
        expect(await harness.size()).toEqual(DEFAULT_BUTTON_SIZE);
    });
});
