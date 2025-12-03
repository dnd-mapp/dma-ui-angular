import { Component, signal } from '@angular/core';
import { BaseContainerHarness, createTestEnvironment } from '@dnd-mapp/dma-ui-angular/test';
import { BaseContainerComponent } from './base-container.component';

describe('BaseContainerComponent', () => {
    @Component({
        template: `<dma-base-container [disabled]="disabled()" />`,
        imports: [BaseContainerComponent],
    })
    class TestComponent {
        public readonly disabled = signal(false);
    }

    async function setupTest() {
        const { harness, component } = await createTestEnvironment({
            testComponent: TestComponent,
            harness: BaseContainerHarness,
        });

        return {
            harness: harness,
            component: component,
        };
    }

    it('should set disabled attribute', async () => {
        const { harness, component } = await setupTest();

        expect(await harness.hasDisabledAttribute()).toEqual(false);

        component.disabled.set(true);
        expect(await harness.hasDisabledAttribute()).toEqual(true);
    });
});
