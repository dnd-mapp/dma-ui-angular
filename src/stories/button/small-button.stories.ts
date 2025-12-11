import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@dnd-mapp/dma-ui-angular';
import { Meta, StoryObj } from '@storybook/angular';
import { storyWrapper } from '../story-wrapper';

@Component({
    selector: 'dma-small-button-story',
    templateUrl: './small-button-story.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent],
})
class SmallButtonStoryComponent {}

const metadata: Meta<SmallButtonStoryComponent> = {
    component: SmallButtonStoryComponent,
    decorators: [storyWrapper()],
    title: 'Button',
};

export default metadata;

type Story = StoryObj<SmallButtonStoryComponent>;

export const Small: Story = {};
