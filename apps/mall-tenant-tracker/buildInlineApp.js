import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function buildInline() {
  console.log('--- Generating Clean Dynamic Standalone Inline HTML Bundle ---');

  const distDir = path.join(__dirname, 'dist');
  const assetsDir = path.join(distDir, 'assets');

  // Find css and js files dynamically in dist/assets/
  const assetFiles = fs.readdirSync(assetsDir);
  const cssFile = assetFiles.find(f => f.endsWith('.css'));
  const jsFile = assetFiles.find(f => f.endsWith('.js'));

  if (!cssFile || !jsFile) {
    throw new Error('Could not find CSS or JS bundle in dist/assets');
  }

  const cssPath = path.join(assetsDir, cssFile);
  const jsPath = path.join(assetsDir, jsFile);
  const logoPath = path.join(distDir, 'sgtuff-logo.jpg');

  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛍️</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SGTUFF Retail Tracker - Singapore Shopping Malls Retail Movement Index</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Open+Sans:wght@400;600;700&family=Outfit:wght@500;600;700;800&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet">
    <!-- INLINE_CSS -->
  </head>
  <body>
    <div id="root"></div>
    <!-- INLINE_JS -->
  </body>
</html>`;

  const cssContent = fs.readFileSync(cssPath, 'utf8');
  let jsContent = fs.readFileSync(jsPath, 'utf8');
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = `data:image/jpeg;base64,${logoBuffer.toString('base64')}`;

  jsContent = jsContent.split('/sgtuff-logo.jpg').join(logoBase64);
  jsContent = jsContent.split('sgtuff-logo.jpg').join(logoBase64);

  const styleTag = `<style>\n${cssContent}\n</style>`;
  const scriptTag = `<script type="module">\n${jsContent}\n</script>`;

  const finalHtml = indexHtml
    .replace('<!-- INLINE_CSS -->', () => styleTag)
    .replace('<!-- INLINE_JS -->', () => scriptTag);

  const outputPath = path.join(distDir, 'index.html');
  fs.writeFileSync(outputPath, finalHtml, 'utf8');

  // Copy to Desktop
  const desktopFolder = path.join(process.env.HOME, 'Desktop', 'SGTUFF-Tracker-Build');
  fs.mkdirSync(desktopFolder, { recursive: true });
  fs.writeFileSync(path.join(desktopFolder, 'index.html'), finalHtml, 'utf8');

  console.log(`✅ Single Inline HTML written cleanly to ${outputPath} (${(finalHtml.length / 1024).toFixed(1)} KB)`);
  console.log(`✅ Updated Desktop index.html in ${desktopFolder}`);
}

buildInline();
