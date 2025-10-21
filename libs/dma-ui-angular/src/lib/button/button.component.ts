import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { buttonTypeAttribute, DEFAULT_BUTTON_TYPE } from './button-type';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[dma-button]',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class ButtonComponent {
    public readonly type = input(DEFAULT_BUTTON_TYPE, { alias: 'dma-button', transform: buttonTypeAttribute });

    public readonly iconButton = input(false, { transform: booleanAttribute });
}
