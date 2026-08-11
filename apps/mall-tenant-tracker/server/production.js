import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  singaporeMalls, 
  ensureMultiReitSnapshots 
} from './scraper/universalScraper.js';
import { 
  getAvailableSnapshotMonths, 
  loadSnapshot, 
  compareSnapshots 
} from './engine/diffEngine.js';
import { generateSgtuffBlogPost } from './generator/blogGenerator.js';
import { testWordPressConnection, publishToWordPress } from './publisher/wordpressPublisher.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Multi-REIT Singapore historical snapshots
ensureMultiReitSnapshots();

// 1. API Endpoints
app.get('/api/malls', (req, res) => {
  const { reit } = req.query;
  let filtered = singaporeMalls;
  if (reit && reit !== 'all') {
    filtered = singaporeMalls.filter(m => m.reitCategory?.toLowerCase() === reit.toLowerCase());
  }
  const reitCategories = Array.from(new Set(singaporeMalls.map(m => m.reitCategory)));
  res.json({ totalMalls: filtered.length, reitCategories, malls: filtered });
});

app.get('/api/snapshots', (req, res) => {
  const months = getAvailableSnapshotMonths();
  res.json({ months });
});

app.get('/api/snapshots/:month', (req, res) => {
  try {
    const data = loadSnapshot(req.params.month);
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.get('/api/diff', (req, res) => {
  const { month1, month2, reit } = req.query;
  const available = getAvailableSnapshotMonths();
  const baseline = month1 || available[available.length - 2] || '2026-07';
  const current = month2 || available[available.length - 1] || '2026-08';
  const targetReit = reit || 'all';
  try {
    const result = compareSnapshots(baseline, current, targetReit);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/blog', (req, res) => {
  const { month1, month2, reit } = req.query;
  const available = getAvailableSnapshotMonths();
  const baseline = month1 || available[available.length - 2] || '2026-07';
  const current = month2 || available[available.length - 1] || '2026-08';
  const targetReit = reit || 'all';
  try {
    const diffResult = compareSnapshots(baseline, current, targetReit);
    const blogPost = generateSgtuffBlogPost(diffResult);
    res.json(blogPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/wordpress/test', async (req, res) => {
  const { siteUrl, username, applicationPassword } = req.body;
  if (!username || !applicationPassword) {
    return res.status(400).json({ error: 'Username and Application Password are required.' });
  }
  const result = await testWordPressConnection({
    siteUrl: siteUrl || 'https://sgtuff.org.sg',
    username,
    applicationPassword
  });
  res.json(result);
});

app.post('/api/wordpress/publish', async (req, res) => {
  const { siteUrl, username, applicationPassword, title, content, status } = req.body;
  if (!username || !applicationPassword) {
    return res.status(400).json({ error: 'Username and Application Password are required.' });
  }
  const result = await publishToWordPress({
    siteUrl: siteUrl || 'https://sgtuff.org.sg',
    username,
    applicationPassword,
    title: title || 'SGTUFF Retail Movement Post',
    content: content || '<p>Retail Movement Report</p>',
    status: status || 'draft'
  });
  res.json(result);
});

// 2. Serve Production Static Dist Folder (Vite Build Output)
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[SGTUFF Subdomain Server] Listening on http://0.0.0.0:${PORT} for mall-tenant-tracker.sgtuff.org.sg`);
});
