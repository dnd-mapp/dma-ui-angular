import { Component, DOCUMENT, signal } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { ThemeService } from '@dnd-mapp/dma-ui-angular';
import { createTestEnvironment } from '@dnd-mapp/dma-ui-angular/test';
import { DmaTheme, DmaThemes } from './theme';
import { ThemeDirective } from './theme.directive';

describe('ThemeDirective', () => {
    @Component({
        template: `<div [dmaTheme]="theme()">My element</div>`,
        imports: [ThemeDirective],
    })
    class TestComponent {
        public readonly theme = signal<DmaTheme>(null);
    }

    async function setupTest() {
        const { component, fixture } = await createTestEnvironment({
            testComponent: TestComponent,
        });

        fixture.detectChanges();

        return {
            fixture: fixture,
            docElement: getTestBed().inject(DOCUMENT).documentElement,
            component: component,
            themeService: getTestBed().inject(ThemeService),
        };
    }

    it('should set the theme styles', async () => {
        const { docElement } = await setupTest();

        expect(docElement.getAttribute('style')).contain('--background: oklch(0.2 0 0);');
    });

    it('should adjust the theme styles when theme is changed', async () => {
        const { docElement, component, fixture, themeService } = await setupTest();

        expect(docElement.getAttribute('style')).contain('--background: oklch(0.2 0 0);');
        expect(themeService.theme).toEqual(DmaThemes.DARK);

        component.theme.set(DmaThemes.LIGHT);
        fixture.detectChanges();

        expect(docElement.getAttribute('style')).not.contain('--background: oklch(0.2 0 0);');
        expect(docElement.getAttribute('style')).contain('--background: oklch(1 0 0);');
        expect(themeService.theme).toEqual(DmaThemes.LIGHT);
    });
});
