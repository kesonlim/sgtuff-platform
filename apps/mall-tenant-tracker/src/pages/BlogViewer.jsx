import React, { useState, useEffect } from 'react';
import { Copy, Check, ExternalLink, BookOpen, Code, FileText, Share2, Sparkles } from 'lucide-react';

export default function BlogViewer({ blogPost, selectedMonths, setSelectedMonths, availableMonths }) {
  const [copiedFormat, setCopiedFormat] = useState(null); // 'html' or 'md'
  const [viewMode, setViewMode] = useState('rendered'); // 'rendered', 'html', 'md'
  
  // WordPress Credentials & Publishing state
  const [wpUrl, setWpUrl] = useState('https://sgtuff.org.sg');
  const [wpUsername, setWpUsername] = useState('');
  const [wpAppPassword, setWpAppPassword] = useState('');
  const [postStatus, setPostStatus] = useState('draft'); // 'draft' or 'publish'
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState(null);
  const [showWpPanel, setShowWpPanel] = useState(false);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(type);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  const handleDirectWpPublish = async () => {
    if (!wpUsername || !wpAppPassword) {
      alert('Please enter your WordPress Username and Application Password.');
      return;
    }

    setIsPublishing(true);
    setPublishResult(null);

    try {
      const res = await fetch('/api/wordpress/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteUrl: wpUrl,
          username: wpUsername,
          applicationPassword: wpAppPassword,
          title: blogPost.title,
          content: blogPost.htmlContent,
          status: postStatus
        })
      });

      const data = await res.json();
      setPublishResult(data);
    } catch (err) {
      setPublishResult({ success: false, error: err.message });
    } finally {
      setIsPublishing(false);
    }
  };

  if (!blogPost) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <p className="text-secondary">Generating SGTUFF blog article for www.sgtuff.org.sg/blog...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Action Header Bar */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-red"><BookOpen size={12} /> www.sgtuff.org.sg/blog</span>
            <span className="text-secondary" style={{ fontSize: '0.8rem' }}>Publishing Ready Output</span>
          </div>
          <h2 style={{ fontSize: '1.35rem' }}>SGTUFF Retail Movement Blog Generator</h2>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          
          {/* View Format Selector */}
          <div style={{ display: 'flex', background: 'var(--bg-primary)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <button
              className={`btn ${viewMode === 'rendered' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
              onClick={() => setViewMode('rendered')}
            >
              <BookOpen size={14} /> Rendered Blog
            </button>
            <button
              className={`btn ${viewMode === 'html' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
              onClick={() => setViewMode('html')}
            >
              <Code size={14} /> Raw HTML
            </button>
            <button
              className={`btn ${viewMode === 'md' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
              onClick={() => setViewMode('md')}
            >
              <FileText size={14} /> Markdown
            </button>
          </div>

          {/* Copy & Publish Buttons */}
          <button
            className="btn btn-secondary"
            onClick={() => setShowWpPanel(!showWpPanel)}
            style={{ borderColor: 'var(--sgtuff-red)' }}
          >
            <Share2 size={16} className="text-red" />
            <span>Publish to WP (sgtuff.org.sg)</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => copyToClipboard(blogPost.htmlContent, 'html')}
            style={{ borderColor: 'var(--color-blue)' }}
          >
            {copiedFormat === 'html' ? <Check size={16} className="text-green" /> : <Copy size={16} className="text-blue" />}
            <span>{copiedFormat === 'html' ? 'Copied HTML!' : 'Copy HTML'}</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={() => copyToClipboard(blogPost.markdownContent, 'md')}
          >
            {copiedFormat === 'md' ? <Check size={16} /> : <Copy size={16} />}
            <span>{copiedFormat === 'md' ? 'Copied Markdown!' : 'Copy Markdown'}</span>
          </button>

        </div>
      </div>

      {/* WordPress Publishing Panel */}
      {showWpPanel && (
        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))', borderColor: 'var(--sgtuff-red)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Share2 size={18} className="text-red" />
            Publish Test Post Directly to WPX WordPress (https://sgtuff.org.sg)
          </h3>
          <p className="text-secondary" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            Use a WordPress <strong>Application Password</strong> (WP Admin → Users → Profile → Application Passwords) to connect and publish a post directly to your blog.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                WordPress Site URL:
              </label>
              <input
                type="text"
                value={wpUrl}
                onChange={(e) => setWpUrl(e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.75rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                WordPress Admin/Editor Username:
              </label>
              <input
                type="text"
                placeholder="e.g. sgtuff_admin"
                value={wpUsername}
                onChange={(e) => setWpUsername(e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.75rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                Application Password:
              </label>
              <input
                type="password"
                placeholder="xxxx xxxx xxxx xxxx"
                value={wpAppPassword}
                onChange={(e) => setWpAppPassword(e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.75rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                Publish Post Status:
              </label>
              <select
                value={postStatus}
                onChange={(e) => setPostStatus(e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.75rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff' }}
              >
                <option value="draft">Draft (Recommended for testing)</option>
                <option value="publish">Publish Live Immediately</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              className="btn btn-primary"
              onClick={handleDirectWpPublish}
              disabled={isPublishing}
            >
              {isPublishing ? 'Publishing to WordPress...' : `Publish ${postStatus === 'draft' ? 'Draft' : 'Live'} Post to sgtuff.org.sg`}
            </button>
          </div>

          {publishResult && (
            <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: '8px', background: publishResult.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', border: `1px solid ${publishResult.success ? '#10b981' : '#ef4444'}` }}>
              {publishResult.success ? (
                <div>
                  <h4 style={{ color: '#10b981', marginBottom: '0.25rem' }}>🎉 Post Successfully Created on WordPress!</h4>
                  <p style={{ fontSize: '0.85rem' }}>
                    Post ID: <code>{publishResult.id}</code> &bull; Status: <span className="badge badge-green">{publishResult.status}</span>
                  </p>
                  {publishResult.link && (
                    <a href={publishResult.link} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', fontSize: '0.85rem', marginTop: '0.5rem', display: 'inline-block' }}>
                      View Post on WordPress &rarr;
                    </a>
                  )}
                </div>
              ) : (
                <div>
                  <h4 style={{ color: '#ef4444', marginBottom: '0.25rem' }}>❌ WordPress Connection Failed</h4>
                  <p style={{ fontSize: '0.85rem', color: '#fca5a5' }}>{publishResult.error}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Main View Area */}
      {viewMode === 'rendered' && (
        <div className="blog-preview-frame">
          <div dangerouslySetInnerHTML={{ __html: blogPost.htmlContent }} />
        </div>
      )}

      {viewMode === 'html' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span className="text-secondary" style={{ fontSize: '0.85rem' }}>Raw HTML Code for WordPress / CMS Embedding:</span>
            <button className="btn btn-secondary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }} onClick={() => copyToClipboard(blogPost.htmlContent, 'html')}>
              <Copy size={14} /> Copy HTML
            </button>
          </div>
          <pre style={{
            backgroundColor: '#070a12',
            color: '#38bdf8',
            padding: '1.25rem',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            overflowX: 'auto',
            maxHeight: '600px'
          }}>
            {blogPost.htmlContent}
          </pre>
        </div>
      )}

      {viewMode === 'md' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span className="text-secondary" style={{ fontSize: '0.85rem' }}>Markdown Source Code:</span>
            <button className="btn btn-secondary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }} onClick={() => copyToClipboard(blogPost.markdownContent, 'md')}>
              <Copy size={14} /> Copy Markdown
            </button>
          </div>
          <pre style={{
            backgroundColor: '#070a12',
            color: '#a7f3d0',
            padding: '1.25rem',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            overflowX: 'auto',
            maxHeight: '600px'
          }}>
            {blogPost.markdownContent}
          </pre>
        </div>
      )}

    </div>
  );
}
