import { ComponentHarness } from '@angular/cdk/testing';

export class BaseContainerHarness extends ComponentHarness {
    public static readonly hostSelector = 'dma-base-container';

    public async hasDisabledAttribute() {
        return (await (await this.host()).getAttribute('disabled')) === '';
    }
}
