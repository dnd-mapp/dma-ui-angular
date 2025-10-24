import type { Preview } from '@storybook/angular';
import { useArgs } from 'storybook/preview-api';

const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (story, context) => {
            const [, updateArgs] = useArgs();
            return story({ ...context, updateArgs });
        },
    ],
} satisfies Preview;

export default preview;
