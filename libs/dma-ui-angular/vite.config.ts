/// <reference types="vitest" />
import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const isCI = Boolean(process.env['CI']);

export default defineConfig(() => ({
    cacheDir: '../../.vite/dma-ui-angular',
    plugins: [angular(), viteTsConfigPaths()],
    root: __dirname,
    test: {
        allowOnly: !isCI,
        browser: {
            enabled: true,
            instances: [
                {
                    browser: 'chromium',
                    headless: true,
                },
            ],
            name: 'chromium',
            provider: 'playwright',
        },
        clearMocks: true,
        coverage: {
            clean: true,
            cleanOnRerun: true,
            enabled: true,
            exclude: ['**/index.ts'],
            include: ['src/**/*.ts'],
            provider: 'v8' as const,
            reporter: ['text-summary', 'html'],
            reportOnFailure: true,
            reportsDirectory: '../../reports/dma-ui-angular/coverage',
            thresholds: {
                branches: 80,
                functions: 80,
                lines: 80,
                statements: 80,
            },
        },
        globals: true,
        include: ['src/**/*.spec.ts'],
        name: 'dma-ui-angular',
        open: false,
        outputFile: '../../reports/dma-ui-angular/index.html',
        passWithNoTests: true,
        reporters: ['dot', 'html'],
        setupFiles: ['test/setup-test.ts'],
        sequence: {
            shuffle: true,
        },
        slowTestThreshold: 300,
        ui: !isCI,
        uiBase: '/dma-ui-angular/',
    },
}));
