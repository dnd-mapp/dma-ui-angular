import { ComponentHarness, HarnessLoader, HarnessQuery } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

export interface CreateTestEnvironmentParams<Component = unknown, Harness extends ComponentHarness = null> {
    testComponent?: Type<Component>;
    harness?: HarnessQuery<Harness>;
    providers?: unknown[];
    imports?: unknown[];
}

export async function createTestEnvironment<Component = unknown, Harness extends ComponentHarness = null>(
    params: CreateTestEnvironmentParams<Component, Harness>,
) {
    TestBed.configureTestingModule({
        imports: [...(params.testComponent ? [params.testComponent] : []), ...(params.imports ? params.imports : [])],
        providers: [...(params.providers ? params.providers : [])],
    });

    let harnessLoader: HarnessLoader;
    let harness: Harness;

    if (params.testComponent && params.harness) {
        harnessLoader = TestbedHarnessEnvironment.loader(component);

        harness = await harnessLoader.getHarness(params.harness);
    }
    return {
        ...(harness ? { harness: harness } : {}),
        ...(harnessLoader ? { harnessLoader: harnessLoader } : {}),
    };
}
