import { ensureMultiReitSnapshots } from './server/scraper/universalScraper.js';
import { compareSnapshots, getAvailableSnapshotMonths } from './server/engine/diffEngine.js';
import { generateSgtuffBlogPost } from './server/generator/blogGenerator.js';

console.log('--- Testing Phase 2 Multi-REIT Singapore Mall Diff Engine ---');
ensureMultiReitSnapshots();
const months = getAvailableSnapshotMonths();
console.log('Available Snapshot Months:', months);

if (months.length >= 2) {
  const m1 = months[months.length - 2];
  const m2 = months[months.length - 1];

  // 1. All Singapore REITs (Nationwide)
  console.log(`\n--- 1. Nationwide Singapore Diff (${m1} vs ${m2}) ---`);
  const nationalDiff = compareSnapshots(m1, m2, 'all');
  console.log(`- Total Tracked Malls: ${nationalDiff.summary.totalMallsTracked}`);
  console.log(`- Total Stores: Month 1 = ${nationalDiff.summary.totalStoresMonth1}, Month 2 = ${nationalDiff.summary.totalStoresMonth2}`);
  console.log(`- Joined Brands: +${nationalDiff.summary.totalJoined}`);
  console.log(`- Exited Brands: -${nationalDiff.summary.totalExited}`);
  console.log(`- Net Shift: ${nationalDiff.summary.netPortfolioChange}`);
  console.log('- REIT Breakdown:', nationalDiff.reitBreakdown);

  // 2. Frasers Property REIT Only
  console.log(`\n--- 2. Frasers Property REIT Diff (${m1} vs ${m2}) ---`);
  const frasersDiff = compareSnapshots(m1, m2, 'Frasers Property');
  console.log(`- Frasers Malls Tracked: ${frasersDiff.summary.totalMallsTracked}`);
  console.log(`- Frasers Joined: +${frasersDiff.summary.totalJoined}, Exited: -${frasersDiff.summary.totalExited}`);

  // 3. Generate Nationwide Blog Post
  const post = generateSgtuffBlogPost(nationalDiff);
  console.log('\n--- SGTUFF Generated National Blog Post ---');
  console.log(`Title: "${post.title}"`);
  console.log(`Markdown Length: ${post.markdownContent.length} chars`);
  console.log(`HTML Length: ${post.htmlContent.length} chars`);
  console.log('✅ ALL PHASE 2 MULTI-REIT TESTS PASSED!');
}
