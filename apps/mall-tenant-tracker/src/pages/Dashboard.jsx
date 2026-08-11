import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Store, UserPlus, UserMinus, TrendingUp, ArrowRight, Building, Layers, ShieldCheck } from 'lucide-react';

export default function Dashboard({ diffData, setActiveTab, selectedReit, setSelectedReit }) {
  if (!diffData || !diffData.summary) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p className="text-secondary">Loading Singapore Retail Movement Index...</p>
      </div>
    );
  }

  const { summary, period, mallDiffs, categorySummary, reitBreakdown } = diffData;

  const reitsList = [
    { id: 'all', label: 'All Singapore REITs' },
    { id: 'CapitaLand', label: 'CapitaLand (CICT)' },
    { id: 'Frasers Property', label: 'Frasers Property (FCT)' },
    { id: 'Mapletree', label: 'Mapletree (VivoCity)' },
    { id: 'Lendlease', label: 'Lendlease (313, JEM, PLQ)' },
    { id: 'Suntec REIT', label: 'Suntec REIT' },
    { id: 'CDL & Others', label: 'CDL & Others' }
  ];

  const chartMallData = Object.values(mallDiffs).map(m => ({
    name: m.mallName.replace(' Singapore', '').replace(' Outlet Mall', '').replace(' Shopping Mall', ''),
    Joined: m.joined.length,
    Exited: m.exited.length,
    Net: m.netChange
  }));

  const reitChartData = (reitBreakdown || []).map(r => ({
    name: r.reitCategory,
    Joined: r.joined,
    Exited: r.exited,
    Net: r.net
  }));

  const allJoined = [];
  const allExited = [];
  Object.values(mallDiffs).forEach(m => {
    m.joined.forEach(j => allJoined.push({ ...j, mallName: m.mallName, reitCategory: m.reitCategory }));
    m.exited.forEach(e => allExited.push({ ...e, mallName: m.mallName, reitCategory: m.reitCategory }));
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* SGTUFF Executive Banner Callout Box */}
      <div className="sgtuff-callout" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-red"><ShieldCheck size={12} /> SGTUFF Co-Operative Official Index</span>
            <span className="text-secondary" style={{ fontSize: '0.85rem' }}>Comparing {period.baselineMonth} vs {period.currentMonth}</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--sgtuff-navy)' }}>
            Singapore Commercial Retail Movement Index
          </h2>
          <p className="text-secondary" style={{ maxWidth: '780px', fontSize: '0.95rem' }}>
            Providing transparent insights on tenant arrivals, brand departures, and commercial lease turnover across <strong>{summary.totalMallsTracked} Major Malls</strong> in Singapore.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setActiveTab('blog')}
          style={{ whiteSpace: 'nowrap' }}
        >
          <span>Generate SGTUFF Blog Post</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* REIT Filter Pills Bar */}
      <div className="card" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Layers size={16} className="text-amber" /> Filter REIT / Developer:
        </span>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {reitsList.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedReit(r.id)}
              className={`btn ${selectedReit === r.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem', borderRadius: '20px' }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid-4">
        <div className="card metric-card">
          <div className="metric-header">
            <span>Total Tracked Outlets</span>
            <Store size={18} className="text-blue" />
          </div>
          <div className="metric-value">{summary.totalStoresMonth2}</div>
          <div className="metric-sub">Across {summary.totalMallsTracked} Malls</div>
        </div>

        <div className="card metric-card">
          <div className="metric-header">
            <span>New Brand Entrants</span>
            <UserPlus size={18} className="text-green" />
          </div>
          <div className="metric-value text-green">+{summary.totalJoined}</div>
          <div className="metric-sub">Joined in {period.currentMonth}</div>
        </div>

        <div className="card metric-card">
          <div className="metric-header">
            <span>Exited / Closed Brands</span>
            <UserMinus size={18} className="text-red" />
          </div>
          <div className="metric-value text-red">-{summary.totalExited}</div>
          <div className="metric-sub">Departed in {period.currentMonth}</div>
        </div>

        <div className="card metric-card">
          <div className="metric-header">
            <span>Net Portfolio Shift</span>
            <TrendingUp size={18} className={summary.netPortfolioChange >= 0 ? "text-green" : "text-red"} />
          </div>
          <div className={`metric-value ${summary.netPortfolioChange >= 0 ? "text-green" : "text-red"}`}>
            {summary.netPortfolioChange >= 0 ? `+${summary.netPortfolioChange}` : summary.netPortfolioChange}
          </div>
          <div className="metric-sub">Portfolio turnover rate: {summary.portfolioTurnoverRate}%</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid-2">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Store Additions & Exits by Mall</h3>
              <p className="text-secondary" style={{ fontSize: '0.82rem' }}>Comparison of joined vs departed brands</p>
            </div>
            <Building size={20} className="text-secondary" />
          </div>

          <div style={{ height: '320px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartMallData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#475569" fontSize={11} angle={-35} textAnchor="end" />
                <YAxis stroke="#475569" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', color: '#0f172a', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="Joined" fill="#059669" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Exited" fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Movement Shift by REIT Operator</h3>
              <p className="text-secondary" style={{ fontSize: '0.82rem' }}>CapitaLand vs Frasers vs VivoCity vs Lendlease vs Suntec</p>
            </div>
            <Layers size={20} className="text-secondary" />
          </div>

          <div style={{ height: '320px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reitChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#475569" fontSize={11} />
                <YAxis stroke="#475569" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', color: '#0f172a', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend />
                <Bar dataKey="Joined" name="Joined Stores" fill="#059669" />
                <Bar dataKey="Exited" name="Exited Stores" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Brand Highlights Tables */}
      <div className="grid-2">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-green">🟢</span> Recent Brand Arrivals ({allJoined.length})
            </h3>
            <span className="badge badge-green">New Entrants</span>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Brand Name</th>
                  <th>Mall</th>
                  <th>Operator</th>
                  <th>Unit #</th>
                </tr>
              </thead>
              <tbody>
                {allJoined.slice(0, 8).map((b, idx) => (
                  <tr key={idx}>
                    <td><strong>{b.name}</strong></td>
                    <td>{b.mallName}</td>
                    <td><span className="badge badge-blue">{b.reitCategory}</span></td>
                    <td><code>{b.unit}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-red">🔴</span> Recent Brand Exits ({allExited.length})
            </h3>
            <span className="badge badge-red">Closed / Moved</span>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Exited Brand</th>
                  <th>Mall</th>
                  <th>Operator</th>
                  <th>Former Unit</th>
                </tr>
              </thead>
              <tbody>
                {allExited.slice(0, 8).map((b, idx) => (
                  <tr key={idx}>
                    <td><strong>{b.name}</strong></td>
                    <td>{b.mallName}</td>
                    <td><span className="badge badge-red">{b.reitCategory}</span></td>
                    <td><code>{b.unit}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
