// organize-imports-ignore
import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { ZonelessTestingModule } from './utils';

getTestBed().initTestEnvironment([BrowserTestingModule, ZonelessTestingModule], platformBrowserTesting());
