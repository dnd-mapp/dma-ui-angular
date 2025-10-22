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
    selector: 'dma-input-leading-icon-action-button-story',
    templateUrl: `./input-leading-icon-action-button-story.component.html`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SoXmarkIconComponent, InputComponent, ButtonComponent, SoMagnifyingGlassIconComponent],
})
class InputLeadingIconActionButtonStoryComponent {}

const metadata = {
    component: InputLeadingIconActionButtonStoryComponent,
    decorators: [storyWrapper({ position: 'top-start' })],
    title: 'Input/Text Input',
} satisfies Meta<InputLeadingIconActionButtonStoryComponent>;

export default metadata;

type Story = StoryObj<InputLeadingIconActionButtonStoryComponent>;

export const LeadingIconWithActionButton = {} satisfies Story;
