import { ComponentHarness } from '@angular/cdk/testing';

export class ButtonHarness extends ComponentHarness {
    public static readonly hostSelector = 'button[dma-button]';

    public async type() {
        return await (await this.host()).getAttribute('dma-button');
    }

    public async size() {
        return await (await this.host()).getAttribute('size');
    }
}
