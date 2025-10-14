import { Button } from '@dnd-mapp/dma-ui-angular';
import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';

type StoryComponent = Button & {
    label: string;
    disabled: boolean;
};

const metadata = {
    component: Button,
    args: {
        label: 'My Button',
        disabled: false,
    },
    render: ({ label, disabled, ...args }) => ({
        props: args,
        template: `<button ${argsToTemplate(args)} ${disabled ? 'disabled' : ''}>${label}</button>`,
    }),
} satisfies Meta<StoryComponent>;

export default metadata;

type Story = StoryObj<StoryComponent>;

export const Primary = {} satisfies Story;
