import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    BottomBarButtonComponent,
    BottomBarComponent,
    SoBookIconComponent,
    SoDiceD20IconComponent,
    SoDungeonIconComponent,
    SoHouseIconComponent,
    SoUsersIconComponent,
} from '@dnd-mapp/dma-ui-angular';
import { Meta, StoryObj } from '@storybook/angular';
import { storyWrapper } from '../../story-wrapper';

@Component({
    selector: 'dma-bottom-bar-story',
    templateUrl: './bottom-bar.stories.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        BottomBarComponent,
        BottomBarButtonComponent,
        SoHouseIconComponent,
        SoUsersIconComponent,
        SoDungeonIconComponent,
        SoBookIconComponent,
        SoDiceD20IconComponent,
    ],
})
class BottomBarStoryComponent {}

const metadata: Meta<BottomBarStoryComponent> = {
    title: 'Navigation/Bottom Bar',
    component: BottomBarStoryComponent,
    decorators: [...storyWrapper({ position: 'bottom-center' })],
};

export default metadata;

type Story = StoryObj<BottomBarStoryComponent>;

export const Default: Story = {};
