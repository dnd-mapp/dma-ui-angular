import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent, SoPlusIconComponent } from '@dnd-mapp/dma-ui-angular';
import { Meta, StoryObj } from '@storybook/angular';
import { storyWrapper } from '../story-wrapper';

@Component({
    selector: 'dma-button-leading-icon-story',
    templateUrl: './leading-icon-button-story.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, SoPlusIconComponent],
})
class LeadingIconButtonStoryComponent {}

const metadata = {
    component: LeadingIconButtonStoryComponent,
    decorators: [storyWrapper()],
    title: 'Button/Icons',
} satisfies Meta<LeadingIconButtonStoryComponent>;

export default metadata;

type Story = StoryObj<LeadingIconButtonStoryComponent>;

export const LeadingIcon = {} satisfies Story;
