import React from 'react';

export default function AboutUsPage() {
  return (
    <div className="page-container">
      <div className="section-header">
        <h1 className="section-title">About SGTUFF Co-Operative Ltd</h1>
        <p className="section-subtitle">
          Singapore Tenants United For Fairness | Registered Co-Operative Society (Reg: CS000438)
        </p>
      </div>

      <div className="grid-2">
        <div className="content-card">
          <h3>Our Mission & Purpose</h3>
          <p>
            SGTUFF was established during the COVID-19 commercial retail crisis to unify small and medium-sized enterprise (SME) retail, F&B, and service tenants across Singapore.
          </p>
          <p>
            We advocate for equitable commercial tenancy legislation, transparent lease agreements, standardized service charge disclosures, and constructive landlord-tenant collaboration.
          </p>
        </div>

        <div className="content-card">
          <h3>Co-Operative Governance</h3>
          <p>
            SGTUFF is registered as a formal Co-Operative Society under the Singapore Registry of Co-operative Societies (Ministry of Culture, Community and Youth).
          </p>
          <p>
            Governed by an elected Executive Committee of active retail business owners, SGTUFF operates democratically to support Singapore's retail ecosystem.
          </p>
        </div>
      </div>

      <div className="content-card" style={{ marginBottom: '40px' }}>
        <h3>Key Organizational Objectives</h3>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '2' }}>
          <li>Advocate for full adherence to the statutory Code of Conduct for Leasing of Retail Premises in Singapore.</li>
          <li>Publish empirical market data, retail movement indices, and commercial occupancy trends.</li>
          <li>Provide dispute resolution guidance, lease negotiation benchmarks, and joint purchasing programs for SME tenants.</li>
          <li>Represent retail tenant interests in government agency dialogues and industry consultations.</li>
        </ul>
      </div>
    </div>
  );
}
