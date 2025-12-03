import { ComponentHarness } from '@angular/cdk/testing';
import { BaseContainerHarness } from '../base-container';
import { OptionHarness } from './option.harness';

export class SelectHarness extends ComponentHarness {
    public static readonly hostSelector = 'dma-select';

    private readonly baseContainerLocator = this.locatorFor(BaseContainerHarness);
    private readonly optionsContainerLocator =
        this.documentRootLocatorFactory().locatorForOptional('.options-container');
    private readonly labelLocator = this.locatorForOptional('label');
    private readonly displayValueLocator = this.locatorFor('span');
    private readonly optionsLocator = this.documentRootLocatorFactory().locatorForAll(OptionHarness);

    public async toggleOpen() {
        await (await this.baseContainerLocator()).click();
    }

    public async isLabelVisible() {
        return Boolean(await this.labelLocator());
    }

    public async label() {
        return await (await this.labelLocator())?.text();
    }

    public async value() {
        return await (await this.displayValueLocator()).text();
    }

    public async optionsContainerVisible() {
        return Boolean(await this.optionsContainerLocator());
    }

    public async selectedOption() {
        const optionHarnesses = await this.optionsLocator();

        for (const harness of optionHarnesses) {
            if (await harness.isSelected()) return harness;
        }
        return null;
    }

    public async selectOptionByIndex(index: number) {
        const optionHarnesses = await this.optionsLocator();

        await optionHarnesses[index].select();
    }
}
