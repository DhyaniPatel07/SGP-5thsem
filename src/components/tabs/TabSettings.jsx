import React, { useState } from 'react';
import { 
  User, Building2, Key, Bell, Shield, CreditCard, 
  HelpCircle, Check, Sparkles, RefreshCw, Copy 
} from 'lucide-react';

export default function TabSettings({ user, theme, toggleTheme, addToast }) {
  const [profileName, setProfileName] = useState(user?.name || 'Rahul Mehta');
  const [profileEmail, setProfileEmail] = useState(user?.email || 'rahul@organicroots.com');
  const [apiKey, setApiKey] = useState('mrgn_live_79a2f7c00e12b7a9b08f4c');
  const [copiedKey, setCopiedKey] = useState(false);
  const [generatingKey, setGeneratingKey] = useState(false);

  // Billing states
  const [currentPlan, setCurrentPlan] = useState('Professional');

  // Toggle values
  const [notifs, setNotifs] = useState({
    emailLowStock: true,
    emailPriceChange: true,
    emailOrderErrors: true,
    whatsappUpdates: false
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    addToast('Profile changes saved successfully', 'success');
  };

  const handleGenerateKey = () => {
    setGeneratingKey(true);
    setTimeout(() => {
      setGeneratingKey(false);
      const chars = 'abcdef0123456789';
      let randomHex = '';
      for (let i = 0; i < 22; i++) {
        randomHex += chars[Math.floor(Math.random() * chars.length)];
      }
      setApiKey(`mrgn_live_${randomHex}`);
      addToast('New developer API Key generated', 'success');
    }, 1200);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    addToast('API Key copied to clipboard', 'info');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleNotifToggle = (key) => {
    setNotifs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    addToast('Notification preferences updated', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade">
      
      {/* Title */}
      <div>
        <h1 className="title-medium" style={{ fontWeight: 800 }}>Account & System Settings</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Configure user profile, billing details, API webhooks, and notifications.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '24px' }}>
        
        {/* Left Settings Sidebar categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, padding: '8px' }}>
              Setting Nodes
            </span>
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
              <User size={16} /> User Profile
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none' }}>
              <Building2 size={16} /> Business details
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none' }}>
              <Bell size={16} /> Notifications
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none' }}>
              <Key size={16} /> Developer API
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none' }}>
              <CreditCard size={16} /> Plan & Billing
            </button>
          </div>
        </div>

        {/* Right content panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* User Profile Form */}
          <div className="card">
            <h3 className="title-small" style={{ marginBottom: '16px' }}>User Profile</h3>
            
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Your Name</label>
                  <input 
                    type="text" 
                    value={profileName} 
                    onChange={e => setProfileName(e.target.value)} 
                    className="input-field" 
                    required 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Email Address</label>
                  <input 
                    type="email" 
                    value={profileEmail} 
                    onChange={e => setProfileEmail(e.target.value)} 
                    className="input-field" 
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '8px 18px', fontSize: '0.8rem' }}>
                Save Changes
              </button>
            </form>
          </div>

          {/* Notifications Preferences */}
          <div className="card">
            <h3 className="title-small" style={{ marginBottom: '6px' }}>Alert Preferences</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '16px' }}>
              Manage automation emails and alerts sent to your phone and email.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '0.8rem' }}>
                <div>
                  <strong>Low stock email reminders</strong>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Send daily updates of items nearing stockouts.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifs.emailLowStock} 
                  onChange={() => handleNotifToggle('emailLowStock')}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
                />
              </label>

              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '0.8rem' }}>
                <div>
                  <strong>Competitor price warnings</strong>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Send email if a competitor changes price on active products.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifs.emailPriceChange} 
                  onChange={() => handleNotifToggle('emailPriceChange')}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
                />
              </label>

              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '0.8rem' }}>
                <div>
                  <strong>Marketplace syncing errors</strong>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Send critical alert if a connected API channel drops connection.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifs.emailOrderErrors} 
                  onChange={() => handleNotifToggle('emailOrderErrors')}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
                />
              </label>

              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '0.8rem' }}>
                <div>
                  <strong>WhatsApp updates</strong>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Receive high-priority shipping updates on WhatsApp.</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifs.whatsappUpdates} 
                  onChange={() => handleNotifToggle('whatsappUpdates')}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
                />
              </label>
            </div>
          </div>

          {/* Developer API Configuration */}
          <div className="card">
            <h3 className="title-small" style={{ marginBottom: '6px' }}>Developer API Access</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '16px' }}>
              Retrieve your secret API token to connect your custom ERP or order routing script.
            </p>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', backgroundColor: 'var(--bg-app)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <code style={{ flex: 1, fontFamily: 'monospace', fontSize: '0.8rem', wordBreak: 'break-all' }}>{apiKey}</code>
              
              <button onClick={handleCopyKey} className="theme-toggle-btn" style={{ padding: '6px' }} title="Copy Token">
                <Copy size={16} />
              </button>
            </div>

            <button 
              onClick={handleGenerateKey} 
              disabled={generatingKey}
              className="btn btn-secondary" 
              style={{ padding: '8px 14px', fontSize: '0.75rem', marginTop: '14px' }}
            >
              {generatingKey ? (
                <><RefreshCw size={12} className="animate-spin" style={{ animation: 'skeleton-loading 1.5s infinite linear' }} /> Re-generating...</>
              ) : 'Re-generate secret API key'}
            </button>
          </div>

          {/* Plan & Billing */}
          <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Current Subscription</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0', color: 'var(--color-primary)' }}>{currentPlan} Plan</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Next billing: ₹7,999 due on August 24, 2026</p>
            </div>
            
            <button 
              onClick={() => addToast('Plan upgrade details triggered', 'info')}
              className="btn btn-ai" 
              style={{ fontSize: '0.75rem' }}
            >
              Upgrade Plan
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
