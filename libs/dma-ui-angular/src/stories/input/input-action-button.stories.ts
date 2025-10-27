import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonComponent, InputComponent, SoXmarkIconComponent } from '@dnd-mapp/dma-ui-angular';
import { Meta, StoryObj } from '@storybook/angular';
import { storyWrapper } from '../story-wrapper';

@Component({
    selector: 'dma-input-action-button-story',
    templateUrl: `./input-action-button-story.component.html`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SoXmarkIconComponent, InputComponent, ButtonComponent],
})
class InputActionButtonStoryComponent {
    public readonly disabled = input(false);
}

const metadata = {
    args: {
        disabled: false,
    },
    component: InputActionButtonStoryComponent,
    decorators: [storyWrapper({ position: 'top-start' })],
    title: 'Input/Text Input',
} satisfies Meta<InputActionButtonStoryComponent>;

export default metadata;

type Story = StoryObj<InputActionButtonStoryComponent>;

export const WithActionButton = {} satisfies Story;
