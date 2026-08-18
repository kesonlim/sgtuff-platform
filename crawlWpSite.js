import fs from 'fs';
import path from 'path';
import https from 'https';

const routes = [
  '/',
  '/about-us/',
  '/membership-plan/',
  '/219-2/',
  '/business-network/',
  '/latest-news/',
  '/collaborate-with-us/',
  '/contract-development-for-fair-tenancy-course-3/',
  '/home-safety-eldercare-support-free-benefits-2/',
  '/home-safety-eldercare-support-free-benefits/'
];

const outputDir = './apps/main-site/src/scraped';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function fetchPage(route) {
  return new Promise((resolve, reject) => {
    const url = `https://sgtuff.org.sg${route}`;
    console.log(`Fetching ${url}...`);

    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`✅ Fetched ${route} (${data.length} bytes)`);
        resolve({ route, html: data });
      });
    }).on('error', (err) => {
      console.error(`❌ Error fetching ${route}:`, err.message);
      resolve({ route, html: '' });
    });
  });
}

async function run() {
  const results = {};
  for (const route of routes) {
    const res = await fetchPage(route);
    results[route] = res.html;
  }

  const jsonPath = path.join(outputDir, 'wp_pages.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n✅ Saved all 10 WordPress pages to ${jsonPath}`);
}

run();
