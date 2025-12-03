export const TooltipStates = {
    HIDDEN: 'hidden',
    SHOWING: 'showing',
    SHOWN: 'shown',
    HIDING: 'hiding',
} as const;

export type TooltipState = (typeof TooltipStates)[keyof typeof TooltipStates];
