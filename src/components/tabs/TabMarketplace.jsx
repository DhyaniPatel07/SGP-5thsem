import React, { useState } from 'react';
import { 
  Network, CheckCircle2, AlertCircle, RefreshCw, 
  Settings, Power, PowerOff, ShieldCheck, ArrowRight 
} from 'lucide-react';

export default function TabMarketplace({ addToast }) {
  const [integrations, setIntegrations] = useState([
    {
      id: 'amazon',
      name: 'Amazon India',
      logo: 'a',
      color: '#ff9900',
      connected: true,
      lastSync: '12 minutes ago',
      productsSynced: 42,
      ordersSynced: 128,
      syncing: false
    },
    {
      id: 'flipkart',
      name: 'Flipkart Seller Hub',
      logo: 'F',
      color: '#2874f0',
      connected: true,
      lastSync: '34 minutes ago',
      productsSynced: 38,
      ordersSynced: 96,
      syncing: false
    },
    {
      id: 'meesho',
      name: 'Meesho Supplier Panel',
      logo: 'M',
      color: '#ff007f',
      connected: false,
      lastSync: 'Never synced',
      productsSynced: 0,
      ordersSynced: 0,
      syncing: false
    },
    {
      id: 'ondc',
      name: 'ONDC Network',
      logo: 'O',
      color: '#00b050',
      connected: false,
      lastSync: 'Never synced',
      productsSynced: 0,
      ordersSynced: 0,
      syncing: false
    }
  ]);

  const handleToggleConnect = (id) => {
    setIntegrations(prev => prev.map(integration => {
      if (integration.id === id) {
        const isConnecting = !integration.connected;
        if (isConnecting) {
          addToast(`${integration.name} connected successfully`, 'success');
          return {
            ...integration,
            connected: true,
            lastSync: 'Just connected',
            productsSynced: 15,
            ordersSynced: 32
          };
        } else {
          addToast(`${integration.name} disconnected`, 'warning');
          return {
            ...integration,
            connected: false,
            lastSync: 'Never synced',
            productsSynced: 0,
            ordersSynced: 0
          };
        }
      }
      return integration;
    }));
  };

  const handleSyncNow = (id) => {
    // Set loading state for sync
    setIntegrations(prev => prev.map(integration => {
      if (integration.id === id) return { ...integration, syncing: true };
      return integration;
    }));

    // Simulate network delay for API sync
    setTimeout(() => {
      setIntegrations(prev => prev.map(integration => {
        if (integration.id === id) {
          const addedOrders = Math.floor(Math.random() * 5) + 1;
          addToast(`Synced ${integration.name} catalog: Import complete (+${addedOrders} new orders)`, 'success');
          return {
            ...integration,
            syncing: false,
            lastSync: 'Just now',
            ordersSynced: integration.ordersSynced + addedOrders
          };
        }
        return integration;
      }));
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade">
      
      {/* Header */}
      <div>
        <h1 className="title-medium" style={{ fontWeight: 800 }}>Marketplace Integrations</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Connect, authorize, and sync catalog items across multi-channel retail portals.
        </p>
      </div>

      {/* Connection Info Alert */}
      <div className="glass-panel" style={{
        padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border-color)',
        display: 'flex', gap: '14px', alignItems: 'center', backgroundColor: 'var(--color-primary-light)'
      }}>
        <ShieldCheck size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
        <div style={{ fontSize: '0.8rem', lineHeight: 1.45 }}>
          <strong>Fulfillment API Security:</strong> MARGINN connects to marketplaces using encrypted OAuth 2.0 endpoints. We never store primary passwords or login keys. All order routing executes securely.
        </div>
      </div>

      {/* Grid of integration cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {integrations.map((int) => (
          <div key={int.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
            
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '8px', backgroundColor: int.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.25rem'
                }}>
                  {int.logo}
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{int.name}</h3>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>REST API Interface</span>
                </div>
              </div>

              <span className={`badge ${int.connected ? 'badge-success' : 'badge-error'}`}>
                {int.connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>

            {/* Sync metrics panel */}
            <div style={{
              backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)',
              padding: '12px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.75rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Last Synchronization:</span>
                <strong>{int.lastSync}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Catalog Items Synced:</span>
                <strong>{int.productsSynced} products</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Fulfillment Orders Synced:</span>
                <strong>{int.ordersSynced} orders</strong>
              </div>
            </div>

            {/* Actions Footer */}
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
              <button 
                onClick={() => handleToggleConnect(int.id)}
                className={`btn ${int.connected ? 'btn-secondary' : 'btn-primary'}`}
                style={{ flex: 1, padding: '8px', fontSize: '0.75rem' }}
              >
                {int.connected ? <><PowerOff size={12} /> Disconnect</> : <><Power size={12} /> Connect</>}
              </button>

              {int.connected && (
                <button
                  onClick={() => handleSyncNow(int.id)}
                  disabled={int.syncing}
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '8px', fontSize: '0.75rem', opacity: int.syncing ? 0.6 : 1 }}
                >
                  <RefreshCw size={12} className={int.syncing ? 'animate-spin' : ''} style={{ animation: int.syncing ? 'skeleton-loading 1.5s infinite linear' : 'none' }} />
                  {int.syncing ? 'Syncing...' : 'Sync Now'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Future roadmap section */}
      <div className="card" style={{ padding: '20px' }}>
        <h3 className="title-small" style={{ marginBottom: '8px' }}>Upcoming Marketplace Pipelines</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.45, marginBottom: '16px' }}>
          We are currently beta-testing direct API integrations with Shopify, WooCommerce, and Magento systems. If you'd like to apply for early access to these connections, trigger a developer sandbox request.
        </p>
        <button 
          onClick={() => addToast('Developer sandbox request submitted successfully', 'info')}
          className="btn btn-secondary" 
          style={{ fontSize: '0.75rem' }}
        >
          Request early access API <ArrowRight size={12} />
        </button>
      </div>

    </div>
  );
}
