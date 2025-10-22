import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputComponent, SoUserIconComponent } from '@dnd-mapp/dma-ui-angular';
import { Meta, StoryObj } from '@storybook/angular';
import { storyWrapper } from '../story-wrapper';

@Component({
    selector: 'dma-input-leading-icon-story',
    templateUrl: `./input-leading-icon-story.component.html`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [InputComponent, SoUserIconComponent],
})
class InputLeadingIconStoryComponent {}

const metadata = {
    component: InputLeadingIconStoryComponent,
    decorators: [storyWrapper({ position: 'top-start' })],
    title: 'Input/Text Input',
} satisfies Meta<InputLeadingIconStoryComponent>;

export default metadata;

type Story = StoryObj<InputLeadingIconStoryComponent>;

export const LeadingIcon = {} satisfies Story;
