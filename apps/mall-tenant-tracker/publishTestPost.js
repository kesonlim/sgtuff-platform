import { publishToWordPress, testWordPressConnection } from './server/publisher/wordpressPublisher.js';
import { compareSnapshots, getAvailableSnapshotMonths } from './server/engine/diffEngine.js';
import { generateSgtuffBlogPost } from './server/generator/blogGenerator.js';
import { ensureHistoricalSnapshots } from './server/scraper/capitalandScraper.js';

async function main() {
  console.log('--- Connecting to SGTUFF WordPress Site (https://sgtuff.org.sg) ---');

  const credentials = {
    siteUrl: 'https://sgtuff.org.sg',
    username: 'kesonlim',
    applicationPassword: 'a4e2 tpKg MIqv MpKr aCOc 71U7'
  };

  // 1. Test credentials
  console.log('Testing WP REST API Authentication...');
  const testRes = await testWordPressConnection(credentials);

  if (!testRes.success) {
    console.error('❌ Connection Failed:', testRes.error);
    process.exit(1);
  }

  console.log(`✅ Authenticated successfully as WP User: ${testRes.user.name} (ID: ${testRes.user.id}, Slug: ${testRes.user.slug})!`);

  // 2. Generate SGTUFF CapitaLand Retail Movement Report
  ensureHistoricalSnapshots();
  const months = getAvailableSnapshotMonths();
  const baseline = months[months.length - 2] || '2026-07';
  const current = months[months.length - 1] || '2026-08';

  console.log(`Generating SGTUFF Retail Movement Report (${baseline} vs ${current})...`);
  const diffResult = compareSnapshots(baseline, current);
  const blogPost = generateSgtuffBlogPost(diffResult);

  // 3. Publish post to WordPress
  console.log(`Publishing test blog post: "${blogPost.title}"...`);
  const publishRes = await publishToWordPress({
    ...credentials,
    title: blogPost.title,
    content: blogPost.htmlContent,
    status: 'draft' // Creating as draft for review
  });

  if (publishRes.success) {
    console.log('\n🎉 SUCCESS! Test Blog Post Published to SGTUFF WordPress!');
    console.log(`- Post ID: ${publishRes.id}`);
    console.log(`- Status: ${publishRes.status.toUpperCase()}`);
    console.log(`- Title: ${publishRes.title}`);
    console.log(`- Direct Link / Preview: ${publishRes.link}`);
  } else {
    console.error('❌ Failed to publish post:', publishRes.error);
  }
}

main().catch(err => {
  console.error('Unexpected error:', err);
});
