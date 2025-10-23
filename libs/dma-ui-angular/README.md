# D&D Mapp - UI Angular

`@dnd-mapp/dma-ui-angular` is an Angular library providing a set of reusable, presentational UI components for applications within the D&D Mapp platform. This library aims to ensure a consistent look and feel, accelerate development, and provide well-tested UI building blocks.

## Table of Contents

*   [Installation](#installation)
*   [Configuration](#configuration)
*   [Available Components](#available-components)
*   [Storybook](#storybook)
*   [Contribution](#contribution)
*   [License](#license)

## Installation

You can install `@dnd-mapp/dma-ui-angular` using npm or yarn:

```bash
npm install @dnd-mapp/dma-ui-angular
```

## Configuration

### Theme Styles

To ensure components are styled correctly, you **must** include the library's core theme styles in your application. We recommend importing the main SCSS theme file into your primary `styles.scss` file.

First, locate your application's global `styles.scss` (usually in`src/styles.scss`). Then, add the following import statement:

```scss
/* src/styles.scss or equivalent */

// Import the dma-ui-angular theme.
// Ensure this path is correct based on your project structure.
@use '@dnd-mapp/dma-ui-angular/styles/fonts.scss';
@use '@dnd-mapp/dma-ui-angular/styles/main.scss';

// Add any application-specific global styles or overrides after the theme
// import if you need to adjust default theme values.
```

Alternatively, you can include the SCSS file directly in your `angular.json`'s `styles` array.

```json5
{
    "projects": {
        "<project-name>": {
            "architect": {
                "build": {
                    "builder": "@angular/build:application",
                    "options": {
                        "styles": [
                            "src/styles.scss",
                            "node_modules/@dnd-mapp/dma-ui-angular/styles/fonts.scss",
                            "node_modules/@dnd-mapp/dma-ui-angular/styles/main.scss"
                        ],
                        // ...
                    },
                    // ...
                },
                // ...
            },
            // ...
        }
    }
}
```

Specific component configurations will be detailed in their respective documentation.

## Available Components

This library provides a suite of presentational components. For detailed documentation, API references, and usage examples for each specific component, please refer to their individual `README.md` files (typically co-located with the component's source code) or the comprehensive [Storybook](https://dnd-mapp.github.io/dma-ui-angular) documentation.

Components you can find in this library are:

*  [DmaButton](src/lib/button/README.md)
*  [DmaInput](src/lib/input/README.md)
*  [DmaTooltip](src/lib/tooltip/README.md)

## Theming

## Storybook

This library comes with a Storybook instance that documents all components, their properties, and various usage examples. You can explore the components interactively to understand their behavior and design. Storybook is the primary source of truth for interactive component documentation.

To run Storybook locally (from the root of the repository):

```bash
npm run storybook
```

## Contribution

If you are looking to contribute to the development of this library, please refer to the main repository's [README.md](https://github.com/dnd-mapp/dma-ui-angular/blob/main/README.md) and contributing guidelines.

## License

This library is licensed under the [GNU Affero General Public License v3.0 (AGPL-3.0)](https://github.com/dnd-mapp/dma-ui-angular/blob/main/LICENSE).
