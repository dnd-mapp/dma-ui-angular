import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent, SoXmarkIconComponent } from '@dnd-mapp/dma-ui-angular';
import { Meta, StoryObj } from '@storybook/angular';
import { storyWrapper } from '../story-wrapper';

@Component({
    selector: 'dma-icon-button-story',
    templateUrl: './icon-button-story.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, SoXmarkIconComponent],
})
class IconButtonStoryComponent {}

const metadata = {
    component: IconButtonStoryComponent,
    decorators: [storyWrapper()],
    title: 'Button/Icons',
} satisfies Meta<IconButtonStoryComponent>;

export default metadata;

type Story = StoryObj<IconButtonStoryComponent>;

export const Icon = {} satisfies Story;
