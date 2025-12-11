import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent, SoArrowUpRightFromSquareIconComponent } from '@dnd-mapp/dma-ui-angular';
import { Meta, StoryObj } from '@storybook/angular';
import { storyWrapper } from '../story-wrapper';

@Component({
    selector: 'dma-button-trailing-icon-story',
    templateUrl: './trailing-icon-button-story.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, SoArrowUpRightFromSquareIconComponent],
})
class TrailingIconButtonStoryComponent {}

const metadata: Meta<TrailingIconButtonStoryComponent> = {
    component: TrailingIconButtonStoryComponent,
    decorators: [...storyWrapper()],
    title: 'Button/Icons',
};

export default metadata;

type Story = StoryObj<TrailingIconButtonStoryComponent>;

export const TrailingIcon: Story = {};
