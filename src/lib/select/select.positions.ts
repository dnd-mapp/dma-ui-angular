import { ConnectionPositionPair } from '@angular/cdk/overlay';

export const PositionPanelClasses = {
    ABOVE: 'dma-select-above',
    BELOW: 'dma-select-below',
} as const;

export type PositionPanelClass = (typeof PositionPanelClasses)[keyof typeof PositionPanelClasses];

export const PanelPositions = {
    ABOVE: 'above',
    BELOW: 'below',
} as const;

export type PanelPosition = (typeof PanelPositions)[keyof typeof PanelPositions];

export const PanelPositionByClass = {
    [PositionPanelClasses.ABOVE]: PanelPositions.ABOVE,
    [PositionPanelClasses.BELOW]: PanelPositions.BELOW,
} as const;

export const selectPositions: ConnectionPositionPair[] = [
    {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: -1,
        panelClass: PositionPanelClasses.BELOW,
    },
    {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetY: 1,
        panelClass: PositionPanelClasses.ABOVE,
    },
];
