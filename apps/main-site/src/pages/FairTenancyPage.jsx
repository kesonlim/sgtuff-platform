import React from 'react';

export default function FairTenancyPage() {
  return (
    <div className="page-container">
      <div className="section-header">
        <h1 className="section-title">Fair Tenancy Code of Conduct</h1>
        <p className="section-subtitle">
          Statutory Framework & Leasing Principles for Commercial Retail Premises in Singapore
        </p>
      </div>

      <div className="grid-2">
        <div className="content-card">
          <h3>The Code of Conduct Overview</h3>
          <p>
            Enacted to establish fair and balanced lease negotiations between retail landlords and tenants, the Code of Conduct sets mandatory leasing principles across 12 key operational areas.
          </p>
          <p>
            SGTUFF played an active role in pushing for the formalization of the Code of Conduct for Leasing of Retail Premises, ensuring small retailers have statutory protections against unfair lease covenants.
          </p>
        </div>

        <div className="content-card">
          <h3>WSQ Fair Tenancy Training Course</h3>
          <p>
            SGTUFF conducts regular WSQ-accredited training courses titled: <strong>Contract Development for Fair Tenancy Course</strong>.
          </p>
          <p>
            Taught by experienced commercial legal specialists, the course equips retail directors, lease negotiators, and business owners with practical skills to evaluate lease terms and avoid costly contractual traps.
          </p>
          <p style={{ fontSize: '13px', color: 'var(--sgtuff-red)', fontWeight: 700, marginTop: '10px' }}>
            Inquiries: Call/WhatsApp Jonathan at +65 9694 8505 | Email: jonathan@xprienz.com
          </p>
        </div>
      </div>

      <div className="content-card">
        <h3>12 Core Leasing Principles Covered by the Code</h3>
        <div className="grid-2" style={{ gap: '15px', marginTop: '15px', boxShadow: 'none', padding: 0, border: 'none' }}>
          <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '6px' }}>
            <strong>1. Base Rent Structure & GTO:</strong> Guidelines on Gross Turnover (GTO) rent formulas and exclusivity of pricing structures.
          </div>
          <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '6px' }}>
            <strong>2. Security Deposit Capping:</strong> Maximum limits on cash security deposits for retail leases.
          </div>
          <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '6px' }}>
            <strong>3. Exclusivity Clauses:</strong> Restrictions on non-compete radius restrictions imposed on tenants.
          </div>
          <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '6px' }}>
            <strong>4. Early Termination & Sales Performance:</strong> Landlord and tenant exit options tied to sales thresholds.
          </div>
        </div>
      </div>
    </div>
  );
}
