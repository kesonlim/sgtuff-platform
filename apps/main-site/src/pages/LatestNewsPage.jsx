import React from 'react';

export default function LatestNewsPage() {
  return (
    <div className="page-container">
      <div className="section-header">
        <h1 className="section-title">SGTUFF Latest News & Reports</h1>
        <p className="section-subtitle">
          Commercial retail industry updates, fair tenancy legal news, and monthly mall tenant movement index
        </p>
      </div>

      <div className="grid-2">
        <div className="content-card">
          <h3>Contract Development for Fair Tenancy Course (WSQ)</h3>
          <p style={{ fontSize: '13px', color: '#888' }}>April 2, 2024 / Fair Tenancy Training</p>
          <p>
            Secure your spot for our upcoming sessions! Dive into the new Code of Conduct for Retail Premises leasing, ensuring optimal financial outcomes. Taught by seasoned commercial lawyer Nan.
          </p>
          <p style={{ color: 'var(--sgtuff-red)', fontWeight: 700 }}>Inquiries: Call/WhatsApp Jonathan @ 9694 8505</p>
        </div>

        <div className="content-card">
          <h3>Home Safety & Eldercare Support – Free Benefits!</h3>
          <p style={{ fontSize: '13px', color: '#888' }}>February 23, 2026 / Member Wellness</p>
          <p>
            SGTUFF is offering Home Safety & Eldercare Support for eligible company staff in retail, F&B & service industries. Edge guards, non-slip pads, motion sensor lights, and caregiver assessments.
          </p>
        </div>
      </div>

      <div className="content-card" style={{ marginTop: '20px' }}>
        <h3>🛍️ Monthly Retail Tenant Movement Index</h3>
        <p>
          Access real-time store tracking, occupancy shifts, and new brand entries across 22 Singapore malls (CapitaLand, Frasers, Mapletree, Lendlease, Suntec).
        </p>
        <a href="https://sgtuff-mall-tracker.pages.dev" target="_blank" rel="noreferrer" className="btn-submit" style={{ display: 'inline-block', textDecoration: 'none', marginTop: '10px' }}>
          Launch Live Retail Tracker Index ↗
        </a>
      </div>
    </div>
  );
}
