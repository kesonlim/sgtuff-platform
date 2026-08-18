import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className="footer-main">
        <div className="footer-container">
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '20px', marginBottom: '8px' }}>
              Connect with SGTUFF
            </h3>
            <p style={{ fontSize: '14px' }}>
              Singapore Tenants United For Fairness Co-Operative Ltd | Registration CS000438
            </p>
          </div>

          <div className="footer-social-icons">
            <a href="https://www.linkedin.com/company/sgtuff/" target="_blank" rel="noreferrer" title="LinkedIn">
              <img src="https://sgtuff.org.sg/wp-content/uploads/2023/09/square-linkedin-logo-isolated-white-background_469489-892-80x80.jpg" alt="LinkedIn" />
            </a>
            <a href="https://www.tiktok.com/@sgtuff2020" target="_blank" rel="noreferrer" title="TikTok">
              <img src="https://sgtuff.org.sg/wp-content/uploads/2023/09/Tik-Tok-white--80x80.png" alt="TikTok" />
            </a>
            <a href="https://www.instagram.com/sg.tenants.united.for.fairness/?hl=en" target="_blank" rel="noreferrer" title="Instagram">
              <img src="https://sgtuff.org.sg/wp-content/uploads/2023/09/instagram-icon-white-80x80.jpg" alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/groups/SGtenantsUNITEDforFairness/" target="_blank" rel="noreferrer" title="Facebook">
              <img src="https://sgtuff.org.sg/wp-content/uploads/2023/09/2021_Facebook_icon.svg-80x80.png" alt="Facebook" />
            </a>
          </div>
        </div>
      </footer>

      <div className="socket-bar">
        <div className="socket-container">
          <span>© 2023-2026 SGTUFF Co-Operative Ltd. All rights reserved.</span>
          <div>
            <Link to="/">Home</Link> | <Link to="/about-us">About Us</Link> | <Link to="/fair-tenancy">Fair Tenancy</Link> | <a href="/admin">Decap CMS</a>
          </div>
        </div>
      </div>
    </>
  );
}
