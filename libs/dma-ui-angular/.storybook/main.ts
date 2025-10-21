import type { StorybookConfig } from '@storybook/angular';
import { dirname, join } from 'path';
import { RuleSetRule } from 'webpack';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
    return dirname(require.resolve(join(value, 'package.json')));
}

function isResourceRule(rule: unknown): rule is RuleSetRule {
    return (
        typeof rule === 'object' && 'type' in rule && typeof rule.type === 'string' && rule.type === 'asset/resource'
    );
}

const config = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|mjs|ts)'],
    addons: [getAbsolutePath('@storybook/addon-docs')],
    framework: {
        name: getAbsolutePath('@storybook/angular'),
        options: {},
    },
    webpackFinal: (config) => {
        const moduleRules = config.module.rules;

        config.module.rules = moduleRules.map((rule) => {
            if (!isResourceRule(rule)) return rule;
            return {
                ...rule,
                test: new RegExp(rule.test.toString().replace('svg|', '')),
            };
        });
        return config;
    },
} satisfies StorybookConfig;

export default config;
