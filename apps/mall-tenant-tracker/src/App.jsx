import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DiffInspector from './pages/DiffInspector.jsx';
import ScraperConsole from './pages/ScraperConsole.jsx';
import BlogViewer from './pages/BlogViewer.jsx';
import singaporeMallsData from './data/singaporeMalls.json';
import { 
  getAvailableSnapshotMonthsClient, 
  compareSnapshotsClient 
} from './engine/diffEngineClient.js';
import { generateSgtuffBlogPost } from './generator/blogGeneratorClient.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [malls] = useState(singaporeMallsData);
  const [availableMonths] = useState(getAvailableSnapshotMonthsClient());
  const [selectedMonths, setSelectedMonths] = useState({ month1: '2026-07', month2: '2026-08' });
  const [selectedReit, setSelectedReit] = useState('all');
  const [diffData, setDiffData] = useState(null);
  const [blogPost, setBlogPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = () => {
    setIsLoading(true);
    try {
      const diff = compareSnapshotsClient(selectedMonths.month1, selectedMonths.month2, selectedReit);
      setDiffData(diff);

      const blog = generateSgtuffBlogPost(diff);
      setBlogPost(blog);
    } catch (err) {
      console.error('Error processing diff:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedMonths, selectedReit]);

  return (
    <div className="app-container">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        currentPeriod={selectedMonths.month2}
      />

      <main className="main-content">
        {isLoading || !diffData ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div className="spin" style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛍️</div>
            <h3 style={{ fontSize: '1.25rem' }}>Loading Singapore Shopping Malls Directory Index...</h3>
            <p className="text-secondary" style={{ fontSize: '0.88rem' }}>Fetching retail store snapshots across CapitaLand, Frasers, Mapletree, Lendlease, Suntec REIT</p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <Dashboard 
                diffData={diffData} 
                setActiveTab={setActiveTab} 
                selectedReit={selectedReit}
                setSelectedReit={setSelectedReit}
              />
            )}

            {activeTab === 'diffs' && (
              <DiffInspector 
                diffData={diffData}
                availableMonths={availableMonths}
                selectedMonths={selectedMonths}
                setSelectedMonths={setSelectedMonths}
                selectedReit={selectedReit}
                setSelectedReit={setSelectedReit}
              />
            )}

            {activeTab === 'scraper' && (
              <ScraperConsole 
                malls={malls}
                onRefreshSnapshots={loadData}
              />
            )}

            {activeTab === 'blog' && (
              <BlogViewer 
                blogPost={blogPost}
                selectedMonths={selectedMonths}
                setSelectedMonths={setSelectedMonths}
                availableMonths={availableMonths}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
