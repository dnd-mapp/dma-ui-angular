import { dirname } from '@angular/compiler-cli';
import { input, select } from '@inquirer/prompts';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { JSDOM } from 'jsdom';
import { join } from 'path';
import { format } from 'prettier';

const BASE_ICON_PATH = 'src/lib/icons';

const TOOL_BASE_PATH = 'tools/generate-icon-component';
const TEMPLATE_FILE_NAME = 'component-template';

const Placeholders = {
    CLASS_ICON_NAME: '$classIconName',
    CLASS_ICON_TYPE: '$classIconType',
    FILE_ICON_NAME: '$name',
    FILE_ICON_TYPE: '$iconType',
} as const;

const tsTemplate = `import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dma-icon[dma-${Placeholders.FILE_ICON_TYPE}-${Placeholders.FILE_ICON_NAME}-icon]',
    templateUrl: './${Placeholders.FILE_ICON_TYPE}-${Placeholders.FILE_ICON_NAME}-icon.component.svg',
    styleUrl: '../../icons.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
})
export class ${Placeholders.CLASS_ICON_TYPE}${Placeholders.CLASS_ICON_NAME}IconComponent {}
`;

const exportTemplate = `export * from './$iconName/$fileName';\n`;

const IconTypeValues = {
    CLASS_REGULAR: 'Re',
    CLASS_SOLID: 'So',
    FILE_REGULAR: 're',
    FILE_SOLID: 'so',
} as const;

const IconTypes = {
    SOLID: 'solid',
    REGULAR: 'regular',
} as const;

type IconType = (typeof IconTypes)[keyof typeof IconTypes];

interface IconInfo {
    name: string;
    type: IconType;
}

interface Templates {
    tsTemplate: string;
    svgTemplate: string;
}

async function retrieveIconInfo() {
    const iconName = await input({
        message: 'What is the name of the icon?',
        validate: (value: string) => {
            if (value.trim().length === 0) return 'The icon name cannot be empty.';
            return true;
        },
    });
    const iconType = await select<IconType>({
        message: 'What type is the icon?',
        choices: Object.values(IconTypes),
        default: IconTypes.SOLID,
    });

    return {
        name: iconName,
        type: iconType,
    } satisfies IconInfo;
}

async function retrieveTemplates() {
    const svgTemplate = await readFile(join(TOOL_BASE_PATH, `${TEMPLATE_FILE_NAME}.svg`), { encoding: 'utf-8' });

    return {
        svgTemplate: svgTemplate,
        tsTemplate: `${tsTemplate}`,
    } satisfies Templates;
}

function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function capitalizeEach(value: string) {
    return value
        .split('-')
        .map((part) => capitalize(part))
        .join('');
}

function transformTsTemplate(template: string, iconInfo: IconInfo) {
    if (iconInfo.type === IconTypes.SOLID) {
        template = template
            .replace(/\$classIconType/g, IconTypeValues.CLASS_SOLID)
            .replace(/\$iconType/g, IconTypeValues.FILE_SOLID);
    }
    if (iconInfo.type === IconTypes.REGULAR) {
        template = template
            .replace(/\$classIconType/g, IconTypeValues.CLASS_REGULAR)
            .replace(/\$iconType/g, IconTypeValues.FILE_REGULAR);
    }
    return template.replace(/\$classIconName/g, capitalizeEach(iconInfo.name)).replace(/\$name/g, iconInfo.name);
}

async function formatSvgTemplate(template: string) {
    return await format(template, { parser: 'html', tabWidth: 4 });
}

async function addFillAttribute(template: string) {
    const dom = new JSDOM(template, { contentType: 'image/xvg+xml' });
    const document = dom.window.document;

    const pathElement = document.querySelector('path');

    if (!pathElement) return await formatSvgTemplate(template);
    pathElement.setAttribute('fill', 'currentColor');

    return await formatSvgTemplate(document.documentElement.outerHTML);
}

async function generateFiles(templates: Templates, iconInfo: IconInfo) {
    const iconTypeFileNamePart =
        iconInfo.type === IconTypes.SOLID ? IconTypeValues.FILE_SOLID : IconTypeValues.FILE_REGULAR;
    const baseFileName = `${iconTypeFileNamePart}-${iconInfo.name}-icon.component`;

    const svgFilePath = join(BASE_ICON_PATH, iconInfo.type, iconInfo.name, `${baseFileName}.svg`);
    const tsFilePath = join(BASE_ICON_PATH, iconInfo.type, iconInfo.name, `${baseFileName}.ts`);

    await mkdir(dirname(svgFilePath), { recursive: true });
    await writeFile(svgFilePath, templates.svgTemplate, { encoding: 'utf-8' });
    await writeFile(tsFilePath, templates.tsTemplate, { encoding: 'utf-8' });

    return baseFileName;
}

async function updateIndex(iconInfo: IconInfo, baseFileName: string) {
    const indexFilePath = join(BASE_ICON_PATH, iconInfo.type, 'index.ts');
    const exportStatement = exportTemplate
        .replace(/\$iconName/g, iconInfo.name)
        .replace(/\$fileName/g, `${baseFileName}`);

    await writeFile(indexFilePath, exportStatement, {
        encoding: 'utf-8',
        flag: 'a+',
    });
}

async function main() {
    const iconInfo = await retrieveIconInfo();
    const templates = await retrieveTemplates();

    templates.tsTemplate = transformTsTemplate(templates.tsTemplate, iconInfo);
    templates.svgTemplate = await addFillAttribute(templates.svgTemplate);

    const baseFileName = await generateFiles(templates, iconInfo);
    await updateIndex(iconInfo, baseFileName);

    // 1. Determine solid or regular icon.
    // 2. Name of icon.
    // 3. Format template.
    // 4. Generate component files.
}

(async () => await main())();
