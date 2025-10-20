import { ComponentHarness, TestKey } from '@angular/cdk/testing';

export class InputHarness extends ComponentHarness {
    public static readonly hostSelector = 'dma-input';

    private readonly labelLocator = this.locatorForOptional('label');
    private readonly inputLocator = this.locatorFor('input');

    public async isLabelVisible() {
        return Boolean(await this.labelLocator());
    }

    public async label() {
        return await (await this.labelLocator())?.text();
    }

    public async value() {
        return await (await this.inputLocator()).getProperty<string>('value');
    }

    public async placeholder() {
        return await (await this.inputLocator()).getProperty<string>('placeholder');
    }

    public async isReadonly() {
        return (await (await this.inputLocator()).getAttribute('readonly')) === '';
    }

    public async isDisabled() {
        return await (await this.inputLocator()).getProperty<boolean>('disabled');
    }

    public async typeText(value: string | TestKey[]) {
        // Need to check manually for disabled state since the CDK bypasses this browser behavior
        // and sets the element's value directly.
        if ((await this.isDisabled()) || (await this.isReadonly())) return;
        const input = await this.inputLocator();
        await input.sendKeys(...value);
        await input.dispatchEvent('change');
    }
}
