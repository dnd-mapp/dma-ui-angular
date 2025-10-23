# Tooltip

A lightweight and dynamic tooltip solution for Angular applications, built using an Angular directive (`TooltipAnchorDirective`) and a component (`TooltipComponent`). This implementation allows you to easily add tooltips to any element, with intelligent positioning and responsive behavior.

## Features

*  **Dynamic Creation:** Tooltips are created and destroyed dynamically based on user interaction, optimizing performance and DOM footprint.
*  **Simple Integration:** Apply tooltips with a single directive on any HTML element.
*  **Flexible Labeling:** The tooltip's text is provided directly through the directive's input.
*  **Intelligent Positioning:** Automatically attempts to position the tooltip `above` the anchor element. If there isn't enough space, it will gracefully fall back to positioning `below` the anchor element.
*  **Responsive Repositioning:** The tooltip automatically repositions itself when the user scrolls the window to maintain its position relative to the anchor.
*  **Visibility Management:** Tooltips automatically disappear when the anchor element scrolls completely out of the viewport, preventing orphaned tooltips.
*  **Conditional Display:** Tooltips are only created and displayed if a label is provided.

## Installation

Since `TooltipAnchorDirective` and `TooltipComponent` are standalone and part of the `@dnd-mapp/dma-ui-angular` library, installation is straightforward.

1.  **Install the library:**
    ```bash
    npm install @dnd-mapp/dma-ui-angular
    ```

2.  **Configure Animations:**
    The `TooltipComponent` uses Angular animations for fading in and out. For these animations to work correctly, you **must** include `provideTooltipConfig()` in your application's `providers` array. This is typically done in your `main.ts` for standalone applications, or within the `providers` of a component or module where tooltips are used.

    **Example `main.ts` (for standalone application):**
    ```typescript
    import { bootstrapApplication } from '@angular/platform-browser';
    import { provideTooltipConfig } from '@dnd-mapp/dma-ui-angular'; // Your specific tooltip config provider
    import { AppComponent } from './app/app.component';

    bootstrapApplication(AppComponent, { providers: [provideTooltipConfig()] }).catch(err => console.error(err));
    ```

    **Example in a Standalone Component (if configured locally):**
    ```typescript
    import { ChangeDetectionStrategy, Component } from '@angular/core';
    import { provideTooltipConfig, TooltipAnchorDirective } from '@dnd-mapp/dma-ui-angular';

    @Component({
        selector: 'app-my-standalone',
        template: `
            <button dmaTooltip="Hello from a standalone component!">Hover me</button>
            <p [dmaTooltip]="dynamicTooltipText">Another tooltip</p>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        imports: [TooltipAnchorDirective],
        providers: [
            provideTooltipConfig() // Only if tooltip config is provided at this component level
        ],
    })
    export class MyStandaloneComponent {
        protected dynamicTooltipText = 'This is a dynamic standalone tooltip!';
    }
    ```
    **Note:** It's generally recommended to use the `provideTooltipConfig()` at the root of your application (`main.ts` or `app.module.ts`) to ensure they are available globally.

3.  **Import into your Standalone Component:**
    You directly import the `TooltipAnchorDirective` into the `imports` array of any standalone component where you intend to use the tooltip.

    ```typescript
    // my.component.ts
    import { ChangeDetectionStrategy, Component } from '@angular/core';
    import { TooltipAnchorDirective } from '@dnd-mapp/dma-ui-angular';

    @Component({
        selector: 'app-my-standalone',
        template: `
            <button dmaTooltip="Hello from a standalone component!">Hover me</button>
            <p [dmaTooltip]="dynamicTooltipText">Another tooltip</p>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        imports: [TooltipAnchorDirective],
    })
    export class MyStandaloneComponent {
        protected dynamicTooltipText = 'This is a dynamic standalone tooltip!';
    }
    ```

## Usage

To use the tooltip, simply apply the `dmaTooltip` directive to any HTML element and provide the desired tooltip text as its value.

```html
<!-- Basic Usage -->
<button dmaTooltip="This is a simple tooltip!">Hover over me</button>

<!-- With longer text -->
<span dmaTooltip="This is a much longer tooltip that will provide more detailed information to the user when they hover over this element.">
    Hover for details
</span>

<!-- Tooltip will not appear because no label is provided -->
<div dmaTooltip="">No tooltip here</div>

<!-- Tooltip will not appear because no label is provided (equivalent to above) -->
<a [dmaTooltip]="''">No tooltip here either</a>
```

```typescript
// Your standalone component.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TooltipAnchorDirective } from '@dnd-mapp/dma-ui-angular';

@Component({
    selector: 'app-my-component',
    template: `
        <!-- Using a dynamic variable for the label -->
        <p [dmaTooltip]="dynamicTooltipText">Dynamic Tooltip</p>
    `,
    styleUrl: './my-component.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TooltipAnchorDirective],
})
export class MyComponent {
    protected dynamicTooltipText = 'This tooltip text comes from a component property!';
}
```

## How it Works

1.  **`TooltipAnchorDirective` (`dmaTooltip`)**:
    *  Listens for `mouseenter` and `mouseleave` events on the host element it's applied to.
    *  On `mouseenter`, it dynamically creates an instance of `TooltipComponent`.
    *  The value provided to `dmaTooltip` is passed as the `label` input to the `TooltipComponent`. If no label is provided (or an empty string), the `TooltipComponent` is not created.
    *  Handles the positioning logic to determine whether the tooltip should appear `above` or `below` the anchor based on available space.
    *  Listens for window `scroll` events to reposition the tooltip or hide it if the anchor scrolls out of view.
    *  On `mouseleave`, it destroys the `TooltipComponent` instance.

2.  **`TooltipComponent`**:
    *  Receives the `label` input, which is the text to be displayed within the tooltip.
    *  Renders the tooltip's visual structure.
    *  Is responsible for its own styling.
