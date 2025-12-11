import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
    ButtonComponent,
    InputComponent,
    SoMagnifyingGlassIconComponent,
    SoXmarkIconComponent,
} from '@dnd-mapp/dma-ui-angular';
import { Meta, StoryObj } from '@storybook/angular';
import { storyWrapper } from '../story-wrapper';

@Component({
    selector: 'dma-input-leading-icon-action-button-story',
    templateUrl: `./input-leading-icon-action-button-story.component.html`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SoXmarkIconComponent, InputComponent, ButtonComponent, SoMagnifyingGlassIconComponent],
})
class InputLeadingIconActionButtonStoryComponent {
    public readonly disabled = input(false);
}

const metadata: Meta<InputLeadingIconActionButtonStoryComponent> = {
    args: {
        disabled: false,
    },
    component: InputLeadingIconActionButtonStoryComponent,
    decorators: [...storyWrapper({ position: 'top-start' })],
    title: 'Input/Text Input',
};

export default metadata;

type Story = StoryObj<InputLeadingIconActionButtonStoryComponent>;

export const LeadingIconWithActionButton: Story = {};
