import React, { useState } from 'react';
import { Search, Filter, ArrowLeftRight, CheckCircle2, XCircle, Building2, Store } from 'lucide-react';

export default function DiffInspector({ diffData, availableMonths, selectedMonths, setSelectedMonths, selectedReit, setSelectedReit }) {
  const [selectedMall, setSelectedMall] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('diff'); // 'diff' or 'directory'

  if (!diffData || !diffData.mallDiffs) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p className="text-secondary">Loading store directory diff data...</p>
      </div>
    );
  }

  const { mallDiffs, period } = diffData;

  // Extract all categories
  const categories = new Set();
  Object.values(mallDiffs).forEach(m => {
    m.joined.forEach(s => categories.add(s.category));
    m.exited.forEach(s => categories.add(s.category));
  });

  // Filter logic
  const filteredMalls = Object.values(mallDiffs).filter(m => {
    if (selectedMall !== 'all' && m.mallId !== selectedMall) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Control Bar Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem' }}>CapitaLand Mall Movement Inspector</h2>
            <p className="text-secondary" style={{ fontSize: '0.88rem' }}>
              Inspect month-over-month store directory entries and exits across Singapore CapitaLand malls.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <button
              className={`btn ${viewMode === 'diff' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
              onClick={() => setViewMode('diff')}
            >
              Changes & Movement
            </button>
            <button
              className={`btn ${viewMode === 'directory' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
              onClick={() => setViewMode('directory')}
            >
              Full Directory Comparison
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
          
          {/* Baseline Month */}
          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Baseline Month (Before):
            </label>
            <select
              value={selectedMonths.month1}
              onChange={(e) => setSelectedMonths({ ...selectedMonths, month1: e.target.value })}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px'
              }}
            >
              {availableMonths.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Current Month */}
          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Target Month (After):
            </label>
            <select
              value={selectedMonths.month2}
              onChange={(e) => setSelectedMonths({ ...selectedMonths, month2: e.target.value })}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px'
              }}
            >
              {availableMonths.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Filter REIT */}
          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Filter Mall REIT / Operator:
            </label>
            <select
              value={selectedReit}
              onChange={(e) => setSelectedReit(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px'
              }}
            >
              <option value="all">All Singapore REITs</option>
              <option value="CapitaLand">CapitaLand (CICT)</option>
              <option value="Frasers Property">Frasers Property (FCT)</option>
              <option value="Mapletree">Mapletree (VivoCity)</option>
              <option value="Lendlease">Lendlease (313, JEM, PLQ)</option>
              <option value="Suntec REIT">Suntec REIT</option>
              <option value="CDL & Others">CDL & Others</option>
            </select>
          </div>

          {/* Select Mall */}
          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Filter CapitaLand Mall:
            </label>
            <select
              value={selectedMall}
              onChange={(e) => setSelectedMall(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px'
              }}
            >
              <option value="all">All Malls (14 CapitaLand Malls)</option>
              {Object.values(mallDiffs).map(m => (
                <option key={m.mallId} value={m.mallId}>{m.mallName}</option>
              ))}
            </select>
          </div>

          {/* Search Brand */}
          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Search Brand Name:
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="e.g. Uniqlo, Sephora, Pop Mart..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.85rem 0.6rem 2.2rem',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Main Diff Content List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filteredMalls.map(m => {
          // Filter stores by query
          const joinedStores = m.joined.filter(s => 
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            s.category.toLowerCase().includes(searchQuery.toLowerCase())
          );
          const exitedStores = m.exited.filter(s => 
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            s.category.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (searchQuery && joinedStores.length === 0 && exitedStores.length === 0) {
            return null; // hide mall card if query doesn't match
          }

          return (
            <div key={m.mallId} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Mall Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '0.5rem', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <Building2 size={20} className="text-blue" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem' }}>{m.mallName}</h3>
                    <span className="text-secondary" style={{ fontSize: '0.8rem' }}>{m.region} Region &bull; {m.storeCountAfter} Total Stores</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span className="badge badge-green">+{m.joined.length} Joined</span>
                  <span className="badge badge-red">-{m.exited.length} Exited</span>
                  <span className={`badge ${m.netChange >= 0 ? 'badge-green' : 'badge-red'}`}>
                    Net: {m.netChange >= 0 ? `+${m.netChange}` : m.netChange}
                  </span>
                </div>
              </div>

              {/* Diffs Grid */}
              {viewMode === 'diff' ? (
                <div className="grid-2">
                  
                  {/* Joined Section */}
                  <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <CheckCircle2 size={18} className="text-green" />
                      <h4 style={{ fontSize: '0.95rem', color: '#10b981' }}>New Brand Arrivals ({joinedStores.length})</h4>
                    </div>

                    {joinedStores.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {joinedStores.map((s, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                            <div>
                              <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{s.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.category}</div>
                            </div>
                            <code>{s.unit}</code>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-secondary" style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>No new brand arrivals detected for this period.</p>
                    )}
                  </div>

                  {/* Exited Section */}
                  <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '10px', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <XCircle size={18} className="text-red" />
                      <h4 style={{ fontSize: '0.95rem', color: '#ef4444' }}>Exited / Closed Brands ({exitedStores.length})</h4>
                    </div>

                    {exitedStores.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {exitedStores.map((s, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)', padding: '0.6rem 0.85rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                            <div>
                              <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{s.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.category}</div>
                            </div>
                            <code>{s.unit}</code>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-secondary" style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>No brand exits detected for this period.</p>
                    )}
                  </div>

                </div>
              ) : (
                /* Directory Overview Mode */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Status</th>
                          <th>Brand Name</th>
                          <th>Category</th>
                          <th>Unit / Floor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {joinedStores.map((s, idx) => (
                          <tr key={`j-${idx}`} style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)' }}>
                            <td><span className="badge badge-green">JOINED</span></td>
                            <td><strong style={{ color: '#fff' }}>{s.name}</strong></td>
                            <td>{s.category}</td>
                            <td><code>{s.unit}</code></td>
                          </tr>
                        ))}
                        {exitedStores.map((s, idx) => (
                          <tr key={`e-${idx}`} style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)' }}>
                            <td><span className="badge badge-red">EXITED</span></td>
                            <td><span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>{s.name}</span></td>
                            <td>{s.category}</td>
                            <td><code>{s.unit}</code></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
