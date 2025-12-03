import { InputComponent } from '@dnd-mapp/dma-ui-angular';
import { Meta, StoryObj } from '@storybook/angular';
import { storyWrapper } from '../story-wrapper';

const metadata = {
    args: {
        label: 'My label',
        hideLabel: false,
        value: '',
        placeholder: '',
        disabled: false,
        readonly: false,
    },
    argTypes: {
        label: {
            description: 'Controls the text of the label.',
            table: {
                category: 'Properties',
                defaultValue: {
                    summary: '',
                },
            },
            type: {
                name: 'string',
                required: true,
            },
        },
        hideLabel: {
            description: 'Controls whether label above the input field is hidden.',
            table: {
                category: 'Properties',
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        value: {
            description: 'Controls the value of the input field.',
            table: {
                category: 'Properties',
                defaultValue: {
                    summary: '',
                },
            },
        },
        placeholder: {
            description: `Controls the placeholder text shown when there's no value in the input field yet.`,
            table: {
                category: 'Properties',
                defaultValue: {
                    summary: '',
                },
            },
        },
        disabled: {
            description: 'Controls whether the input field can be used.',
            table: {
                category: 'Properties',
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        readonly: {
            description:
                'Controls whether value of the input field can be adjusted. Difference between `readonly` and `disabled` is that `disabled` input fields will not be submitted while `readonly` input fields will.',
            table: {
                category: 'Properties',
                defaultValue: {
                    summary: 'false',
                },
            },
        },
    },
    component: InputComponent,
    decorators: [storyWrapper({ position: 'top-start' })],
    title: 'Input/Text Input',
} satisfies Meta<InputComponent>;

export default metadata;

type Story = StoryObj<InputComponent>;

export const Default = {} satisfies Story;
