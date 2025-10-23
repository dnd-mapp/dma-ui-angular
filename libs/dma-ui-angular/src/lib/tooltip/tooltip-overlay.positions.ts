import { ConnectionPositionPair } from '@angular/cdk/overlay';

export const tooltipVerticalOverlayPositions: ConnectionPositionPair[] = [
    {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -8,
    },
    {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: 8,
    },
];
