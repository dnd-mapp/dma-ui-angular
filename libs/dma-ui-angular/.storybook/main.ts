import type { StorybookConfig } from '@storybook/angular';
import { dirname, join } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
    return dirname(require.resolve(join(value, 'package.json')));
}

const config = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|mjs|ts)'],
    addons: [getAbsolutePath('@storybook/addon-docs')],
    framework: {
        name: getAbsolutePath('@storybook/angular'),
        options: {},
    },
} satisfies StorybookConfig;

export default config;
