import fs from 'fs';
import path from 'path';

const jsonPath = './apps/main-site/src/pages_scraped/scraped_wp_pages.json';
const scrapedData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const pagesDir = './apps/main-site/src/pages';
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

function extractEntryContent(html) {
  // Extract content between <div class="entry-content-wrapper clearfix"> and </div></div></div>
  const match = html.match(/<div class='entry-content-wrapper clearfix'>([\s\S]*?)<\/main>/i) ||
                html.match(/<div class="entry-content-wrapper clearfix">([\s\S]*?)<\/main>/i) ||
                html.match(/<article[\s\S]*?<\/article>/i);

  if (match) {
    let content = match[1] || match[0];
    // Rewrite absolute sgtuff.org.sg links to relative or internal staging links
    content = content.replace(/https:\/\/sgtuff.org.sg\/about-us\//g, "#/about-us");
    content = content.replace(/https:\/\/sgtuff.org.sg\/membership-plan\//g, "#/membership-plan");
    content = content.replace(/https:\/\/sgtuff.org.sg\/219-2\//g, "#/fair-tenancy");
    content = content.replace(/https:\/\/sgtuff.org.sg\/business-network\//g, "#/business-network");
    content = content.replace(/https:\/\/sgtuff.org.sg\/latest-news\//g, "#/latest-news");
    content = content.replace(/https:\/\/sgtuff.org.sg\/collaborate-with-us\//g, "#/collaborate-with-us");
    content = content.replace(/http:\/\/sgtuff.org.sg\//g, "#/");
    content = content.replace(/https:\/\/sgtuff.org.sg\//g, "#/");
    return content;
  }
  return "<p>Content loading...</p>";
}

const pageMapping = {
  "/": "Home",
  "/about-us/": "AboutUs",
  "/membership-plan/": "Membership",
  "/219-2/": "FairTenancy",
  "/business-network/": "BusinessNetwork",
  "/latest-news/": "LatestNews",
  "/collaborate-with-us/": "Collaborate",
  "/contract-development-for-fair-tenancy-course-3/": "CourseArticle",
  "/home-safety-eldercare-support-free-benefits-2/": "EldercareArticle2",
  "/home-safety-eldercare-support-free-benefits/": "EldercareArticle"
};

const exportedComponents = [];

Object.entries(pageMapping).forEach(([route, compName]) => {
  const rawHtml = scrapedData[route] || "";
  const bodyContent = extractEntryContent(rawHtml);

  const compCode = `import React from 'react';

export default function ${compName}Page({ onNavigate }) {
  return (
    <div className="scraped-page-container">
      <div 
        className="scraped-content-body"
        dangerouslySetInnerHTML={{ __html: ${JSON.stringify(bodyContent)} }} 
      />
    </div>
  );
}
`;

  const filePath = path.join(pagesDir, `${compName}Page.jsx`);
  fs.writeFileSync(filePath, compCode, 'utf8');
  exportedComponents.push(compName);
  console.log(`✅ Generated page component ${compName}Page.jsx`);
});

console.log(`\n🎉 Generated ${exportedComponents.length} React page components in ${pagesDir}`);
