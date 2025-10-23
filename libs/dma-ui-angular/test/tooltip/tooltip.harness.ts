import { ComponentHarness } from '@angular/cdk/testing';

export class TooltipHarness extends ComponentHarness {
    public static readonly hostSelector = 'dma-tooltip';

    private readonly labelLocator = this.locatorFor('span');

    public async isLabelFullyVisible() {
        return (await (await this.labelLocator()).getCssValue('opacity')) === '1';
    }
}
