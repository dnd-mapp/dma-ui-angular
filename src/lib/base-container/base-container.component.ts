import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
    selector: 'dma-base-container',
    templateUrl: './base-container.component.html',
    styleUrl: './base-container.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.disabled]': 'disabledAttr()',
    },
    imports: [],
})
export class BaseContainerComponent {
    public readonly disabled = input(false, { transform: booleanAttribute });

    protected readonly disabledAttr = computed(() => (this.disabled() ? '' : undefined));
}
