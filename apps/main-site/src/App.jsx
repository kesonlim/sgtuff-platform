import React from 'react';

export default function App() {
  return (
    <div>
      {/* Top Banner */}
      <div className="top-bar">
        <span>🇸🇬 SGTUFF Co-Operative Ltd (Reg: CS000438)</span>
        <span className="motto">"Promoting Fair Tenancy & Transparent Commercial Leasing"</span>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <a href="#" className="logo">
            SGTUFF<span>.ORG.SG</span>
          </a>
          <nav className="nav">
            <a href="#about">About SGTUFF</a>
            <a href="#fair-tenancy">Fair Tenancy Code</a>
            <a href="https://sgtuff-mall-tracker.pages.dev" target="_blank" rel="noreferrer" className="btn-cta">
              🛍️ Retail Tenant Tracker
            </a>
            <a href="/admin" style={{ fontSize: '0.85rem', color: '#64748b' }}>
              ⚙️ Decap CMS Login
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner">
          <h1>Empowering Singapore Retail Tenants & <span>Commercial Success</span></h1>
          <p>
            Singapore Tenants United For Fairness (SGTUFF) is a registered co-operative advocacy body representing retail, F&B, and lifestyle tenants across CapitaLand, Frasers, Mapletree, Lendlease, and Suntec shopping malls.
          </p>
          <div className="hero-btns">
            <a href="https://sgtuff-mall-tracker.pages.dev" target="_blank" rel="noreferrer" className="btn btn-primary">
              Launch Retail Movement Index ↗
            </a>
            <a href="#fair-tenancy" className="btn btn-outline">
              Read Code of Conduct
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Pillars */}
      <section className="section">
        <div className="section-title">
          <h2>SGTUFF Core Advocacy Pillars</h2>
        </div>

        <div className="grid-3">
          <div className="card">
            <h3>📜 Fair Tenancy Code of Conduct</h3>
            <p>Advocating for standardized commercial lease agreements, transparent service charges, and fair landlord-tenant arbitration frameworks in Singapore.</p>
          </div>

          <div className="card">
            <h3>🛍️ Retail Tenant Tracker</h3>
            <p>Monthly automated intelligence tracking retail store movements, occupancy turnover, and tenant departures across 22 major Singapore shopping malls.</p>
          </div>

          <div className="card">
            <h3>🤝 Tenant Support & Co-Op</h3>
            <p>Providing legal guidance, lease negotiation benchmarks, and collaborative purchasing power for Singapore SME retail operators.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} SGTUFF Co-Operative Ltd. All rights reserved. | Hosted on Cloudflare Pages Global Edge Network.</p>
      </footer>
    </div>
  );
}
