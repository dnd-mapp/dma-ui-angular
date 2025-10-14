/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
    test: {
        projects: ['libs/**/vite.config.ts'],
    },
});
