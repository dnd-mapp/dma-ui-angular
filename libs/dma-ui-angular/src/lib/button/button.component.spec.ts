import { Component } from '@angular/core';
import { ButtonHarness, createTestEnvironment } from '@dnd-mapp/dma-ui-angular/test';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
    @Component({
        template: `<button dma-button>My Button</button>`,
        imports: [ButtonComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await createTestEnvironment({
            testComponent: TestComponent,
            harness: ButtonHarness,
        });

        return {
            harness: harness,
        };
    }

    it('should create', async () => {
        const { harness } = await setupTest();
        expect(harness).toBeDefined();
    });
});
