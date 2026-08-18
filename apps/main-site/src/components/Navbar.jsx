import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      {/* Top Meta Bar */}
      <div className="top-meta-bar">
        <div className="top-meta-container">
          <div className="meta-contacts">
            <span>✉️ <strong>info@sgtuff.org.sg</strong></span>
            <span>📞 <strong>+65 8845 6623</strong></span>
            <span>🇸🇬 <strong>SGTUFF Co-Operative Ltd (CS000438)</strong></span>
          </div>

          <div className="social-links">
            <a href="https://www.facebook.com/SGTUFF" target="_blank" rel="noreferrer" title="Facebook">f</a>
            <a href="https://www.instagram.com/sg.tenants.united.for.fairness/?hl=en" target="_blank" rel="noreferrer" title="Instagram">📷</a>
            <a href="https://www.linkedin.com/company/sgtuff/" target="_blank" rel="noreferrer" title="LinkedIn">in</a>
            <a href="https://www.tiktok.com/@sgtuff2020" target="_blank" rel="noreferrer" title="TikTok">🎵</a>
          </div>
        </div>
      </div>

      {/* Main Logo Bar */}
      <header className="header-main">
        <div className="header-container">
          <NavLink to="/" className="logo-link">
            <img 
              src="/SGTUFF-Logo-08-1030x321.jpg" 
              alt="SGTUFF - Singapore Tenants United For Fairness" 
            />
          </NavLink>
        </div>
      </header>

      {/* Sticky Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-container">
          <ul className="nav-menu">
            <li className="nav-item">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about-us" className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/fair-tenancy" className={({ isActive }) => isActive ? 'active' : ''}>Fair Tenancy</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/membership" className={({ isActive }) => isActive ? 'active' : ''}>Membership</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/business-network" className={({ isActive }) => isActive ? 'active' : ''}>Business Network</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/latest-news" className={({ isActive }) => isActive ? 'active' : ''}>Latest News</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/collaborate" className={({ isActive }) => isActive ? 'active' : ''}>Collaborate With Us</NavLink>
            </li>
            <li className="nav-item tracker-pill">
              <a href="https://sgtuff-mall-tracker.pages.dev" target="_blank" rel="noreferrer">
                🛍️ Retail Tenant Tracker
              </a>
            </li>
            <li className="nav-item">
              <a href="https://sgtuff.eber.co/sign-in" target="_blank" rel="noreferrer">Member Log In</a>
            </li>
            <li className="nav-item">
              <a href="/admin">Decap CMS</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
