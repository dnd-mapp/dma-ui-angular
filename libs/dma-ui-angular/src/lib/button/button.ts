import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[dma-button]',
    templateUrl: './button.html',
    styleUrl: './button.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class Button {}
