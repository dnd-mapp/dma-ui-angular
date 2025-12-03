export const ButtonTypes = {
    TEXT: 'text',
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    DANGER: 'danger',
} as const;

export type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes];

export const DEFAULT_BUTTON_TYPE: ButtonType = ButtonTypes.TEXT;

export function buttonTypeAttribute(value: unknown) {
    return Object.values(ButtonTypes).find((type) => value === type) ?? DEFAULT_BUTTON_TYPE;
}
