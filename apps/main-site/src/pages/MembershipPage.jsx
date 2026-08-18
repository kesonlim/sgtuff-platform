import React from 'react';

export default function MembershipPage() {
  return (
    <div className="page-container">
      <div className="section-header">
        <h1 className="section-title">SGTUFF Co-Op Membership</h1>
        <p className="section-subtitle">
          Join Singapore's leading commercial retail tenant co-operative
        </p>
      </div>

      <div className="grid-3">
        <div className="content-card" style={{ borderTop: '4px solid var(--sgtuff-navy)' }}>
          <h3>Ordinary Membership</h3>
          <p>For registered Singapore SME retail, F&B, wellness, and service business owners.</p>
          <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '14px' }}>
            <li>Full voting rights at SGTUFF AGM.</li>
            <li>Access to lease benchmark data.</li>
            <li>Co-Op group purchasing benefits.</li>
          </ul>
          <a href="https://sgtuff.eber.co/sign-in" target="_blank" rel="noreferrer" className="btn-submit" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>
            Apply via Eber Portal ↗
          </a>
        </div>

        <div className="content-card" style={{ borderTop: '4px solid var(--sgtuff-red)' }}>
          <h3>Associate Membership</h3>
          <p>For aspiring entrepreneurs, retail managers, and industry professionals.</p>
          <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '14px' }}>
            <li>Access to WSQ Fair Tenancy workshops.</li>
            <li>Industry networking events.</li>
            <li>Monthly Retail Movement reports.</li>
          </ul>
          <a href="https://sgtuff.eber.co/sign-in" target="_blank" rel="noreferrer" className="btn-submit" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none', background: 'var(--sgtuff-navy)' }}>
            Register Online ↗
          </a>
        </div>

        <div className="content-card" style={{ borderTop: '4px solid var(--sgtuff-amber)' }}>
          <h3>Corporate Partner</h3>
          <p>For service providers, technology vendors, legal firms, and corporate sponsors.</p>
          <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '14px' }}>
            <li>Feature in SGTUFF Business Directory.</li>
            <li>Sponsorship opportunities.</li>
            <li>Direct outreach to 1,000+ retail brands.</li>
          </ul>
          <a href="mailto:info@sgtuff.org.sg" className="btn-submit" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none', background: 'var(--sgtuff-amber)' }}>
            Contact Partnerships ✉️
          </a>
        </div>
      </div>
    </div>
  );
}
