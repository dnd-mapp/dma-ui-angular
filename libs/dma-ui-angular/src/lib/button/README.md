# Button

The `ButtonComponent` is a presentational component provided by the `@dnd-mapp/dma-ui-angular` library. It enhances the native HTML `<button>` element with custom styling based on its `type` input.

## Features

*  **Directive-based:** Extends the native `<button>` element using the `dma-button` attribute selector.
*  **Visual Types:** Supports various visual styles through the `type` input.
*  **Sizes:** Configurable sizes (`small` and `medium`) for different contexts.
*  **Icon Support:** Easily add leading, trailing, or standalone icons to buttons.
*  **Standalone:** Can be imported and used directly in your Angular components without the need for Angular modules.

## Installation

First, ensure you have installed the `@dnd-mapp/dma-ui-angular` library in your Angular project:

```bash
npm install @dnd-mapp/dma-ui-angular
```

## Usage

To use the `ButtonComponent`, simply apply the `dma-button` attribute to a native `<button>` element. You can then specify the button's visual type using the `type` input (which is aliased to the component's selector).

### Importing the Component

Since `ButtonComponent` is a standalone component, you need to import it directly into the `imports` array of the component where you intend to use it.

```typescript
import { Component } from '@angular/core';
import { ButtonComponent } from '@dnd-mapp/dma-ui-angular';

@Component({
  standalone: true,
  selector: 'app-example',
  template: `
    <button dma-button="primary">Primary Button</button>
    <button dma-button="secondary">Secondary Button</button>
    <button dma-button="danger">Danger Button</button>
    <button dma-button>Text Button</button>
  `,
  imports: [ButtonComponent],
})
export class ExampleComponent {}
```

### Basic Examples

Here are some common ways to use the `ButtonComponent`:

```html
<!-- A primary styled button -->
<button dma-button="primary">Action</button>

<!-- A secondary styled button -->
<button dma-button="secondary">More Info</button>

<!-- A danger styled button -->
<button dma-button="danger">Delete</button>

<!-- A button with the default style (if no type is specified) -->
<button dma-button>Click Me</button>
```

### Sizes

You can control the physical size of the button using the `size` input.

```html
<!-- A small primary button -->
<button dma-button="primary" size="small">Small Action</button>

<!-- A medium secondary button (default size) -->
<button dma-button="secondary" size="medium">Medium Action</button>

<!-- A default size button -->
<button dma-button>Click Me</button>
```

## Icons

The `ButtonComponent` provides flexible ways to integrate icons into your buttons, whether you need them to lead or trail the button's text, or if you want a button composed solely of an icon.

### Leading Icon

To render an icon before the button's label, use `ngProjectAs="dma-leading-icon"` on your icon element.

```html
<button dma-button="primary">
    <dma-icon dma-so-plus-icon ngProjectAs="dma-leading-icon" />
    New Character
</button>
```

### Trailing Icon

To render an icon after the button's label, use `ngProjectAs="dma-trailing-icon"` on your icon element.

```html
<button dma-button="secondary">
    Open link
    <dma-icon dma-so-arrow-up-right-from-square-icon ngProjectAs="dma-trailing-icon" />
</button>
```

### Icon Button

To create a button composed solely of an icon, add the `iconButton` attribute on the button element. In this configuration, any singular icon provided as content will be rendered, and no button label is required.

```html
<button dma-button="primary" iconButton>
    <dma-icon dma-so-xmark-icon />
</button>

<button dma-button="danger" iconButton>
    <dma-icon dma-so-trash-icon />
</button>
```

**Note:** Only icons included in this Angular library are supported.

## API

### `button[dma-button]` Selector

The component is applied as a directive to the native `<button>` element using the `dma-button` attribute.

### Inputs

| Name         | Type                                                          | Description                                                                                                           | Default  |
|--------------|---------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|----------|
| `dma-button` | `'primary' \| 'secondary' \| 'danger' \| 'text' \| undefined` | Defines the visual style of the button.                                                                               | `text`   |
| `iconButton` | `boolean`                                                     | When `true`, the button is styled as an icon-only button. Renders a single icon and no button label will be rendered. | `false`  |
| `size`       | `'small' \| 'medium'`                                         | Specifies the size of the button.                                                                                     | `medium` |

*   **`dma-button`**: This input determines the visual appearance of the button. The library provides built-in styles for types like `'primary'`, `'secondary'`, `'text' (default)`, and `'danger'`.
*   **`iconButton`**: Use this input to explicitly define the button as an icon-only button. When `true`, the component only render the first icon.
