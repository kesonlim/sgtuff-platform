import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import MembershipPage from './pages/MembershipPage.jsx';
import FairTenancyPage from './pages/FairTenancyPage.jsx';
import BusinessNetworkPage from './pages/BusinessNetworkPage.jsx';
import LatestNewsPage from './pages/LatestNewsPage.jsx';
import CollaboratePage from './pages/CollaboratePage.jsx';
import CourseArticlePage from './pages/CourseArticlePage.jsx';
import EldercareArticle2Page from './pages/EldercareArticle2Page.jsx';
import EldercareArticlePage from './pages/EldercareArticlePage.jsx';

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (newHash) => {
    window.location.hash = newHash;
  };

  const renderCurrentPage = () => {
    const cleanRoute = route.replace('#', '');
    switch (cleanRoute) {
      case '/about-us':
        return <AboutUsPage onNavigate={navigateTo} />;
      case '/membership-plan':
        return <MembershipPage onNavigate={navigateTo} />;
      case '/fair-tenancy':
      case '/219-2':
        return <FairTenancyPage onNavigate={navigateTo} />;
      case '/business-network':
        return <BusinessNetworkPage onNavigate={navigateTo} />;
      case '/latest-news':
        return <LatestNewsPage onNavigate={navigateTo} />;
      case '/collaborate-with-us':
        return <CollaboratePage onNavigate={navigateTo} />;
      case '/contract-development-for-fair-tenancy-course-3':
        return <CourseArticlePage onNavigate={navigateTo} />;
      case '/home-safety-eldercare-support-free-benefits-2':
        return <EldercareArticle2Page onNavigate={navigateTo} />;
      case '/home-safety-eldercare-support-free-benefits':
        return <EldercareArticlePage onNavigate={navigateTo} />;
      case '/':
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

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
            <a href="#/">
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
              <li className={route === '#/' || route === '' ? 'active' : ''}>
                <a href="#/">Home</a>
              </li>
              <li className={route === '#/about-us' ? 'active' : ''}>
                <a href="#/about-us">About Us</a>
              </li>
              <li className={route === '#/membership-plan' ? 'active' : ''}>
                <a href="#/membership-plan">Membership</a>
              </li>
              <li className={route === '#/fair-tenancy' || route === '#/219-2' ? 'active' : ''}>
                <a href="#/fair-tenancy">Fair Tenancy</a>
              </li>
              <li className={route === '#/business-network' ? 'active' : ''}>
                <a href="#/business-network">Business Network</a>
              </li>
              <li className={route === '#/latest-news' ? 'active' : ''}>
                <a href="#/latest-news">Latest News</a>
              </li>
              <li className="tracker-highlight">
                <a href="https://sgtuff-mall-tracker.pages.dev" target="_blank" rel="noreferrer">
                  🛍️ Retail Tenant Tracker
                </a>
              </li>
              <li>
                <a href="https://sgtuff.eber.co/sign-in" target="_blank" rel="noreferrer">Member Log In</a>
              </li>
              <li className={route === '#/collaborate-with-us' ? 'active' : ''}>
                <a href="#/collaborate-with-us">Collaborate with us</a>
              </li>
              <li>
                <a href="/admin">Decap CMS</a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Dynamic Page Content */}
      <main className="main-content-wrap">
        {renderCurrentPage()}
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
          <form onSubmit={(e) => { e.preventDefault(); alert('Message submitted!'); }}>
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
            <a href="#/">Home</a> | <a href="#/about-us">About Us</a> | <a href="/admin">Decap CMS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
