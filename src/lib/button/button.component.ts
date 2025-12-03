import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TooltipAnchorDirective } from '../tooltip';
import { buttonSizeAttribute, DEFAULT_BUTTON_SIZE } from './button-size';
import { buttonTypeAttribute, DEFAULT_BUTTON_TYPE } from './button-type';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[dma-button]',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [
        {
            directive: TooltipAnchorDirective,
            inputs: ['dmaTooltip: dmaTooltipLabel'],
        },
    ],
    host: {
        '[attr.dma-button]': 'type()',
        '[attr.size]': 'size()',
    },
    imports: [],
})
export class ButtonComponent {
    public readonly type = input(DEFAULT_BUTTON_TYPE, { alias: 'dma-button', transform: buttonTypeAttribute });

    public readonly size = input(DEFAULT_BUTTON_SIZE, { transform: buttonSizeAttribute });

    public readonly iconButton = input(false, { transform: booleanAttribute });
}
