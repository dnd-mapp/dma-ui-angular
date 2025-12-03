# Checkbox

A standalone, custom Angular checkbox component from the `@dnd-mapp/dma-ui-angular` component library, providing enhanced functionality and form compatibility.

## Installation

To use this component, you first need to install the `@dnd-mapp/dma-ui-angular` package:

```bash
npm install @dnd-mapp/dma-ui-angular
```

## Usage

The `DmaCheckboxComponent` is a standalone component, meaning you can import it directly into your Angular modules or other standalone components.

### Basic Usage

```typescript
// In your component or module
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DmaCheckboxComponent } from '@dnd-mapp/dma-ui-angular';

@Component({
    selector: 'app-my',
    template: `
        <dma-checkbox />
        <dma-checkbox label="Remember Me" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DmaCheckboxComponent],
})
export class MyComponent {}
```

### Inputs

| Input           | Type      | Description                                                                                                                                                                                                                   | Default     |
|-----------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| `label`         | `string`  | Optional. The text label displayed next to the checkbox. If not provided, no label will be rendered.                                                                                                                          | `null`      |
| `value`         | `string`  | Optional. A value to associate with the checkbox. When the checkbox is checked and used within a form (e.g., with `ngModel` or `formControlName`), this value will be part of the submitted form data.                        | `undefined` |
| `checked`       | `boolean` | Optional. Controls the checked state of the checkbox.                                                                                                                                                                         | `false`     |
| `indeterminate` | `boolean` | Optional. Controls the indeterminate state of the checkbox. When `true`, the checkbox will display an indeterminate visual state. This state can only be set programmatically or via the template from outside the component. | `false`     |
| `disabled`      | `boolean` | Optional. Disables the checkbox, preventing user interaction and visual state changes (checked, unchecked, or indeterminate).                                                                                                 | `false`     |

### Outputs

| Output                  | Type                    | Description                                                                                                                                                                                              |
|-------------------------|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `(checkedChange)`       | `EventEmitter<boolean>` | Emits `true` when the checkbox becomes checked, and `false` when it becomes unchecked.                                                                                                                   |
| `(indeterminateChange)` | `EventEmitter<boolean>` | Emits `false` when the indeterminate state is removed due to a user click. The indeterminate state can only be set externally, so this output specifically signals when the user interaction changes it. |

### Example with Inputs and Outputs

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DmaCheckboxComponent } from '@dnd-mapp/dma-ui-angular';

@Component({
    selector: 'app-my',
    template: `
        <section>
            <h2>DmaCheckbox Component Examples</h2>
            
            <dma-checkbox
                label="Accept Terms and Conditions"
                [checked]="agreed"
                (checkedChange)="onAgreedChange($event)"
            />
            <p>Agreed: {{ agreed }}</p>
            
            <dma-checkbox
                label="Select All"
                [checked]="allSelected"
                [indeterminate]="someSelected && !allSelected"
                (checkedChange)="onSelectAllChange($event)"
                (indeterminateChange)="onIndeterminateRemoved($event)"
            />
            <p>All Selected: {{ allSelected }}</p>
            <p>Some Selected: {{ someSelected }}</p>
            
            <dma-checkbox label="Disabled Checkbox" checked disabled />
            <dma-checkbox label="Disabled Indeterminate Checkbox" indeterminate disabled />
        </section>
    `,
    styles: [
        `
            section {
                display: flex;
                flex-direction: column;
                gap: 16px;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 8px;
                max-width: 400px;
                margin: 20px auto;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DmaCheckboxComponent],
})
export class MyComponent {
    protected agreed = false;
    protected allSelected = false;
    protected someSelected = true; // Simulating some items selected for indeterminate state

    protected onAgreedChange(checked: boolean) {
        this.agreed = checked;
        console.log('Agreed changed:', checked);
    }

    protected onSelectAllChange(checked: boolean) {
        this.allSelected = checked;
        this.someSelected = false; // When all are selected or none, no longer some selected
        console.log('Select All changed:', checked);
    }

    protected onIndeterminateRemoved(removed: boolean) {
        // This will emit `false` when the user clicks an indeterminate checkbox,
        // causing it to become checked (and thus no longer indeterminate).
        if (!removed) {
            console.log('Indeterminate state removed by user click.');
            // You might update your internal state here if needed,
            // e.g., if you have a source of truth for the indeterminate state
            // that needs to be reset when the user interacts.
            this.someSelected = false;
        }
    }
}
```

### Component Behavior

-  **Click Interaction**: Clicking the component will toggle its `checked` state.
-  **Indeterminate State**:
     -  The `indeterminate` state can only be set externally via the `indeterminate` input.
     -  If the component is in an `indeterminate` state and a user clicks it, the `indeterminate` state will be **removed**, and the `checked` state will be set to `true`.
     -  Subsequent clicks will toggle the `checked` state as normal, and the `indeterminate` state will remain `false`.
     -  The `(indeterminateChange)` output will emit `false` when the `indeterminate` state is removed by a user click.
-  **Disabled State**: When the `disabled` state is set, the component will not respond to user input and will visually reflect its disabled status. It will not display `checked`, `unchecked`, or `indeterminate` states.

### Angular Forms Compatibility

The `DmaCheckboxComponent` implements `ControlValueAccessor`, making it fully compatible with Angular's template-driven and reactive forms.

#### Template-Driven Forms

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DmaCheckboxComponent } from '@dnd-mapp/dma-ui-angular';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-my',
    template: `
        <form #myForm="ngForm">
            <h3>Template-Driven Form</h3>
            <dma-checkbox
                label="Receive Newsletter"
                name="newsletter"
                value="subscribed"
                [(ngModel)]="formData.newsletter"
            />
            <dma-checkbox
                label="Agree to Terms (different value)"
                name="terms"
                value="true"
                [(ngModel)]="formData.terms"
            />
            <p>Newsletter preference: {{ formData | json }}</p>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, DmaCheckboxComponent, JsonPipe],
})
export class MyComponent {
    protected formData = { newsletter: true, terms: false };
}
```

#### Reactive Forms

```typescript
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DmaCheckboxComponent } from '@dnd-mapp/dma-ui-angular';

@Component({
    selector: 'app-my',
    template: `
        <form [formGroup]="userProfileForm">
            <h3>Reactive Form</h3>
            <dma-checkbox
                label="Enable Notifications"
                formControlName="notifications"
                value="enabled"
            />
            <dma-checkbox
                label="Agree to Data Usage"
                formControlName="dataAgreement"
                value="agreed"
            />
            <dma-checkbox
                label="Disabled Field"
                formControlName="disabledField"
                value="disabled"
            />
            
            <p>Form Value: {{ userProfileForm.value | json }}</p>
            <button (click)="patchIndeterminate()">Patch Indeterminate State</button>
        </form>
    `,
    styles: [
        `
            form {
                display: flex;
                flex-direction: column;
                gap: 16px;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 8px;
                max-width: 400px;
                margin: 20px auto;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, DmaCheckboxComponent],
})
export class MyComponent implements OnInit {
    private readonly formBuilder = inject(FormBuilder);
    private readonly destroyRef = inject(DestroyRef);

    protected userProfileForm = this.formBuilder.group({
        notifications: [true],
        dataAgreement: [false],
        disabledField: [{ value: true, disabled: true }], // Example of a disabled field
    });

    public ngOnInit() {
        // You can also observe changes
        this.userProfileForm.valueChanges.subscribe((value) => {
            console.log('Reactive form value changed:', value);
        });
    }

    protected patchIndeterminate() {
        // To set indeterminate state in reactive forms, you would typically
        // have a custom form control that manages the indeterminate state.
        // However, for a simple checkbox, you might need to directly interact
        // with the component if you want to set the indeterminate visual.
        // This example focuses on the `checked` state, which is what the form control tracks.
        // For `indeterminate`, you would use the `[indeterminate]` input directly if needed for visual only.
    }
}
```
