import type { StorybookConfig } from '@storybook/angular';
import { RuleSetRule } from 'webpack';

function isResourceRule(rule: unknown): rule is RuleSetRule {
    return (
        typeof rule === 'object' && 'type' in rule && typeof rule.type === 'string' && rule.type === 'asset/resource'
    );
}

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|mjs|ts)'],
    addons: ['@storybook/addon-docs'],
    framework: {
        name: '@storybook/angular',
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
};

export default config;
