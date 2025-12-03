import { copyFile, rm } from 'fs/promises';

async function prePublish() {
    await copyFile('LICENSE', 'dist/dma-ui-angular/LICENSE');

    await rm('dist/dma-ui-angular/README.md', { force: true });
    await copyFile('build/README.md', 'dist/dma-ui-angular/README.md');
}

prePublish().catch((error) => console.log(error));
