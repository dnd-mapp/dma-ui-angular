import { Component, signal } from '@angular/core';
import { createTestEnvironment, TooltipAnchorHarness } from '@dnd-mapp/dma-ui-angular/test';
import { provideTooltipConfig } from './providers';
import { TooltipAnchorDirective } from './tooltip-anchor.directive';

describe.skip('TooltipAnchorDirective', () => {
    @Component({
        template: `<p [dmaTooltip]="label()">My paragraph</p>`,
        imports: [TooltipAnchorDirective],
    })
    class TestComponent {
        public readonly label = signal<string>('My tooltip');
    }

    interface SetupTestParams {
        label?: string;
    }

    async function setupTest(params: SetupTestParams = {}) {
        const { component, harness } = await createTestEnvironment({
            testComponent: TestComponent,
            harness: TooltipAnchorHarness,
            providers: [provideTooltipConfig({ enterDelay: 0, leaveDelay: 0 })],
        });

        if (params.label !== undefined) {
            component.label.set(params.label);
        }
        return {
            harness: harness,
        };
    }

    it('should show tooltip', async () => {
        const { harness } = await setupTest();

        expect(await harness.tooltipVisible()).toEqual(false);

        await harness.mouseenter();
        expect(await harness.tooltipInserted()).toEqual(true);
        expect(await harness.tooltipVisible()).toEqual(false);

        await vi.waitUntil(async () => await harness.tooltipVisible());
        expect(await harness.tooltipVisible()).toEqual(true);

        await harness.mouseleave();
        await vi.waitUntil(async () => !(await harness.tooltipVisible()));

        expect(await harness.tooltipVisible()).toEqual(false);
        expect(await harness.tooltipInserted()).toEqual(false);

        // Show that reusing the overlayRef is possible.
        await harness.mouseenter();
        expect(await harness.tooltipInserted()).toEqual(true);
        expect(await harness.tooltipVisible()).toEqual(false);

        await vi.waitUntil(async () => await harness.tooltipVisible());
        expect(await harness.tooltipVisible()).toEqual(true);
    });

    it('should immediately dismiss the tooltip', async () => {
        const { harness } = await setupTest();

        expect(await harness.tooltipVisible()).toEqual(false);

        await harness.mouseenter();
        await harness.mouseleave();
        expect(await harness.tooltipVisible()).toEqual(false);
        expect(await harness.tooltipInserted()).toEqual(false);
    });

    it('should not show tooltip when no label is provided', async () => {
        const { harness } = await setupTest({ label: null });

        expect(await harness.tooltipInserted()).toEqual(false);

        await harness.mouseenter();
        expect(await harness.tooltipInserted()).toEqual(false);

        // Prove that cleaning up the tooltip is not executed
        await harness.mouseleave();
        expect(await harness.tooltipInserted()).toEqual(false);
    });
});
