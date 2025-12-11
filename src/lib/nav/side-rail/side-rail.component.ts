import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-side-rail',
    templateUrl: './side-rail.component.html',
    styleUrl: './side-rail.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class SideRailComponent {}
