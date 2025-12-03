import { copyFile } from 'fs/promises';

async function prePublish() {
    await copyFile('LICENSE', 'dist/dma-ui-angular/LICENSE');
}

prePublish().catch((error) => console.log(error));
