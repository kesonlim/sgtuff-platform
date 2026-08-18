import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="page-container">
      {/* Featured Hero Banner */}
      <div className="hero-banner">
        <img src="/hero-banner.jpeg" alt="SGTUFF Singapore Tenants United For Fairness" />
      </div>

      {/* Intro & Purpose */}
      <div className="section-header">
        <h1 className="section-title">Promoting Fair Tenancy & Commercial Leasing Standards</h1>
        <p className="section-subtitle">
          Singapore Tenants United For Fairness (SGTUFF Co-Operative Ltd) represents retail, F&B, and lifestyle operators across major commercial REIT shopping malls.
        </p>
      </div>

      {/* Key Core Cards */}
      <div className="grid-3">
        <div className="content-card">
          <h3>📜 Fair Tenancy Code of Conduct</h3>
          <p>Advocating for standardized lease terms, transparent service charge auditing, and fair landlord-tenant arbitration in Singapore.</p>
          <Link to="/fair-tenancy" style={{ color: 'var(--sgtuff-red)', fontWeight: 700 }}>Read Code Guidelines →</Link>
        </div>

        <div className="content-card">
          <h3>🛍️ Retail Tenant Tracker</h3>
          <p>Real-time automated index monitoring store movements, occupancy shifts, and tenant turnover across 22 major Singapore shopping malls.</p>
          <a href="https://sgtuff-mall-tracker.pages.dev" target="_blank" rel="noreferrer" style={{ color: 'var(--sgtuff-red)', fontWeight: 700 }}>Launch Live Tracker ↗</a>
        </div>

        <div className="content-card">
          <h3>🤝 Co-Op Member Network</h3>
          <p>Providing collaborative buying power, legal support, and operational benchmarks for Singapore retail and service operators.</p>
          <Link to="/membership" style={{ color: 'var(--sgtuff-red)', fontWeight: 700 }}>Join SGTUFF Co-Op →</Link>
        </div>
      </div>

      {/* Voltaire Quote Banner */}
      <div className="quote-banner">
        <h2>“Every man is guilty of all the good he did not do”</h2>
        <h3>~ Voltaire</h3>
      </div>

      {/* Contact Section */}
      <div className="contact-grid">
        <div className="contact-info">
          <h3>CONTACT SGTUFF</h3>
          <p>Have questions regarding retail tenancy agreements, lease negotiation benchmarks, or co-op membership?</p>
          <p style={{ marginTop: '16px' }}>
            Email: <a href="mailto:info@sgtuff.org.sg">info@sgtuff.org.sg</a><br />
            Phone: <strong>+65 8845 6623</strong>
          </p>
        </div>

        <div className="contact-form">
          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Your message has been sent to SGTUFF.'); }}>
            <label>Name *</label>
            <input type="text" required placeholder="Your Full Name" />

            <label>E-Mail *</label>
            <input type="email" required placeholder="Your Email Address" />

            <label>Contact Number *</label>
            <input type="text" required placeholder="Phone Number" />

            <label>Subject *</label>
            <input type="text" required placeholder="Inquiry Subject" />

            <label>Message *</label>
            <textarea rows="4" required placeholder="How can SGTUFF support your retail business?"></textarea>

            <button type="submit" className="btn-submit">Submit Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
