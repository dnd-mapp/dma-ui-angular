import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    ButtonComponent,
    InputComponent,
    SoMagnifyingGlassIconComponent,
    SoXmarkIconComponent,
} from '@dnd-mapp/dma-ui-angular';
import { Meta, StoryObj } from '@storybook/angular';
import { storyWrapper } from '../story-wrapper';

@Component({
    selector: 'dma-input-action-button-story',
    templateUrl: `./input-action-button-story.component.html`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SoXmarkIconComponent, InputComponent, ButtonComponent, SoMagnifyingGlassIconComponent],
})
class InputActionButtonStoryComponent {}

const metadata = {
    component: InputActionButtonStoryComponent,
    decorators: [storyWrapper({ position: 'top-start' })],
    title: 'Input/Text Input',
} satisfies Meta<InputActionButtonStoryComponent>;

export default metadata;

type Story = StoryObj<InputActionButtonStoryComponent>;

export const WithActionButton = {} satisfies Story;
