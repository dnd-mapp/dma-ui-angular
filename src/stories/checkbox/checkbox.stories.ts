import { CheckboxComponent } from '@dnd-mapp/dma-ui-angular';
import { Meta, StoryObj } from '@storybook/angular';
import { storyWrapper } from '../story-wrapper';

const metadata = {
    args: {
        label: 'My checkbox',
        value: undefined as string,
        checked: false,
        indeterminate: false,
        disabled: false,
    },
    argTypes: {},
    component: CheckboxComponent,
    decorators: [storyWrapper()],
    render: (args, { updateArgs }) => ({
        props: {
            ...args,
            indeterminateChange: (indeterminate: boolean) => updateArgs({ indeterminate }),
            checkedChange: (checked: boolean) => updateArgs({ checked }),
        },
    }),
    title: 'Checkbox',
} satisfies Meta<CheckboxComponent>;

export default metadata;

type Story = StoryObj<CheckboxComponent>;

export const Default = {} satisfies Story;
