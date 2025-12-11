import { OptionComponent, SelectComponent } from '@dnd-mapp/dma-ui-angular';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryPositions, storyWrapper } from '../story-wrapper';

const metadata: Meta<SelectComponent> = {
    component: SelectComponent,
    decorators: [
        ...storyWrapper({ height: 20, position: StoryPositions.CENTER }),
        moduleMetadata({
            imports: [SelectComponent, OptionComponent],
        }),
    ],
    title: 'Select',
    render: (args) => ({
        props: args,
        template: `
            <dma-select>
                <dma-option value="option-1">Option 1</dma-option>
                <dma-option value="option-2">Option 2</dma-option>
                <dma-option value="option-3">Option 3</dma-option>
                <dma-option value="option-4">Option 4</dma-option>
            </dma-select>
        `,
    }),
};

export default metadata;

type Story = StoryObj<SelectComponent>;

export const Default: Story = {};
