import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-icon[dma-so-user-icon]',
    templateUrl: './so-user-icon.component.svg',
    styleUrl: '../../icons.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class SoUserIconComponent {}
