import { ComponentHarness } from '@angular/cdk/testing';

export class OptionHarness extends ComponentHarness {
    public static readonly hostSelector = 'dma-option';

    public async label() {
        return await (await this.host()).text();
    }

    public async value() {
        return await (await this.host()).getAttribute('value');
    }

    public async isSelected() {
        return (await (await this.host()).getAttribute('selected')) === '';
    }

    public async select() {
        await (await this.host()).click();
    }
}
