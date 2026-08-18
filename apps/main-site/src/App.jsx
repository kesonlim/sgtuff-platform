import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import FairTenancyPage from './pages/FairTenancyPage.jsx';
import MembershipPage from './pages/MembershipPage.jsx';
import BusinessNetworkPage from './pages/BusinessNetworkPage.jsx';
import LatestNewsPage from './pages/LatestNewsPage.jsx';
import CollaboratePage from './pages/CollaboratePage.jsx';

export default function App() {
  return (
    <Router>
      <div id="app-wrapper">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/fair-tenancy" element={<FairTenancyPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/business-network" element={<BusinessNetworkPage />} />
            <Route path="/latest-news" element={<LatestNewsPage />} />
            <Route path="/collaborate" element={<CollaboratePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
