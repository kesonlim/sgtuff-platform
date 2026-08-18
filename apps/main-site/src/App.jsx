import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div id="wrapper">
      {/* Top Meta Bar */}
      <div id="header_meta">
        <div className="meta-container">
          <div className="meta-info">
            <span>✉️ info@sgtuff.org.sg</span>
            <span>📞 +65 8845 6623</span>
          </div>
          <ul className="social-bookmarks">
            <li>
              <a href="https://www.facebook.com/SGTUFF" target="_blank" rel="noreferrer" title="Facebook">f</a>
            </li>
            <li>
              <a href="https://www.instagram.com/sg.tenants.united.for.fairness/?hl=en" target="_blank" rel="noreferrer" title="Instagram">📷</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/sgtuff/" target="_blank" rel="noreferrer" title="LinkedIn">in</a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@sgtuff2020" target="_blank" rel="noreferrer" title="TikTok">🎵</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Header & Official Logo */}
      <header id="header">
        <div id="header_main">
          <div className="logo-container">
            <a href="#">
              <img 
                src="/SGTUFF-Logo-08-1030x321.jpg" 
                alt="SGTUFF – Promoting Fair Tenancy & Retail Leasing Best Practices in Singapore" 
                className="logo-img"
              />
            </a>
          </div>
        </div>

        {/* Navigation Bar */}
        <div id="header_main_alternate">
          <div className="nav-container">
            <ul className="main-menu">
              <li className={activeTab === 'home' ? 'active' : ''}>
                <a href="#" onClick={() => setActiveTab('home')}>Home</a>
              </li>
              <li className={activeTab === 'about' ? 'active' : ''}>
                <a href="https://sgtuff.org.sg/about-us/" target="_blank" rel="noreferrer">About Us</a>
              </li>
              <li>
                <a href="https://sgtuff.org.sg/membership-plan/" target="_blank" rel="noreferrer">Membership</a>
              </li>
              <li>
                <a href="https://sgtuff.org.sg/219-2/" target="_blank" rel="noreferrer">Fair Tenancy</a>
              </li>
              <li>
                <a href="https://sgtuff.org.sg/business-network/" target="_blank" rel="noreferrer">Business Network</a>
              </li>
              <li>
                <a href="https://sgtuff.org.sg/latest-news/" target="_blank" rel="noreferrer">Latest News</a>
              </li>
              <li className="tracker-highlight">
                <a href="https://sgtuff-mall-tracker.pages.dev" target="_blank" rel="noreferrer">
                  🛍️ Retail Tenant Tracker
                </a>
              </li>
              <li>
                <a href="https://sgtuff.eber.co/sign-in" target="_blank" rel="noreferrer">Member Log In</a>
              </li>
              <li>
                <a href="/admin">Decap CMS</a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Hero Featured Image */}
      <main className="main-content-wrap">
        <div className="hero-image-wrap">
          <img 
            src="/hero-banner.jpeg" 
            alt="SGTUFF Singapore Tenants United For Fairness" 
            className="hero-img" 
          />
        </div>

        {/* Latest Articles & Updates */}
        <div className="blog-section">
          <h2 className="blog-section-title">Latest Updates & Fair Tenancy Insights</h2>
          
          <div className="blog-list">
            <article className="blog-card">
              <h3 className="blog-title">
                <a href="#">Contract Development for Fair Tenancy Course (WSQ)</a>
              </h3>
              <div className="blog-meta-info">April 2, 2024 / 0 Comments</div>
              <p className="blog-excerpt">
                Secure your spot for our upcoming sessions! Dive into the Code of Conduct for Retail Premises leasing, ensuring optimal financial outcomes. Act fast! Contact Jonathan at ☎️ 9694 8505 via Call/WhatsApp or ✉️ email at jonathan@xprienz.com. Learn from our seasoned trainer, Nan, former lawyer and fair tenancy specialist.
              </p>
              <a href="#" className="read-more-btn">Read More →</a>
            </article>

            <article className="blog-card">
              <h3 className="blog-title">
                <a href="#">Home Safety & Eldercare Support – Free Benefits!</a>
              </h3>
              <div className="blog-meta-info">February 23, 2026 / 0 Comments</div>
              <p className="blog-excerpt">
                SGTUFF is offering Home Safety & Eldercare Support for eligible participants in retail, F&B & service industries. Edge guards, non-slip pads, motion sensor lights, bedrails & health assessment support.
              </p>
              <a href="#" className="read-more-btn">Read More →</a>
            </article>
          </div>
        </div>
      </main>

      {/* Quote Section */}
      <section className="quote-section">
        <h2>“Every man is guilty of all the good he did not do”</h2>
        <h3>~ Voltaire</h3>
      </section>

      {/* Contact SGTUFF Section */}
      <section className="contact-section">
        <div className="contact-info-box">
          <h2>CONTACT SGTUFF</h2>
          <p>Have questions about retail tenancy agreements, leasing dispute resolution, or membership?</p>
          <p style={{ marginTop: '15px' }}>
            Email: <a href="mailto:info@sgtuff.org.sg">info@sgtuff.org.sg</a><br />
            Phone: +65 8845 6623
          </p>
        </div>

        <div className="contact-form">
          <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
            <label>Name *</label>
            <input type="text" required placeholder="Your Name" />

            <label>E-Mail *</label>
            <input type="email" required placeholder="Your Email Address" />

            <label>Contact Number *</label>
            <input type="text" required placeholder="Your Phone Number" />

            <label>Subject *</label>
            <input type="text" required placeholder="Subject" />

            <label>Type your message here *</label>
            <textarea rows="4" required placeholder="Message..."></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
      </section>

      {/* Footer Widgets */}
      <div id="footer">
        <div className="footer-container">
          <div>
            <h3>Follow Us on Social Media</h3>
            <p style={{ marginTop: '10px', fontSize: '13px' }}>
              Connect with Singapore Tenants United For Fairness on official platforms.
            </p>
          </div>

          <div className="footer-socials">
            <a href="https://www.linkedin.com/company/sgtuff/" target="_blank" rel="noreferrer">
              <img src="https://sgtuff.org.sg/wp-content/uploads/2023/09/square-linkedin-logo-isolated-white-background_469489-892-80x80.jpg" alt="LinkedIn" />
            </a>
            <a href="https://www.tiktok.com/@sgtuff2020" target="_blank" rel="noreferrer">
              <img src="https://sgtuff.org.sg/wp-content/uploads/2023/09/Tik-Tok-white--80x80.png" alt="TikTok" />
            </a>
            <a href="https://www.instagram.com/sg.tenants.united.for.fairness/?hl=en" target="_blank" rel="noreferrer">
              <img src="https://sgtuff.org.sg/wp-content/uploads/2023/09/instagram-icon-white-80x80.jpg" alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/groups/SGtenantsUNITEDforFairness/" target="_blank" rel="noreferrer">
              <img src="https://sgtuff.org.sg/wp-content/uploads/2023/09/2021_Facebook_icon.svg-80x80.png" alt="Facebook" />
            </a>
          </div>
        </div>
      </div>

      {/* Socket Footer */}
      <footer id="socket">
        <div className="socket-container">
          <span>© 2023 by SGTUFF - Singapore Tenants United For Fairness Co-Operative Ltd</span>
          <div className="socket-links">
            <a href="https://sgtuff.org.sg" target="_blank" rel="noreferrer">Official Site</a> | <a href="/admin">Decap CMS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
