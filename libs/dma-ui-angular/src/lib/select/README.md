# DMA Select Component

A themed, fully styled replacement for the native `<select>` and `<option>` elements. This component is part of the library’s design system and ensures that the trigger, options panel, and options themselves are all consistently styled according to the library theme.

## Features

- Fully themed and styled (trigger, panel, and options)
- Automatic options panel positioning (above or below, based on available space)
- Single‑selection support
- Optional label input (automatically hidden when not provided)

> Note: This component is intended to replace the visual and interactive aspects of native selects while integrating tightly with the library’s theme. Styling is controlled by the library; custom theming/styling is not supported and is not planned.

---

## Installation

Install the library containing the DMA select component:

```bash
npm install @dnd-mapp/dma-angular-ui
```

Both the select and option components are standalone and can be imported directly into your components.

```typescript
import { Component } from '@angular/core';
import { DmaSelectComponent, DmaOptionComponent } from '@dnd-mapp/dma-angular-ui';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    imports: [DmaSelectComponent, DmaOptionComponent],
})
export class ExampleComponent {
    private selectedFruit = 'orange';
    
    protected onFruitChange(value: string) {
        this.selectedFruit = value;
    }
}
```

---

## Basic Usage

Options are provided as content of the select component, just like with the native `<select>` / `<option>` elements.

The select component does **not** have a `value` input or a two-way binding. You receive the selected value via the `valueChange` output and handle it in your component.

```html
<dma-select label="Favorite fruit" (valueChange)="onFruitChange($event)">
    <dma-option value="apple">Apple</dma-option>
    <dma-option value="orange" selected>Orange</dma-option>
    <dma-option value="banana">Banana</dma-option>
</dma-select>
```

```typescript
import { Component } from '@angular/core';
import { DmaSelectComponent, DmaOptionComponent } from '@dnd-mapp/dma-angular-ui';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    imports: [DmaSelectComponent, DmaOptionComponent],
})
export class ExampleComponent {
    private selectedFruit = 'orange';
    
    protected onFruitChange(value: string) {
        this.selectedFruit = value;
    }
}
```

- When `label` is provided, it will be rendered according to the library styles.
- When `label` is omitted or set to a falsy value, the label is not shown.
- The initially selected option can be set by applying the `selected` attribute to a `dma-option`. This will also be reflected in the emitted `valueChange`value the first time the user changes selection.

---

## Component API

### Select Component

#### Selector

```html
<dma-select></dma-select>
```

#### Inputs

| Input   | Type                          | Required | Default | Description                                                          |
|---------|-------------------------------|----------|---------|----------------------------------------------------------------------|
| `label` | `string \| null \| undefined` | No       | `null`  | Text label shown with the select. Hidden when not provided or empty. |

> Position is determined automatically; there is no `position` or `value` input.

Options are provided as content:

```html
<dma-select (valueChange)="onValueChange($event)">
    <dma-option value="a">Option A</dma-option>
    <dma-option value="b">Option B</dma-option>
</dma-select>
```

#### Outputs

| Output        | Type                    | Description                                  |
|---------------|-------------------------|----------------------------------------------|
| `valueChange` | `EventEmitter<unknown>` | Emitted whenever the selected value changes. |

---

### Option Component

#### Selector

```html
<dma-option></dma-option>
```

#### Inputs / Attributes

| Input / Attribute | Type               | Required | Description                              |
|-------------------|--------------------|----------|------------------------------------------|
| `value`           | `unknown`          | Yes      | Value associated with this option.       |
| `selected`        | `bool` (attribute) | No       | Marks this option as initially selected. |

Example:

```html
<dma-select (valueChange)="onUserChange($event)">
    <dma-option [value]="1" selected>Alice</dma-option>
    <dma-option [value]="2">Bob</dma-option>
</dma-select>
```

---

## Panel Positioning

The options panel is positioned automatically based on the available height below the trigger:

- By default, the panel will open **below** the select.
- If there is not enough space below, it will automatically open **above** the select.

There is currently no input to manually control or override this positioning.

---

## Examples

### Without Label

```html
<dma-select (valueChange)="onUserChange($event)">
    <dma-option [value]="1" selected>Alice</dma-option>
    <dma-option [value]="2">Bob</dma-option>
</dma-select>
```

Because `label` is omitted, no label will appear.

### Handling the Selected Value in Code

```html
<dma-select (valueChange)="onCityChange($event)">
    <dma-option value="amsterdam">Amsterdam</dma-option>
    <dma-option value="rotterdam" selected>Rotterdam</dma-option>
    <dma-option value="utrecht">Utrecht</dma-option>
</dma-select>

<p>Selected city: {{ selectedCity }}</p>
```

```ts
import { Component } from '@angular/core';
import {
  DmaSelectComponent,
  DmaOptionComponent,
} from '@dnd-mapp/dma-angular-ui';

@Component({
    selector: 'app-city-select',
    templateUrl: './city-select.component.html',
    imports: [DmaSelectComponent, DmaOptionComponent],
})
export class CitySelectComponent {
    private selectedCity = 'rotterdam';
    
    protected onCityChange(value: string) {
        this.selectedCity = value;
    }
}
```

---

## Theming & Styling

This component does not use the native `<select>` and `<option>` elements for its visual representation. Instead, it renders a custom structure that:

- Integrates with the DMA Angular UI theme (colors, typography, spacing, etc.).
- Applies the same design language across:
    - The trigger (collapsed select)
    - The options panel/container
    - Individual options (default, hover, active, selected states)

Customizing the styling (e.g., via CSS variables, custom classes, or per-project theme overrides) is **not supported**, and there are **no current plans** to add such support. Styling is controlled exclusively by the library.

---

## Roadmap / Planned Enhancements

The current version focuses on a basic, single-select use case. The following features are planned but **not yet implemented**:

- Scrollable options container when there are many options
- Disabled state for the select and/or individual options
- Option groups (grouped options)
- Angular forms integration (`ControlValueAccessor`, `ngModel`, reactive forms)
- Multi-select (selecting multiple options at once)
- Keyboard support (full keyboard navigation and interaction)
- Accessibility improvements (ARIA attributes, focus management, etc.)
