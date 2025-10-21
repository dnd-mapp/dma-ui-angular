export const ButtonSizes = {
    SMALL: 'small',
    MEDIUM: 'medium',
} as const;

export type ButtonSize = (typeof ButtonSizes)[keyof typeof ButtonSizes];

export const DEFAULT_BUTTON_SIZE: ButtonSize = ButtonSizes.MEDIUM;

export function buttonSizeAttribute(value: unknown) {
    return Object.values(ButtonSizes).find((size) => size === value) ?? DEFAULT_BUTTON_SIZE;
}
