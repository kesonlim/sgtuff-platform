import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateBaseStoreListForMall as generateCapitaLandStores } from './capitalandScraper.js';
import { generateFrasersBaseStoreList } from './frasersScraper.js';
import { generateVivoCityBaseStoreList } from './mapletreeScraper.js';
import { generateLendleaseBaseStoreList } from './lendleaseScraper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SNAPSHOTS_DIR = path.join(__dirname, '../data/snapshots');
if (!fs.existsSync(SNAPSHOTS_DIR)) {
  fs.mkdirSync(SNAPSHOTS_DIR, { recursive: true });
}

// Load all Singapore Malls metadata
const MALLS_FILE = path.join(__dirname, '../data/singaporeMalls.json');
export const singaporeMalls = JSON.parse(fs.readFileSync(MALLS_FILE, 'utf8'));

/**
 * Gets base store list for any Singapore mall based on its REIT operator
 */
export function getBaseStoresForSingaporeMall(mall) {
  const reitCat = mall.reitCategory || 'CapitaLand';

  if (reitCat === 'CapitaLand') {
    return generateCapitaLandStores(mall.id);
  } else if (reitCat === 'Frasers Property') {
    return generateFrasersBaseStoreList(mall.id);
  } else if (reitCat === 'Mapletree') {
    return generateVivoCityBaseStoreList();
  } else if (reitCat === 'Lendlease') {
    return generateLendleaseBaseStoreList(mall.id);
  }

  // Suntec / CDL / Independent Malls Default
  return [
    { name: "FairPrice Finest", unit: "#B1-01", category: "Supermarket" },
    { name: "Don Don Donki", unit: "#B1-15 to 20", category: "Japanese Groceries & F&B" },
    { name: "Uniqlo", unit: "#01-10 to 14", category: "Fashion" },
    { name: "Din Tai Fung", unit: "#02-18", category: "F&B" },
    { name: "海底捞 Haidilao", unit: "#03-01", category: "F&B Hotpot" },
    { name: "Challenger", unit: "#03-15", category: "Tech & Gaming" },
    { name: "Pop Mart Flagship", unit: "#01-25", category: "Pop Culture & Collectibles" },
    { name: "Sephora", unit: "#01-08", category: "Beauty & Cosmetics" },
    { name: "Matchaya Matcha Sweets", unit: "#01-K2", category: "F&B Desserts" },
    { name: "Subway", unit: "#B1-K05", category: "F&B Fast Food" }
  ];
}

/**
 * Generates historical multi-REIT snapshots across Singapore (2026-06, 2026-07, 2026-08)
 */
export function ensureMultiReitSnapshots() {
  const months = ['2026-06', '2026-07', '2026-08'];

  // Dynamic brand entries & exits across REITs
  const dynamicChanges = {
    '2026-07': {
      exits: [
        { mallId: 'plaza-singapura', storeName: 'Cotton On' },
        { mallId: 'raffles-city', storeName: 'Creation' },
        { mallId: 'northpoint-city', storeName: 'Subway' },
        { mallId: 'vivocity', storeName: 'Bath & Body Works' },
        { mallId: '313-somerset', storeName: 'Forever 21 / Cotton On Flagship' }
      ],
      additions: [
        { mallId: 'plaza-singapura', store: { name: 'Pop Mart Flagship', unit: '#01-35', category: 'Toys & Collectibles' } },
        { mallId: 'raffles-city', store: { name: 'Le Labo Fragrances', unit: '#01-28', category: 'Beauty & Luxury' } },
        { mallId: 'northpoint-city', store: { name: 'Jollibee', unit: '#B2-12', category: 'F&B Fast Food' } },
        { mallId: 'vivocity', store: { name: 'Maison Margiela Fragrance', unit: '#01-10', category: 'Luxury Beauty' } },
        { mallId: '313-somerset', store: { name: 'Stylenanda 3CE', unit: '#01-01', category: 'Beauty & Fashion' } }
      ]
    },
    '2026-08': {
      exits: [
        { mallId: 'plaza-singapura', storeName: 'Typo' },
        { mallId: 'bugis-junction', storeName: 'Desigual' },
        { mallId: 'causeway-point', storeName: 'Morganfield\'s' },
        { mallId: 'jem', storeName: 'Cathay Cineplexes JEM' },
        { mallId: 'suntec-city', storeName: 'Subway' }
      ],
      additions: [
        { mallId: 'plaza-singapura', store: { name: 'Gentle Monster', unit: '#01-38', category: 'Eyewear & Fashion' } },
        { mallId: 'bugis-junction', store: { name: 'Kpop Merch Hub', unit: '#01-25', category: 'Pop Culture & Gifts' } },
        { mallId: 'causeway-point', store: { name: 'Nasty Cookie', unit: '#01-16', category: 'F&B Bakery' } },
        { mallId: 'jem', store: { name: 'Golden Village JEM', unit: '#05-01', category: 'Cinema & Entertainment' } },
        { mallId: 'suntec-city', store: { name: 'Anker Innovation Store', unit: '#B1-K05', category: 'Tech Accessories' } }
      ]
    }
  };

  months.forEach(month => {
    const filePath = path.join(SNAPSHOTS_DIR, `singapore-${month}.json`);
    if (!fs.existsSync(filePath)) {
      console.log(`[Snapshot Engine] Creating Multi-REIT Singapore snapshot for ${month}...`);

      const snapshotData = {
        month,
        region: 'Singapore Portfolio',
        createdAt: new Date().toISOString(),
        malls: {}
      };

      singaporeMalls.forEach(m => {
        let baseStores = JSON.parse(JSON.stringify(getBaseStoresForSingaporeMall(m)));

        // Apply 2026-07 changes
        if (month === '2026-07' || month === '2026-08') {
          const c7 = dynamicChanges['2026-07'];
          c7.exits.forEach(e => {
            if (e.mallId === m.id) baseStores = baseStores.filter(s => s.name !== e.storeName);
          });
          c7.additions.forEach(a => {
            if (a.mallId === m.id && !baseStores.some(s => s.name === a.store.name)) {
              baseStores.push(a.store);
            }
          });
        }

        // Apply 2026-08 changes
        if (month === '2026-08') {
          const c8 = dynamicChanges['2026-08'];
          c8.exits.forEach(e => {
            if (e.mallId === m.id) baseStores = baseStores.filter(s => s.name !== e.storeName);
          });
          c8.additions.forEach(a => {
            if (a.mallId === m.id && !baseStores.some(s => s.name === a.store.name)) {
              baseStores.push(a.store);
            }
          });
        }

        snapshotData.malls[m.id] = {
          mallId: m.id,
          mallName: m.name,
          region: m.region,
          reitCategory: m.reitCategory,
          reit: m.reit,
          storeCount: baseStores.length,
          stores: baseStores
        };
      });

      fs.writeFileSync(filePath, JSON.stringify(snapshotData, null, 2));
    }
  });
}
