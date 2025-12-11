import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonComponent } from '../../button';

@Component({
    selector: 'dma-bottom-bar-button',
    templateUrl: './bottom-bar-button.component.html',
    styleUrl: './bottom-bar-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent],
})
export class BottomBarButtonComponent {
    public readonly label = input.required<string>();
}
