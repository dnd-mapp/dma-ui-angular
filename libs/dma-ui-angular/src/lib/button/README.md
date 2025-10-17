# Button

The `ButtonComponent` is a presentational component provided by the `@dnd-mapp/dma-ui-angular` library. It enhances the native HTML `<button>` element with custom styling based on its `type` input.

## Features

*   **Directive-based:** Extends the native `<button>` element using the `dma-button` attribute selector.
*   **Visual Types:** Supports various visual styles through the `type` input.
*   **Standalone:** Can be imported and used directly in your Angular components without the need for Angular modules.

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

## API

### `button[dma-button]` Selector

The component is applied as a directive to the native `<button>` element using the `dma-button` attribute.

### Inputs

| Name         | Type                                                          | Description                             | Default |
|--------------|---------------------------------------------------------------|-----------------------------------------|---------|
| `dma-button` | `'primary' \| 'secondary' \| 'danger' \| 'text' \| undefined` | Defines the visual style of the button. | `text`  |

*   **`dma-button`**: This input determines the visual appearance of the button. The library provides built-in styles for types like `'primary'`, `'secondary'`, `'text' (default)`, and `'danger'`. You can also potentially define custom styles for other string values if your library's CSS supports it.

## Contribution

For information on contributing to the `dnd-mapp/dma-ui-angular` library, please refer to the main repository's [CONTRIBUTING.md](https://github.com/dnd-mapp/dma-ui-angular/blob/main/CONTRIBUTING.md) file.

## License

This component is part of the `dnd-mapp/dma-ui-angular` library, which is released under the [AGPL-3.0 License](https://github.com/dnd-mapp/dma-ui-angular/blob/main/LICENSE).
