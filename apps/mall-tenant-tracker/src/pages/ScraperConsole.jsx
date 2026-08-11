import React, { useState } from 'react';
import { Terminal, Play, PlusCircle, RefreshCw, CheckCircle, AlertCircle, Link, Globe, Layers } from 'lucide-react';

export default function ScraperConsole({ malls, onRefreshSnapshots }) {
  const [selectedMallId, setSelectedMallId] = useState(malls[0]?.id || 'plaza-singapura');
  const [customUrl, setCustomUrl] = useState('https://www.capitaland.com/en/malls/plazasingapura/en/stores.html');
  const [isScraping, setIsScraping] = useState(false);
  const [logs, setLogs] = useState([
    `[${new Date().toLocaleTimeString()}] SGTUFF CapitaLand Scraper Engine v1.0 Ready.`,
    `[${new Date().toLocaleTimeString()}] Target REIT: CapitaLand Integrated Commercial Trust (CICT).`,
    `[${new Date().toLocaleTimeString()}] Tracked Malls: 14 Singapore CapitaLand Properties.`
  ]);

  const addLog = (msg) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  const handleRunLiveScrape = async () => {
    setIsScraping(true);
    addLog(`Initiating live web scraper request for mall: ${selectedMallId}...`);

    try {
      const res = await fetch('/api/scrape-live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mallId: selectedMallId })
      });
      const data = await res.json();

      if (data.success) {
        addLog(`✅ Successfully scraped ${data.mallName}! Found ${data.count} active store listings.`);
      } else {
        addLog(`❌ Scraper warning: ${data.error}`);
      }
    } catch (err) {
      addLog(`❌ Connection error: ${err.message}`);
    } finally {
      setIsScraping(false);
    }
  };

  const handleSimulateNewMonth = async () => {
    setIsScraping(true);
    addLog(`Simulating next monthly store snapshot update (creating 2026-09)...`);

    try {
      const res = await fetch('/api/snapshots/trigger-shift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newMonth: '2026-09',
          additions: [
            { mallId: 'plaza-singapura', store: { name: 'Apple Store Flagship', unit: '#01-01', category: 'Tech & Electronics' } },
            { mallId: 'raffles-city', store: { name: 'Balenciaga', unit: '#01-15', category: 'Luxury Fashion' } },
            { mallId: 'imm', store: { name: 'Lululemon Outlet', unit: '#02-05', category: 'Outlet Activewear' } }
          ],
          exits: [
            { mallId: 'plaza-singapura', storeName: 'Suki-Ya' },
            { mallId: 'westgate', storeName: 'Subway' }
          ]
        })
      });

      const data = await res.json();
      if (data.success) {
        addLog(`🎉 New monthly snapshot created for ${data.month}! Added 3 new flagship entrants & 2 store exits.`);
        if (onRefreshSnapshots) onRefreshSnapshots();
      }
    } catch (err) {
      addLog(`❌ Failed to create snapshot: ${err.message}`);
    } finally {
      setIsScraping(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Banner */}
      <div className="card">
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={22} className="text-red" />
          CapitaLand Scraper & Snapshot Controls
        </h2>
        <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
          Trigger live web scraping jobs on CapitaLand Singapore store directories, test custom URLs, or generate simulated monthly store movement snapshots.
        </p>
      </div>

      <div className="grid-2">
        
        {/* Controls Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            Live Scraper Trigger
          </h3>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Select CapitaLand Mall to Scrape:
            </label>
            <select
              value={selectedMallId}
              onChange={(e) => setSelectedMallId(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px'
              }}
            >
              {malls.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.region})</option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleRunLiveScrape}
            disabled={isScraping}
          >
            {isScraping ? <RefreshCw size={16} className="spin" /> : <Play size={16} />}
            <span>Run Live CapitaLand Scraper</span>
          </button>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Monthly Snapshot Simulator</h3>
            <p className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
              Simulates a new monthly directory update (creates <code>2026-09</code>) to test month-over-month brand exit and entry detection.
            </p>
            <button
              className="btn btn-secondary"
              style={{ width: '100%', borderColor: 'var(--color-green)' }}
              onClick={handleSimulateNewMonth}
              disabled={isScraping}
            >
              <PlusCircle size={16} className="text-green" />
              <span>Simulate Next Month Shift (2026-09)</span>
            </button>
          </div>

          {/* Target REIT Expansion Note */}
          <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Layers size={16} className="text-blue" />
              <strong style={{ fontSize: '0.85rem' }}>Phase 2 REIT Expansion Ready</strong>
            </div>
            <p className="text-secondary" style={{ fontSize: '0.78rem' }}>
              Current engine is tuned for CapitaLand CICT. Next REIT adapters: Frasers Property, Mapletree/VivoCity, Suntec REIT, and Lendlease.
            </p>
          </div>
        </div>

        {/* Live Logs Console */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Terminal size={18} className="text-green" />
              Scraper Engine Console Output
            </h3>
            <span className="badge badge-green">LIVE TERMINAL</span>
          </div>

          <div style={{
            flex: 1,
            backgroundColor: '#070a12',
            border: '1px solid #1e293b',
            borderRadius: '8px',
            padding: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#38bdf8',
            maxHeight: '380px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem'
          }}>
            {logs.map((log, idx) => (
              <div key={idx} style={{ wordBreak: 'break-word' }}>
                {log}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
