import { publishToWordPress } from './server/publisher/wordpressPublisher.js';
import { compareSnapshots, getAvailableSnapshotMonths } from './server/engine/diffEngine.js';
import { generateSgtuffBlogPost } from './server/generator/blogGenerator.js';
import { ensureMultiReitSnapshots } from './server/scraper/universalScraper.js';

async function main() {
  console.log('--- Publishing Phase 2 National Singapore Retail Report to WordPress ---');

  ensureMultiReitSnapshots();
  const months = getAvailableSnapshotMonths();
  const baseline = months[months.length - 2] || '2026-07';
  const current = months[months.length - 1] || '2026-08';

  const nationalDiff = compareSnapshots(baseline, current, 'all');
  const blogPost = generateSgtuffBlogPost(nationalDiff);

  console.log(`Publishing post: "${blogPost.title}"...`);
  const result = await publishToWordPress({
    siteUrl: 'https://sgtuff.org.sg',
    username: 'kesonlim',
    applicationPassword: 'a4e2 tpKg MIqv MpKr aCOc 71U7',
    title: blogPost.title,
    content: blogPost.htmlContent,
    status: 'draft'
  });

  if (result.success) {
    console.log('\n🎉 SUCCESS! Phase 2 National Retail Report Published to SGTUFF WordPress!');
    console.log(`- Post ID: ${result.id}`);
    console.log(`- Status: ${result.status.toUpperCase()}`);
    console.log(`- Title: ${result.title}`);
    console.log(`- Preview Link: ${result.link}`);
  } else {
    console.error('❌ Failed:', result.error);
  }
}

main().catch(console.error);
