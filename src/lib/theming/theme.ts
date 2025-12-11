export const DmaThemes = {
    LIGHT: 'light',
    DARK: 'dark',
} as const;

export type DmaTheme = (typeof DmaThemes)[keyof typeof DmaThemes];

export const DEFAULT_THEME: DmaTheme = DmaThemes.DARK;

export function themeAttribute(value: unknown) {
    return Object.values(DmaThemes).find((theme) => theme === value) ?? DEFAULT_THEME;
}

export const ThemeVariables = {
    FONT_FAMILY: '--font-family',
    FONT_SIZE: '--font-size',

    FW_REGULAR: '--fw-regular',
    FW_BOLD: '--fw-bold',

    BORDER_COLOR: '--border-color',

    BACKGROUND: '--background',
    ON_BACKGROUND: '--on-background',

    SURFACE: '--surface',
    ON_SURFACE: '--on-surface',

    INVERSE_SURFACE: '--inverse-surface',
    ON_INVERSE_SURFACE: '--on-inverse-surface',

    PRIMARY: '--primary',
    ON_PRIMARY: '--on-primary',

    SECONDARY: '--secondary',
    ON_SECONDARY: '--on-secondary',

    DANGER: '--danger',
    ON_DANGER: '--on-danger',

    DISABLED: '--disabled',
    ON_DISABLED: '--on-disabled',
    DISABLED_OPACITY: '--disabled-opacity',
} as const;

export type ThemeVariable = (typeof ThemeVariables)[keyof typeof ThemeVariables];

export type ThemeValues = Partial<Record<ThemeVariable, string | number>>;

const base: ThemeValues = {
    [ThemeVariables.FONT_FAMILY]: 'Roboto, sans-serif',
    [ThemeVariables.FONT_SIZE]: '100%',
    [ThemeVariables.FW_REGULAR]: '400',
    [ThemeVariables.FW_BOLD]: '500',
};

export const light: ThemeValues = {
    ...base,
    [ThemeVariables.BORDER_COLOR]: 'oklch(0.75 0 0)',

    [ThemeVariables.BACKGROUND]: 'oklch(1 0 0)',
    [ThemeVariables.ON_BACKGROUND]: 'oklch(0.1 0 0)',

    [ThemeVariables.SURFACE]: 'oklch(0.99 0 0)',
    [ThemeVariables.ON_SURFACE]: 'oklch(0.1 0 0)',

    [ThemeVariables.INVERSE_SURFACE]: 'oklch(0.3 0 0)',
    [ThemeVariables.ON_INVERSE_SURFACE]: 'oklch(0.95 0 0)',

    [ThemeVariables.PRIMARY]: 'oklch(0.6 0.2 250)',
    [ThemeVariables.ON_PRIMARY]: 'oklch(0.98 0 0)',

    [ThemeVariables.SECONDARY]: 'oklch(0.6 0.2 290)',
    [ThemeVariables.ON_SECONDARY]: 'oklch(0.98 0 0)',

    [ThemeVariables.DANGER]: 'oklch(0.55 0.2 30)',
    [ThemeVariables.ON_DANGER]: 'oklch(0.98 0 0)',

    [ThemeVariables.DISABLED]: 'oklch(0.75 0 0)',
    [ThemeVariables.ON_DISABLED]: 'oklch(0.2 0 0)',
    [ThemeVariables.DISABLED_OPACITY]: 0.33,
};

export const dark: ThemeValues = {
    ...base,
    [ThemeVariables.BORDER_COLOR]: 'oklch(0.5 0 0)',

    [ThemeVariables.BACKGROUND]: 'oklch(0.2 0 0)',
    [ThemeVariables.ON_BACKGROUND]: 'oklch(0.97 0 0)',

    [ThemeVariables.SURFACE]: 'oklch(0.24 0 0)',
    [ThemeVariables.ON_SURFACE]: 'oklch(0.97 0 0)',

    [ThemeVariables.INVERSE_SURFACE]: 'oklch(0.3 0 0)',
    [ThemeVariables.ON_INVERSE_SURFACE]: 'oklch(0.95 0 0)',

    [ThemeVariables.PRIMARY]: 'oklch(0.6 0.2 250)',
    [ThemeVariables.ON_PRIMARY]: 'oklch(0.98 0 0)',

    [ThemeVariables.SECONDARY]: 'oklch(0.6 0.2 290)',
    [ThemeVariables.ON_SECONDARY]: 'oklch(0.98 0 0)',

    [ThemeVariables.DANGER]: 'oklch(0.55 0.2 30)',
    [ThemeVariables.ON_DANGER]: 'oklch(0.98 0 0)',

    [ThemeVariables.DISABLED]: 'oklch(0.6 0 0)',
    [ThemeVariables.ON_DISABLED]: 'oklch(0.2 0 0)',
    [ThemeVariables.DISABLED_OPACITY]: 0.33,
};

type Themes = Record<DmaTheme, ThemeValues>;

export const themes: Themes = {
    [DmaThemes.LIGHT]: light,
    [DmaThemes.DARK]: dark,
};
