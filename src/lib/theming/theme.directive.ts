import { Directive, DOCUMENT, inject, input } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { DEFAULT_THEME, DmaTheme, themeAttribute } from './theme';
import { ThemeService } from './theme.service';

@Directive({ selector: '[dmaTheme]' })
export class ThemeDirective {
    private readonly document = inject(DOCUMENT);
    private readonly themeService = inject(ThemeService);

    public readonly theme = input(DEFAULT_THEME, { alias: 'dmaTheme', transform: themeAttribute });

    constructor() {
        toObservable(this.theme)
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (theme) => {
                    this.updateTheme(theme);
                },
            });
    }

    private updateTheme(theme: DmaTheme) {
        this.themeService.setTheme(this.document.documentElement, theme);
    }
}
