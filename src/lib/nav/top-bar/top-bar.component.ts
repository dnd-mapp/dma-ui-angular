import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrl: './top-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class TopBarComponent {}
