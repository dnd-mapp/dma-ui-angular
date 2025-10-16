import { ButtonComponent, ButtonTypes, DEFAULT_BUTTON_TYPE } from '@dnd-mapp/dma-ui-angular';
import { Meta, StoryObj } from '@storybook/angular';
import { storyWrapper } from '../story-wrapper';

type StoryComponent = ButtonComponent & {
    label: string;
    disabled: boolean;
};

const metadata = {
    component: ButtonComponent,
    decorators: [storyWrapper()],
    args: {
        type: DEFAULT_BUTTON_TYPE,
        label: 'My Button',
        disabled: false,
    },
    argTypes: {
        type: {
            control: {
                type: 'select',
                labels: {
                    [ButtonTypes.PRIMARY]: 'Primary',
                    [ButtonTypes.SECONDARY]: 'Secondary',
                    [ButtonTypes.DANGER]: 'Danger',
                    [ButtonTypes.TEXT]: 'Text',
                },
            },
            options: Object.values(ButtonTypes),
            table: {
                defaultValue: {
                    summary: DEFAULT_BUTTON_TYPE,
                },
            },
        },
    },
    render: ({ label, disabled, type, ...args }) => ({
        props: args,
        template: `<button dma-button="${type}" ${disabled ? 'disabled' : ''}>${label}</button>`,
    }),
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
