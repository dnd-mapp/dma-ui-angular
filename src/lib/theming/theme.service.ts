import { Injectable, signal } from '@angular/core';
import { DmaTheme, themes } from './theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    public get theme() {
        return this._theme();
    }
    private _theme = signal<DmaTheme>(null);

    public setTheme(element: HTMLElement, theme: DmaTheme) {
        this._theme.set(theme);

        const themeVariables = Object.entries(themes[theme]);
        let style = '';

        for (const [variable, value] of themeVariables) {
            style += `${variable}: ${value}; `;
        }
        element.setAttribute('style', style.trim());
    }
}
