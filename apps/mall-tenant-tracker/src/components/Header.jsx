import React from 'react';
import { LayoutDashboard, ArrowLeftRight, Terminal, BookOpen, Globe, ShieldCheck } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, currentPeriod }) {
  return (
    <header className="header">
      {/* SGTUFF Top Co-operative Bar */}
      <div className="top-subbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={14} style={{ color: '#fbbf24' }} />
          <span>SGTUFF Co-Operative Ltd &bull; Singapore Tenants United For Fairness</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="motto">"Unity Is Strength"</span>
          <a href="https://sgtuff.org.sg" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'underline', opacity: 0.9 }}>
            sgtuff.org.sg &rarr;
          </a>
        </div>
      </div>

      <div className="header-inner">
        <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}>
          {/* Official SGTUFF Logo Image */}
          <img 
            src="/sgtuff-logo.jpg" 
            alt="SGTUFF Official Logo" 
            className="official-logo-img" 
          />
          <div className="brand-title">
            <div className="brand-name">Retail <span>Tracker</span></div>
            <div className="brand-sub">Singapore Shopping Malls Retail Movement Index</div>
          </div>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <nav className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>

            <button
              className={`nav-tab ${activeTab === 'diffs' ? 'active' : ''}`}
              onClick={() => setActiveTab('diffs')}
            >
              <ArrowLeftRight size={18} />
              <span>Mall Movement</span>
            </button>

            <button
              className={`nav-tab ${activeTab === 'scraper' ? 'active' : ''}`}
              onClick={() => setActiveTab('scraper')}
            >
              <Terminal size={18} />
              <span>Scraper Console</span>
            </button>

            <button
              className={`nav-tab ${activeTab === 'blog' ? 'active' : ''}`}
              onClick={() => setActiveTab('blog')}
            >
              <BookOpen size={18} />
              <span>SGTUFF Blog Hub</span>
            </button>
          </nav>

          <div className="badge badge-red" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Globe size={14} />
            <span>Singapore Nationwide (22 Malls)</span>
          </div>
        </div>
      </div>
    </header>
  );
}
