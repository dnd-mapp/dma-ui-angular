import { ComponentHarness } from '@angular/cdk/testing';

export class CheckboxHarness extends ComponentHarness {
    public static readonly hostSelector = 'dma-checkbox';

    private readonly checkIconLocator = this.locatorForOptional('dma-icon[dma-so-check-icon]');
    private readonly minusIconLocator = this.locatorForOptional('dma-icon[dma-so-minus-icon]');

    public async toggleChecked() {
        await (await this.host()).click();
    }

    public async hover() {
        await (await this.host()).dispatchEvent('mouseenter');
    }

    public async mouseAway() {
        await (await this.host()).mouseAway();
    }

    public async isDisabled() {
        return (await (await this.host()).getAttribute('disabled')) === '';
    }

    public async isChecked() {
        return (await Promise.all([this.isCheckIconVisible(), this.hasCheckAttribute()])).every(Boolean);
    }

    public async isCheckIconVisible() {
        return Boolean(await this.checkIconLocator());
    }

    public async hasCheckAttribute() {
        return (await (await this.host()).getAttribute('checked')) === '';
    }

    public async isIndeterminate() {
        return (await Promise.all([this.isMinusIconVisible(), this.hasIndeterminateAttribute()])).every(Boolean);
    }

    public async hasIndeterminateAttribute() {
        return (await (await this.host()).getAttribute('indeterminate')) === '';
    }

    public async isMinusIconVisible() {
        return Boolean(await this.minusIconLocator());
    }
}
