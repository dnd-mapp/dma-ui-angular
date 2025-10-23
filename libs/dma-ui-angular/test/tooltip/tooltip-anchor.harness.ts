import { ComponentHarness } from '@angular/cdk/testing';
import { TooltipHarness } from './tooltip.harness';

export class TooltipAnchorHarness extends ComponentHarness {
    public static readonly hostSelector = '[dmaTooltip]';

    private readonly tooltipLocator = this.documentRootLocatorFactory().locatorForOptional(TooltipHarness);

    public async mouseenter() {
        await (await this.host()).dispatchEvent('mouseenter');
    }

    public async mouseleave() {
        await (await this.host()).dispatchEvent('mouseleave');
    }

    public async tooltipInserted() {
        return Boolean(await this.tooltipLocator());
    }

    public async tooltipVisible() {
        if (!(await this.tooltipInserted())) return false;
        return await (await this.tooltipLocator()).isLabelFullyVisible();
    }
}
