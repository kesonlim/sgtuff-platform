import React from 'react';

export default function CollaboratePage() {
  return (
    <div className="page-container">
      <div className="section-header">
        <h1 className="section-title">Collaborate With Us</h1>
        <p className="section-subtitle">
          Partner with Singapore Tenants United For Fairness
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h3>Partnering with SGTUFF</h3>
          <p>
            We welcome collaboration with commercial landlords, government agencies (ESG, MCCY, MTI), retail trade associations, and technology providers.
          </p>
          <p style={{ marginTop: '16px' }}>
            Email: <a href="mailto:info@sgtuff.org.sg">info@sgtuff.org.sg</a><br />
            Phone: <strong>+65 8845 6623</strong>
          </p>
        </div>

        <div className="contact-form">
          <form onSubmit={(e) => { e.preventDefault(); alert('Collaboration inquiry submitted!'); }}>
            <label>Organization / Company Name *</label>
            <input type="text" required placeholder="Company Name" />

            <label>Contact Person *</label>
            <input type="text" required placeholder="Full Name" />

            <label>E-Mail Address *</label>
            <input type="email" required placeholder="Email Address" />

            <label>Collaboration Area *</label>
            <input type="text" required placeholder="e.g. Fair Tenancy, Retail Tech, Sponsorship" />

            <label>Proposal Details *</label>
            <textarea rows="4" required placeholder="Describe your collaboration proposal..."></textarea>

            <button type="submit" className="btn-submit">Submit Proposal</button>
          </form>
        </div>
      </div>
    </div>
  );
}
