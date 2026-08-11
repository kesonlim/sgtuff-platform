export function generateSgtuffBlogPost(diffResult) {
  const { period, summary, mallDiffs, reitBreakdown } = diffResult;
  const monthName = period.currentMonth === '2026-08' ? 'August 2026' : period.currentMonth;

  let title = `SGTUFF Singapore Retail Movement Report (${monthName}): Singapore Commercial Shopping Malls Monthly Index`;

  let markdownContent = `# ${title}\n\n`;
  markdownContent += `*Published by SGTUFF Co-Operative Ltd | Promoting Fair Tenancy & Retail Leasing Best Practices in Singapore*\n\n`;
  markdownContent += `## Executive Summary & Portfolio Overview\n\n`;
  markdownContent += `In our continuous commitment to transparency across Singapore's commercial retail landscape, **SGTUFF** presents the **${monthName} Retail Movement Index**. Comparing **${period.baselineMonth}** against **${period.currentMonth}**, our monitoring system tracked **${summary.totalMallsTracked} major shopping malls** across CapitaLand, Frasers Property, Mapletree, Lendlease, Suntec REIT, and CDL.\n\n`;
  markdownContent += `- **Total Outlets Tracked**: ${summary.totalStoresMonth2}\n`;
  markdownContent += `- **New Brand Arrivals**: +${summary.totalJoined}\n`;
  markdownContent += `- **Departed / Closed Outlets**: -${summary.totalExited}\n`;
  markdownContent += `- **Net Portfolio Shift**: ${summary.netPortfolioChange >= 0 ? '+' : ''}${summary.netPortfolioChange}\n`;
  markdownContent += `- **Portfolio Turnover Velocity**: ${summary.portfolioTurnoverRate}%\n\n`;

  markdownContent += `### Movement Breakdown by REIT Operator\n\n`;
  markdownContent += `| REIT / Operator | New Entrants | Departures | Net Shift |\n`;
  markdownContent += `| :--- | :---: | :---: | :---: |\n`;

  (reitBreakdown || []).forEach(r => {
    const netFormatted = r.net >= 0 ? `+${r.net}` : `${r.net}`;
    markdownContent += `| **${r.reitCategory}** | +${r.joined} | -${r.exited} | **${netFormatted}** |\n`;
  });

  markdownContent += `\n### Notable Brand Arrivals & Departures\n\n`;

  let htmlContent = `<h1>${title}</h1>\n`;
  htmlContent += `<p><em>Published by SGTUFF Co-Operative Ltd | Promoting Fair Tenancy & Retail Leasing Best Practices in Singapore</em></p>\n`;
  htmlContent += `<h2>Executive Summary & Portfolio Overview</h2>\n`;
  htmlContent += `<p>In our continuous commitment to transparency across Singapore's commercial retail landscape, <strong>SGTUFF</strong> presents the <strong>${monthName} Retail Movement Index</strong>. Comparing <strong>${period.baselineMonth}</strong> against <strong>${period.currentMonth}</strong>, our monitoring system tracked <strong>${summary.totalMallsTracked} major shopping malls</strong> across CapitaLand, Frasers Property, Mapletree, Lendlease, Suntec REIT, and CDL.</p>\n`;
  htmlContent += `<ul>\n`;
  htmlContent += `  <li><strong>Total Outlets Tracked:</strong> ${summary.totalStoresMonth2}</li>\n`;
  htmlContent += `  <li><strong>New Brand Arrivals:</strong> +${summary.totalJoined}</li>\n`;
  htmlContent += `  <li><strong>Departed / Closed Outlets:</strong> -${summary.totalExited}</li>\n`;
  htmlContent += `  <li><strong>Net Portfolio Shift:</strong> ${summary.netPortfolioChange >= 0 ? '+' : ''}${summary.netPortfolioChange}</li>\n`;
  htmlContent += `  <li><strong>Portfolio Turnover Velocity:</strong> ${summary.portfolioTurnoverRate}%</li>\n`;
  htmlContent += `</ul>\n`;

  return {
    title,
    period,
    summary,
    markdownContent,
    htmlContent
  };
}
