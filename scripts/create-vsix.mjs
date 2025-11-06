import { promises as fs } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const thisDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(thisDir, '..');

const readJson = async (filePath) => JSON.parse(await fs.readFile(filePath, 'utf8'));

const escapeXml = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const run = (command) => {
  execSync(command, { stdio: 'inherit', cwd: projectRoot });
};

const main = async () => {
  const packageJsonPath = path.join(projectRoot, 'package.json');
  const pkg = await readJson(packageJsonPath);
  if (!pkg.publisher) {
    throw new Error('package.json must define a "publisher" field to build a VSIX.');
  }

  run('npm run compile');

  await fs.rm(path.join(projectRoot, 'out', 'test'), { recursive: true, force: true });

  const distDir = path.join(projectRoot, 'dist');
  await fs.rm(distDir, { recursive: true, force: true });
  const extensionDir = path.join(distDir, 'extension');
  await fs.mkdir(extensionDir, { recursive: true });

  const copyEntries = [
    ['package.json', 'package.json'],
    ['README.md', 'README.md'],
    ['CHANGELOG.md', 'CHANGELOG.md'],
    ['out', 'out'],
  ];

  for (const [source, destination] of copyEntries) {
    const sourcePath = path.join(projectRoot, source);
    try {
      const stats = await fs.stat(sourcePath);
      const targetPath = path.join(extensionDir, destination);
      if (stats.isDirectory()) {
        await fs.cp(sourcePath, targetPath, { recursive: true });
      } else {
        await fs.mkdir(path.dirname(targetPath), { recursive: true });
        await fs.copyFile(sourcePath, targetPath);
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        continue;
      }
      throw error;
    }
  }

  const categories = Array.isArray(pkg.categories) ? pkg.categories.join(',') : '';
  const tags = Array.isArray(pkg.keywords) ? pkg.keywords.join(',') : '';
  const engine = pkg.engines?.vscode ?? '';
  const displayName = pkg.displayName ?? pkg.name;
  const description = pkg.description ?? '';
  const identity = `${pkg.publisher}.${pkg.name}`;

  const manifest = `<?xml version="1.0" encoding="utf-8"?>\n<PackageManifest Version="2.0.0" xmlns="http://schemas.microsoft.com/developer/vsx-schema/2011" xmlns:d="http://schemas.microsoft.com/developer/vsx-schema-design/2011">\n  <Metadata>\n    <Identity Language="en-US" Id="${escapeXml(identity)}" Version="${escapeXml(pkg.version)}" Publisher="${escapeXml(pkg.publisher)}" />\n    <DisplayName>${escapeXml(displayName)}</DisplayName>\n    <Description xml:space="preserve">${escapeXml(description)}</Description>\n    <Tags>${escapeXml(tags)}</Tags>\n    <Categories>${escapeXml(categories)}</Categories>\n    <GalleryFlags>Public</GalleryFlags>\n    <Properties>\n      <Property Id="Microsoft.VisualStudio.Code.Engine" Value="${escapeXml(engine)}" />\n    </Properties>\n  </Metadata>\n  <Installation>\n    <InstallationTarget Id="Microsoft.VisualStudio.Code" />\n  </Installation>\n  <Dependencies />\n  <Assets>\n    <Asset Type="Microsoft.VisualStudio.Code.Manifest" Path="extension/package.json" Addressable="true" />\n    <Asset Type="Microsoft.VisualStudio.Services.Content.Details" Path="extension/README.md" Addressable="true" />\n    <Asset Type="Microsoft.VisualStudio.Services.Content.Changelog" Path="extension/CHANGELOG.md" Addressable="true" />\n    <Asset Type="Microsoft.VisualStudio.Code.Extension" Path="extension/out/extension.js" Addressable="false" />\n  </Assets>\n</PackageManifest>\n`;

  await fs.writeFile(path.join(distDir, 'extension.vsixmanifest'), manifest, 'utf8');

  const contentTypes = `<?xml version="1.0" encoding="utf-8"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">\n  <Default Extension="vsixmanifest" ContentType="text/xml" />\n  <Default Extension="json" ContentType="application/json" />\n  <Default Extension="js" ContentType="application/javascript" />\n  <Default Extension="map" ContentType="application/json" />\n  <Default Extension="md" ContentType="text/markdown" />\n</Types>\n`;

  await fs.writeFile(path.join(distDir, '[Content_Types].xml'), contentTypes, 'utf8');

  const vsixName = `${pkg.name}-${pkg.version}.vsix`;
  const zipCommand = `cd dist && zip -r ../${vsixName} .`;
  run(zipCommand);

  await fs.rm(distDir, { recursive: true, force: true });

  console.log(`\nVSIX package created at ${path.join(projectRoot, vsixName)}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

