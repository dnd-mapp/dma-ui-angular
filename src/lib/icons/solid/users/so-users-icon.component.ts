import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-icon[dma-so-users-icon]',
    templateUrl: './so-users-icon.component.svg',
    styleUrl: '../../icons.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class SoUsersIconComponent {}
