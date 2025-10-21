import { ButtonComponent, ButtonTypes, DEFAULT_BUTTON_TYPE } from '@dnd-mapp/dma-ui-angular';
import { Meta, StoryObj } from '@storybook/angular';
import { ButtonSizes, DEFAULT_BUTTON_SIZE } from '../../lib/button/button-size';
import { storyWrapper } from '../story-wrapper';

type StoryComponent = ButtonComponent & {
    label: string;
    disabled: boolean;
};

const metadata = {
    args: {
        disabled: false,
        label: 'My Button',
        size: DEFAULT_BUTTON_SIZE,
        type: DEFAULT_BUTTON_TYPE,
    },
    argTypes: {
        disabled: {
            description: 'Inherited from the native button element. Determines whether the button is clickable.',
            table: {
                category: 'Properties',
                defaultValue: {
                    summary: 'false',
                },
            },
        },
        label: {
            description: 'Provided as content of the button element.',
            table: {
                category: 'Content',
            },
        },
        size: {
            control: {
                type: 'select',
            },
            description: 'Determines the size of the button.',
            options: Object.values(ButtonSizes),
            table: {
                category: 'Properties',
                defaultValue: {
                    summary: DEFAULT_BUTTON_SIZE,
                },
            },
        },
        type: {
            control: {
                type: 'select',
            },
            options: Object.values(ButtonTypes),
            description: 'Determines the visual representation of the button.',
            type: {
                name: 'enum',
                value: Object.values(ButtonTypes),
            },
            table: {
                category: 'Properties',
                defaultValue: {
                    summary: DEFAULT_BUTTON_TYPE,
                },
            },
        },
    },
    component: ButtonComponent,
    decorators: [storyWrapper()],
    render: ({ label, disabled, size, type, ...args }) => ({
        props: args,
        template: `<button dma-button="${type}" size="${size}" ${disabled ? 'disabled' : ''}>${label}</button>`,
    }),
    title: 'Button',
} satisfies Meta<StoryComponent>;

export default metadata;

type Story = StoryObj<StoryComponent>;

export const Primary = {
    args: {
        type: ButtonTypes.PRIMARY,
    },
} satisfies Story;

export const Secondary = {
    args: {
        type: ButtonTypes.SECONDARY,
    },
} satisfies Story;

export const Danger = {
    args: {
        type: ButtonTypes.DANGER,
    },
} satisfies Story;

export const Text = {} satisfies Story;
