import React from 'react';

export default function BusinessNetworkPage({ onNavigate }) {
  return (
    <div className="scraped-page-container">
      <div 
        className="scraped-content-body"
        dangerouslySetInnerHTML={{ __html: "\n                <header class=\"entry-content-header\"></header><div class=\"entry-content\"  itemprop=\"text\" >\n<h2 class=\"wp-block-heading\">Singapore</h2>\n\n\n\n<p class=\"wp-block-paragraph\">Singapore Retailers Association<br>Restaurant Association of Singapore<br>Association of Small and Medium Enterprises<br>Singapore Business Federation<br>Franchising and Licensing Association<br>Singapore National Co-operative Federation<br>Fair Tenancy Industry Committee</p>\n\n\n\n<h2 class=\"wp-block-heading\">China                                                                                                        </h2>\n\n\n\n<p class=\"wp-block-paragraph\">Official Business Network Partner: Global Frontier 1</p>\n\n\n\n<p class=\"wp-block-paragraph\"></p>\n</div><footer class=\"entry-footer\"></footer>\t\t\t</div>\n\n\t\t</article><!--end post-entry-->\n\n\n\n\t\t\t\t<!--end content-->\n\t\t\t\t" }} 
      />
    </div>
  );
}
