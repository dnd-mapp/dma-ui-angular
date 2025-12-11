import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent, provideTooltipConfig, SoXmarkIconComponent } from '@dnd-mapp/dma-ui-angular';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { storyWrapper } from '../story-wrapper';

@Component({
    selector: 'dma-icon-button-story',
    templateUrl: './icon-button-story.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, SoXmarkIconComponent],
})
class IconButtonStoryComponent {}

const metadata: Meta<IconButtonStoryComponent> = {
    component: IconButtonStoryComponent,
    decorators: [
        ...storyWrapper(),
        applicationConfig({
            providers: [provideTooltipConfig()],
        }),
    ],
    title: 'Button/Icons',
};

export default metadata;

type Story = StoryObj<IconButtonStoryComponent>;

export const Icon: Story = {};
