/**
 * SGTUFF Blog Post Generator - Multi-REIT & Nationwide Coverage
 */
export function generateSgtuffBlogPost(diffResult) {
  const { period, summary, categorySummary, mallDiffs, targetReit, reitBreakdown } = diffResult;

  const baselineMonthFormatted = formatMonth(period.baselineMonth);
  const currentMonthFormatted = formatMonth(period.currentMonth);

  const isNationwide = !targetReit || targetReit === 'all';
  const reitTitle = isNationwide ? 'Singapore Commercial Shopping Malls' : `${targetReit} Malls`;

  // Collect brand joined & exited
  const allJoined = [];
  const allExited = [];

  Object.values(mallDiffs).forEach(mall => {
    mall.joined.forEach(j => allJoined.push({ ...j, mallName: mall.mallName, region: mall.region, reitCategory: mall.reitCategory }));
    mall.exited.forEach(e => allExited.push({ ...e, mallName: mall.mallName, region: mall.region, reitCategory: mall.reitCategory }));
  });

  const title = `SGTUFF Singapore Retail Movement Report (${currentMonthFormatted}): ${reitTitle} Monthly Index`;
  const slug = `singapore-retail-movement-${currentMonthFormatted.toLowerCase().replace(/\s+/g, '-')}`;
  const publishDate = new Date().toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' });

  // Build Markdown format
  const markdownContent = `
# ${title}

**Published by:** SGTUFF (Singapore Tenants United For Fairness)  
**Date:** ${publishDate}  
**Category:** Commercial Retail Reports | ${reitTitle} Directory Index  
**Scope:** ${summary.totalMallsTracked} Major Malls Across Singapore  

---

## 📌 Executive Summary

Monitoring shopping mall store directory changes provides critical transparency into tenant turnover, commercial occupancy health, and brand migration across Singapore.

In **${currentMonthFormatted}**, SGTUFF recorded **${summary.totalJoined} new brand entries** and **${summary.totalExited} brand exits** across ${reitTitle}.

- **Net Portfolio Store Shift:** ${summary.netPortfolioChange >= 0 ? `+${summary.netPortfolioChange}` : summary.netPortfolioChange} outlets
- **Total Tracked Retail Units:** ${summary.totalStoresMonth2} active tenant spaces
- **Portfolio Turnover Rate:** ${summary.portfolioTurnoverRate}%

---

${isNationwide ? `
## 🏢 Retail Movement Breakdown by REIT / Mall Operator

| Mall REIT / Operator | Malls Tracked | New Entrants | Brand Exits | Net Shift |
| :--- | :---: | :---: | :---: | :---: |
${reitBreakdown.map(r => `| **${r.reitCategory}** | ${r.mallsCount} | +${r.joined} | -${r.exited} | ${r.net >= 0 ? `+${r.net}` : r.net} |`).join('\n')}

---
` : ''}

## 🟢 New Brand Arrivals (${currentMonthFormatted})

| Brand Name | Category | Mall | REIT / Operator | Unit / Level |
| :--- | :--- | :--- | :--- | :--- |
${allJoined.length > 0 ? allJoined.map(b => `| **${b.name}** | ${b.category} | ${b.mallName} | ${b.reitCategory} | \`${b.unit}\` |`).join('\n') : '| *No new entries recorded* | - | - | - | - |'}

---

## 🔴 Departed & Exited Brands (${currentMonthFormatted})

| Exited Brand | Category | Mall | REIT / Operator | Former Unit |
| :--- | :--- | :--- | :--- | :--- |
${allExited.length > 0 ? allExited.map(b => `| **${b.name}** | ${b.category} | ${b.mallName} | ${b.reitCategory} | \`${b.unit}\` |`).join('\n') : '| *No brand exits recorded* | - | - | - | - |'}

---

## 📊 Mall-by-Mall Retail Shift Table

| Mall Name | Operator | Region | Baseline Stores (${period.baselineMonth}) | Current Stores (${period.currentMonth}) | Joined | Exited | Net Shift |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
${Object.values(mallDiffs).map(m => `| **${m.mallName}** | ${m.reitCategory} | ${m.region} | ${m.storeCountBefore} | ${m.storeCountAfter} | +${m.joined.length} | -${m.exited.length} | ${m.netChange >= 0 ? `+${m.netChange}` : m.netChange} |`).join('\n')}

---

## 💡 SGTUFF Tenant Impact & Market Insights

1. **Top Category Expansion:** The leading growth sector this month was **${categorySummary[0]?.category || 'F&B'}** with **${categorySummary[0]?.joined || 0} additions**.
2. **Heartland vs Central Dynamics:** Suburban retail centers (e.g. Frasers Centrepoint Trust & CapitaLand heartland malls) demonstrated resilient tenant retention.
3. **SGTUFF Advocacy:** SGTUFF calls for transparent gross turnover (GTO) lease structures and fair occupancy terms for Singapore retail operators.

---
*Report generated automatically by SGTUFF Singapore Retail Directory Index.*  
*Visit [www.sgtuff.org.sg](https://www.sgtuff.org.sg) for tenant support and commercial tenancy guides.*
  `.trim();

  // HTML format
  const htmlContent = `
<article class="sgtuff-blog-article">
  <div class="blog-header">
    <span class="blog-badge">SGTUFF Monthly Retail Index</span>
    <h1>${title}</h1>
    <div class="blog-meta">
      <span>By <strong>SGTUFF Research Team</strong></span> &bull; 
      <span>${publishDate}</span> &bull; 
      <span>${reitTitle}</span>
    </div>
  </div>

  <div class="blog-summary-box">
    <h3>Executive Snapshot (${currentMonthFormatted})</h3>
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-num text-green">+${summary.totalJoined}</span>
        <span class="stat-label">New Entrants</span>
      </div>
      <div class="stat-card">
        <span class="stat-num text-red">-${summary.totalExited}</span>
        <span class="stat-label">Brand Exits</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">${summary.netPortfolioChange >= 0 ? `+${summary.netPortfolioChange}` : summary.netPortfolioChange}</span>
        <span class="stat-label">Net Movement</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">${summary.portfolioTurnoverRate}%</span>
        <span class="stat-label">Turnover Rate</span>
      </div>
    </div>
  </div>

  <h2>🟢 New Brand Arrivals</h2>
  <table class="sgtuff-table table-joined">
    <thead>
      <tr><th>Brand</th><th>Category</th><th>Mall</th><th>Operator</th><th>Unit #</th></tr>
    </thead>
    <tbody>
      ${allJoined.map(b => `
        <tr>
          <td><strong>${b.name}</strong></td>
          <td><span class="tag tag-cat">${b.category}</span></td>
          <td>${b.mallName}</td>
          <td>${b.reitCategory}</td>
          <td><code>${b.unit}</code></td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <h2>🔴 Brand Departures & Exits</h2>
  <table class="sgtuff-table table-exited">
    <thead>
      <tr><th>Exited Brand</th><th>Category</th><th>Mall</th><th>Operator</th><th>Former Unit</th></tr>
    </thead>
    <tbody>
      ${allExited.map(b => `
        <tr>
          <td><strong>${b.name}</strong></td>
          <td><span class="tag tag-exit">${b.category}</span></td>
          <td>${b.mallName}</td>
          <td>${b.reitCategory}</td>
          <td><code>${b.unit}</code></td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <h2>📊 Mall Portfolio Breakdown</h2>
  <table class="sgtuff-table table-overview">
    <thead>
      <tr>
        <th>Mall Name</th>
        <th>Operator</th>
        <th>Region</th>
        <th>${period.baselineMonth}</th>
        <th>${period.currentMonth}</th>
        <th>Joined</th>
        <th>Exited</th>
        <th>Net Shift</th>
      </tr>
    </thead>
    <tbody>
      ${Object.values(mallDiffs).map(m => `
        <tr>
          <td><strong>${m.mallName}</strong></td>
          <td>${m.reitCategory}</td>
          <td>${m.region}</td>
          <td>${m.storeCountBefore}</td>
          <td>${m.storeCountAfter}</td>
          <td class="text-green">+${m.joined.length}</td>
          <td class="text-red">-${m.exited.length}</td>
          <td><strong>${m.netChange >= 0 ? `+${m.netChange}` : m.netChange}</strong></td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="sgtuff-footer-callout">
    <h4>About SGTUFF</h4>
    <p>Singapore Tenants United For Fairness (SGTUFF) advocates for fair lease structures and equitable relationships between shopping mall landlords and retail operators in Singapore.</p>
    <a href="https://www.sgtuff.org.sg/blog" target="_blank" class="sgtuff-btn">Visit SGTUFF Hub &rarr;</a>
  </div>
</article>
  `.trim();

  return {
    id: `post-${period.currentMonth.toLowerCase()}`,
    title,
    slug,
    publishDate,
    summary,
    markdownContent,
    htmlContent
  };
}

function formatMonth(monthStr) {
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
