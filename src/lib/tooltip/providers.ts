import { InjectionToken, ValueProvider } from '@angular/core';

export const TOOLTIP_CONFIG = new InjectionToken('Tooltip config');

export const DEFAULT_ENTER_COMPLETION_DELAY = 600;

export const DEFAULT_LEAVE_COMPLETION_DELAY = 200;

export interface TooltipConfig {
    enterDelay?: number;
    leaveDelay?: number;
}

export function provideTooltipConfig(config?: TooltipConfig): ValueProvider {
    return {
        provide: TOOLTIP_CONFIG,
        useValue: {
            enterDelay: config?.enterDelay ?? DEFAULT_ENTER_COMPLETION_DELAY,
            leaveDelay: config?.leaveDelay ?? DEFAULT_LEAVE_COMPLETION_DELAY,
        } satisfies TooltipConfig,
    };
}
