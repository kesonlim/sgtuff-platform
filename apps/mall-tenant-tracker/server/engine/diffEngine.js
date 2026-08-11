import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SNAPSHOTS_DIR = path.join(__dirname, '../data/snapshots');

/**
 * Loads snapshot file for a month (supports singapore-YYYY-MM.json or capitaland-YYYY-MM.json)
 */
export function loadSnapshot(month) {
  let filePath = path.join(SNAPSHOTS_DIR, `singapore-${month}.json`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(SNAPSHOTS_DIR, `capitaland-${month}.json`);
  }
  if (!fs.existsSync(filePath)) {
    throw new Error(`Snapshot for month ${month} does not exist.`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

/**
 * Lists available snapshot months
 */
export function getAvailableSnapshotMonths() {
  if (!fs.existsSync(SNAPSHOTS_DIR)) return [];
  const files = fs.readdirSync(SNAPSHOTS_DIR);
  const months = new Set();

  files.forEach(f => {
    if (f.endsWith('.json')) {
      const monthMatch = f.match(/\d{4}-\d{2}/);
      if (monthMatch) months.add(monthMatch[0]);
    }
  });

  return Array.from(months).sort();
}

/**
 * Compares two snapshots with optional REIT filtering
 */
export function compareSnapshots(month1, month2, targetReit = 'all') {
  const snap1 = loadSnapshot(month1);
  const snap2 = loadSnapshot(month2);

  const mallDiffs = {};
  let totalJoined = 0;
  let totalExited = 0;
  let totalStoresMonth1 = 0;
  let totalStoresMonth2 = 0;

  const categoryDiffs = {};
  const reitBreakdown = {};

  Object.keys(snap2.malls).forEach(mallId => {
    const mall1 = snap1.malls[mallId] || { stores: [] };
    const mall2 = snap2.malls[mallId] || { stores: [] };
    const reitCat = mall2.reitCategory || mall1.reitCategory || 'CapitaLand';

    // REIT Filter Check
    if (targetReit !== 'all' && targetReit.toLowerCase() !== reitCat.toLowerCase()) {
      return;
    }

    const stores1Map = new Map(mall1.stores.map(s => [s.name.toLowerCase(), s]));
    const stores2Map = new Map(mall2.stores.map(s => [s.name.toLowerCase(), s]));

    const joined = [];
    const exited = [];
    const retained = [];

    // Find Joined stores
    mall2.stores.forEach(s2 => {
      if (!stores1Map.has(s2.name.toLowerCase())) {
        joined.push(s2);
        const cat = s2.category || 'General';
        if (!categoryDiffs[cat]) categoryDiffs[cat] = { joined: 0, exited: 0 };
        categoryDiffs[cat].joined++;
      } else {
        retained.push(s2);
      }
    });

    // Find Exited stores
    mall1.stores.forEach(s1 => {
      if (!stores2Map.has(s1.name.toLowerCase())) {
        exited.push(s1);
        const cat = s1.category || 'General';
        if (!categoryDiffs[cat]) categoryDiffs[cat] = { joined: 0, exited: 0 };
        categoryDiffs[cat].exited++;
      }
    });

    totalJoined += joined.length;
    totalExited += exited.length;
    totalStoresMonth1 += mall1.stores.length;
    totalStoresMonth2 += mall2.stores.length;

    // Track REIT level stats
    if (!reitBreakdown[reitCat]) {
      reitBreakdown[reitCat] = { reitCategory: reitCat, mallsCount: 0, joined: 0, exited: 0, net: 0 };
    }
    reitBreakdown[reitCat].mallsCount++;
    reitBreakdown[reitCat].joined += joined.length;
    reitBreakdown[reitCat].exited += exited.length;
    reitBreakdown[reitCat].net += (joined.length - exited.length);

    mallDiffs[mallId] = {
      mallId,
      mallName: mall2.mallName || mall1.mallName,
      region: mall2.region || mall1.region,
      reitCategory: reitCat,
      reit: mall2.reit || mall1.reit,
      storeCountBefore: mall1.stores.length,
      storeCountAfter: mall2.stores.length,
      joined,
      exited,
      retainedCount: retained.length,
      netChange: joined.length - exited.length,
      turnoverRate: ((joined.length + exited.length) / Math.max(1, mall1.stores.length) * 100).toFixed(1)
    };
  });

  const categorySummary = Object.keys(categoryDiffs).map(cat => ({
    category: cat,
    joined: categoryDiffs[cat].joined,
    exited: categoryDiffs[cat].exited,
    net: categoryDiffs[cat].joined - categoryDiffs[cat].exited
  })).sort((a, b) => (b.joined + b.exited) - (a.joined + a.exited));

  return {
    period: {
      baselineMonth: month1,
      currentMonth: month2
    },
    targetReit,
    summary: {
      totalMallsTracked: Object.keys(mallDiffs).length,
      totalStoresMonth1,
      totalStoresMonth2,
      totalJoined,
      totalExited,
      netPortfolioChange: totalJoined - totalExited,
      portfolioTurnoverRate: ((totalJoined + totalExited) / Math.max(1, totalStoresMonth1) * 100).toFixed(1)
    },
    reitBreakdown: Object.values(reitBreakdown),
    categorySummary,
    mallDiffs
  };
}
