import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-bottom-bar',
    templateUrl: './bottom-bar.component.html',
    styleUrl: './bottom-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class BottomBarComponent {}
