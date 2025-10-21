# InputComponent

The `InputComponent` is a presentational, standalone Angular component that provides a flexible input field with an associated label. It's designed for use within Angular applications and integrates seamlessly with Angular's reactive and template-driven forms.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Basic Usage](#basic-usage)
    - [Leading Icon](#leading-icon)
    - [Disabled Input](#disabled-input)
    - [Readonly Input](#readonly-input)
    - [Hidden Label](#hidden-label)
- [API](#api)
    - [Inputs](#inputs)
    - [Outputs](#outputs)
    - [Content Projection Slots](#content-projection-slots)
- [Forms Integration](#forms-integration)

## Installation

First, ensure you have installed the `@dnd-mapp/dma-ui-angular` library in your Angular project:

```bash
npm install @dnd-mapp/dma-ui-angular
```

As a standalone component, you can import `InputComponent` directly into your component's `imports` array without needing an Angular module.

```typescript
import { InputComponent } from '@dnd-mapp/dma-ui-angular';

@Component({
    selector: 'app-my',
    template: `<dma-input label="My Input" />`,
    imports: [InputComponent],
})
export class MyComponent {}
```

## Usage

### Basic Usage

The `InputComponent` requires a `label` input to provide accessible context to the input field.

```html
<dma-input label="Full Name" />
```

To set an initial value, use the `value` input:

```html
<dma-input label="Email Address" value="test@example.com" />
```

You can listen for changes to the input's value using the `(change)` output:

```typescript
import { Component } from '@angular/core';
import { InputComponent } from '@dnd-mapp/dma-ui-angular';

@Component({
    selector: 'app-my',
    template: `<dma-input label="Search Query" (change)="onInputChange($event)" />`,
    imports: [InputComponent],
})
class MyComponent {
    protected onInputChange(newValue: string) {
        console.log('Input value changed:', newValue);
    }
}
```

### Leading Icon

You can project a leading icon into the input component using the `dma-leading-icon` content projection slot. This is useful for adding visual context or functionality, such as a search icon or an email icon.

```html
<dma-input label="Username">
    <dma-icon dma-so-user-icon ngProjectAs="dma-leading-icon" />
</dma-input>
```

### Disabled Input

To prevent user interaction with the input, use the `disabled` input.

```html
<dma-input label="Disabled Field" disabled />
```

### Readonly Input

To make the input's value non-editable while still allowing it to be selected and copied, use the `readonly` input.

```html
<dma-input label="Readonly Value" value="This cannot be edited." readonly />
```

### Hidden Label

The label can be hidden in case it isn't required.

```html
<dma-input label="Search Input" value="Search..." hideLabel />
```

## API

### Inputs

| Name          | Type      | Default | Description                                                   | Required |
|---------------|-----------|---------|---------------------------------------------------------------|----------|
| `label`       | `string`  | `''`    | **Required.** The text displayed as the input's label.        | Yes      |
| `hideLabel`   | `boolean` | `false` | When `true`, the label will be visually hidden.               | No       |
| `value`       | `string`  | `''`    | The current value of the input element.                       | No       |
| `placeholder` | `string`  | `''`    | The placeholder text displayed when the input is empty.       | No       |
| `disabled`    | `boolean` | `false` | When `true`, the input will be disabled and non-interactive.  | No       |
| `readonly`    | `boolean` | `false` | When `true`, the input's value cannot be changed by the user. | No       |

### Outputs

| Name      | Type                    | Description                                                                     |
|-----------|-------------------------|---------------------------------------------------------------------------------|
| `change`  | `EventEmitter<string>`  | Emits the current value of the input whenever the native `change` event occurs. |

### Content Projection Slots

| Selector           | Description                                                                  |
|--------------------|------------------------------------------------------------------------------|
| `dma-leading-icon` | Content projected here will appear as a leading icon within the input field. |

## Forms Integration

The `InputComponent` implements `ControlValueAccessor`, making it fully compatible with Angular's forms API, including `FormControl`, `ngModel`, and`formControlName`.

### Reactive Forms Example

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '@dnd-mapp/dma-ui-angular';

@Component({
    selector: 'app-reactive-form-example',
    template: `
        <form>
            <dma-input label="Username" [formControl]="usernameControl" />
            <p>Current username: {{ usernameControl.value }}</p>
        </form>
    `,
    imports: [InputComponent, ReactiveFormsModule],
})
export class ReactiveFormExampleComponent {
    protected usernameControl = new FormControl('johndoe');
}
```

### Template-driven Forms Example (ngModel)

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '@dnd-mapp/dma-ui-angular';

@Component({
    selector: 'app-template-form-example',
    template: `
        <form>
            <dma-input label="Feedback" [(ngModel)]="feedbackText" name="feedback" />
            <p>Your feedback: {{ feedbackText }}</p>
        </form>
    `,
    imports: [InputComponent, FormsModule],
})
export class TemplateFormExampleComponent {
    protected feedbackText = 'Initial feedback.';
}
```
