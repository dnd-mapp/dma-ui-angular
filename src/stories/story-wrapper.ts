import { componentWrapperDecorator } from '@storybook/angular';

export const StoryPositions = {
    TOP_START: 'top-start',
    TOP_CENTER: 'top-center',
    TOP_END: 'top-end',
    CENTER_START: 'center-start',
    CENTER: 'center',
    CENTER_END: 'center-end',
    BOTTOM_START: 'bottom-start',
    BOTTOM_CENTER: 'bottom-center',
    BOTTOM_END: 'bottom-end',
} as const;

type StoryPosition = (typeof StoryPositions)[keyof typeof StoryPositions];

interface StoryWrapperConfig {
    position: StoryPosition;
    height?: number;
}

const DEFAULT_STORY_WRAPPER_CONFIG: StoryWrapperConfig = {
    position: StoryPositions.CENTER,
};

export function storyWrapper(config: StoryWrapperConfig = DEFAULT_STORY_WRAPPER_CONFIG) {
    const heightStyle = Number.isNaN(config.height) ? 'unset' : config.height;

    return componentWrapperDecorator(
        (story) => `<div class="dma-surface ${config.position}" [style.height.em]="${heightStyle}">${story}</div>`,
    );
}
