import singaporeMallsData from '../data/singaporeMalls.json';

// Pre-seeded multi-month historical snapshots for 22 Singapore Malls
const snapshots = {
  '2026-07': generateJulySnapshot(),
  '2026-08': generateAugustSnapshot()
};

function generateJulySnapshot() {
  const storeMap = {};
  singaporeMallsData.forEach(mall => {
    storeMap[mall.id] = (mall.sampleStoresJuly || []).map((s, idx) => ({
      id: `${mall.id}-jul-${idx}`,
      name: s.name,
      category: s.category || 'Retail & Lifestyle',
      unit: s.unit || '#01-10',
      mallId: mall.id,
      mallName: mall.name,
      reitCategory: mall.reitCategory
    }));
  });
  return storeMap;
}

function generateAugustSnapshot() {
  const storeMap = {};
  singaporeMallsData.forEach(mall => {
    const julyStores = (mall.sampleStoresJuly || []).map((s, idx) => ({
      id: `${mall.id}-jul-${idx}`,
      name: s.name,
      category: s.category || 'Retail & Lifestyle',
      unit: s.unit || '#01-10',
      mallId: mall.id,
      mallName: mall.name,
      reitCategory: mall.reitCategory
    }));

    // Apply August changes (exits and additions)
    let augStores = julyStores.filter(s => !(mall.sampleExitedAugust || []).includes(s.name));

    (mall.sampleJoinedAugust || []).forEach((j, idx) => {
      augStores.push({
        id: `${mall.id}-aug-${idx}`,
        name: j.name,
        category: j.category || 'Retail & Lifestyle',
        unit: j.unit || '#02-05',
        mallId: mall.id,
        mallName: mall.name,
        reitCategory: mall.reitCategory
      });
    });

    storeMap[mall.id] = augStores;
  });
  return storeMap;
}

export function getAvailableSnapshotMonthsClient() {
  return Object.keys(snapshots).sort();
}

export function compareSnapshotsClient(month1 = '2026-07', month2 = '2026-08', targetReit = 'all') {
  const snap1 = snapshots[month1] || {};
  const snap2 = snapshots[month2] || {};

  let targetMalls = singaporeMallsData;
  if (targetReit && targetReit !== 'all') {
    targetMalls = singaporeMallsData.filter(m => m.reitCategory?.toLowerCase() === targetReit.toLowerCase());
  }

  const mallDiffs = {};
  let totalStoresMonth1 = 0;
  let totalStoresMonth2 = 0;
  let totalJoined = 0;
  let totalExited = 0;

  targetMalls.forEach(mall => {
    const m1Stores = snap1[mall.id] || [];
    const m2Stores = snap2[mall.id] || [];

    totalStoresMonth1 += m1Stores.length;
    totalStoresMonth2 += m2Stores.length;

    const m1Names = new Set(m1Stores.map(s => s.name));
    const m2Names = new Set(m2Stores.map(s => s.name));

    const joined = m2Stores.filter(s => !m1Names.has(s.name));
    const exited = m1Stores.filter(s => !m2Names.has(s.name));
    const retained = m2Stores.filter(s => m1Names.has(s.name));

    totalJoined += joined.length;
    totalExited += exited.length;

    mallDiffs[mall.id] = {
      mallId: mall.id,
      mallName: mall.name,
      reitCategory: mall.reitCategory,
      month1Count: m1Stores.length,
      month2Count: m2Stores.length,
      joined,
      exited,
      retainedCount: retained.length,
      netChange: joined.length - exited.length
    };
  });

  const netPortfolioChange = totalJoined - totalExited;
  const portfolioTurnoverRate = (totalStoresMonth1 > 0)
    ? (((totalJoined + totalExited) / totalStoresMonth1) * 100).toFixed(1)
    : 0;

  // REIT Breakdown
  const reitCategories = Array.from(new Set(singaporeMallsData.map(m => m.reitCategory)));
  const reitBreakdown = reitCategories.map(cat => {
    let joined = 0;
    let exited = 0;
    Object.values(mallDiffs).forEach(m => {
      if (m.reitCategory === cat) {
        joined += m.joined.length;
        exited += m.exited.length;
      }
    });
    return {
      reitCategory: cat,
      joined,
      exited,
      net: joined - exited
    };
  });

  return {
    period: { baselineMonth: month1, currentMonth: month2 },
    selectedReit: targetReit,
    summary: {
      totalMallsTracked: targetMalls.length,
      totalStoresMonth1,
      totalStoresMonth2,
      totalJoined,
      totalExited,
      netPortfolioChange,
      portfolioTurnoverRate
    },
    mallDiffs,
    reitBreakdown
  };
}
