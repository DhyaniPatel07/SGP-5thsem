import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Truck, Network, ShieldCheck, 
  Layers, CreditCard, BarChart4, ClipboardList, Sparkles, 
  Settings, HelpCircle, Sun, Moon, Search, Bell, User, 
  LogOut, Menu, X, ArrowUpRight, CheckCircle2 
} from 'lucide-react';

export default function DashboardLayout({ 
  user, 
  theme, 
  toggleTheme, 
  activeTab, 
  setActiveTab, 
  notifications, 
  setNotifications, 
  onLogout,
  children 
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'Products', label: 'Products', icon: <ShoppingBag size={18} /> },
    { id: 'AI Discovery', label: 'AI Product Discovery', icon: <Sparkles size={18} />, isAI: true },
    { id: 'Suppliers', label: 'Suppliers', icon: <Truck size={18} /> },
    { id: 'Marketplace', label: 'Marketplace', icon: <Network size={18} /> },
    { id: 'Inventory', label: 'Inventory', icon: <Layers size={18} /> },
    { id: 'Orders', label: 'Orders', icon: <ClipboardList size={18} /> },
    { id: 'Pricing Engine', label: 'Pricing Engine', icon: <CreditCard size={18} />, isAI: true },
    { id: 'Analytics', label: 'Analytics', icon: <BarChart4 size={18} /> },
    { id: 'Reports', label: 'Reports', icon: <ClipboardList size={18} /> },
    { id: 'AI Insights', label: 'AI Insights', icon: <Sparkles size={18} />, isAI: true, badge: 4 },
    { id: 'Settings', label: 'Settings', icon: <Settings size={18} /> }
  ];

  const unreadNotifications = notifications.filter(n => !n.read);

  const handleNotificationClick = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredMenuItems = menuItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--bg-app)' }}>
      {/* Sidebar Navigation */}
      <aside className="glass-panel" style={{
        width: sidebarOpen ? '260px' : '72px',
        borderRight: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-sidebar)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width var(--transition-normal)',
        zIndex: 50,
        position: 'relative'
      }}>
        <div>
          {/* Logo Brand Header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '20px 22px', borderBottom: '1px solid var(--border-color)',
            overflow: 'hidden', whiteSpace: 'nowrap'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-ai))',
              width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800
            }}>
              M
            </div>
            {sidebarOpen && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'Manrope' }}>
                  MARGINN
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>commerce.ai</span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: sidebarOpen ? 'flex-start' : 'center',
                    gap: '12px', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: 'none',
                    cursor: 'pointer', width: '100%', textAlign: 'left',
                    backgroundColor: isActive ? (item.isAI ? 'var(--color-ai-light)' : 'var(--color-primary-light)') : 'transparent',
                    color: isActive ? (item.isAI ? 'var(--color-ai)' : 'var(--color-primary)') : 'var(--text-muted)',
                    fontWeight: isActive ? 600 : 500, fontSize: '0.85rem',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseOver={e => {
                    if (!isActive) e.target.style.backgroundColor = 'var(--bg-card-hover)';
                  }}
                  onMouseOut={e => {
                    if (!isActive) e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', color: isActive ? 'inherit' : 'var(--text-muted)' }}>
                    {item.icon}
                  </div>
                  {sidebarOpen && (
                    <span style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {item.label}
                      {item.isAI && !isActive && (
                        <span style={{ fontSize: '0.6rem', color: 'var(--color-ai)', backgroundColor: 'var(--color-ai-light)', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          AI
                        </span>
                      )}
                      {item.badge && (
                        <span style={{ fontSize: '0.65rem', backgroundColor: 'var(--color-error)', color: 'white', padding: '1px 6px', borderRadius: '99px', fontWeight: 700 }}>
                          {item.badge}
                        </span>
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Theme & Collapse Control */}
          <div style={{ display: 'flex', justifyContent: sidebarOpen ? 'space-between' : 'center', alignItems: 'center', gap: '8px' }}>
            <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle Theme">
              {theme === 'dark' ? <Sun size={18} style={{ color: 'var(--color-warning)' }} /> : <Moon size={18} />}
            </button>
            
            {sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="theme-toggle-btn" 
                title="Collapse Sidebar"
              >
                <X size={16} />
              </button>
            )}
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="theme-toggle-btn" 
                title="Expand Sidebar"
              >
                <Menu size={16} />
              </button>
            )}
          </div>

          {/* User profile capsule */}
          {sidebarOpen && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-hover)',
              border: '1px solid var(--border-color)', overflow: 'hidden'
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: 'var(--color-primary)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.85rem', flexShrink: 0
              }}>
                {user?.name?.charAt(0).toUpperCase() || 'S'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {user?.name || 'Seller Admin'}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {user?.email || 'admin@store.com'}
                </div>
              </div>
              <button 
                onClick={onLogout} 
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', padding: '4px' }}
                title="Log Out"
                onMouseOver={e => e.target.style.color = 'var(--color-error)'}
                onMouseOut={e => e.target.style.color = 'var(--text-muted)'}
              >
                <LogOut size={14} />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Panel Content Container */}
      <div className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        
        {/* Top Navbar */}
        <header className="glass-panel" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 24px', borderBottom: '1px solid var(--border-color)',
          position: 'sticky', top: 0, zIndex: 40,
          background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)'
        }}>
          {/* Left: Command Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search tabs, tools, products..."
              className="input-field"
              style={{ paddingLeft: '36px', height: '36px', borderRadius: '99px' }}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {/* Quick dropdown filters for search */}
            {searchQuery && (
              <div className="glass-panel" style={{
                position: 'absolute', top: '44px', left: 0, width: '100%',
                borderRadius: 'var(--radius-md)', padding: '6px', display: 'flex', flexDirection: 'column', gap: '2px',
                boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--bg-card)'
              }}>
                {filteredMenuItems.length > 0 ? (
                  filteredMenuItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setSearchQuery(''); }}
                      style={{
                        padding: '8px 12px', border: 'none', background: 'none', textAlign: 'left',
                        cursor: 'pointer', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem',
                        color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px'
                      }}
                      onMouseOver={e => e.target.style.backgroundColor = 'var(--bg-card-hover)'}
                      onMouseOut={e => e.target.style.backgroundColor = 'transparent'}
                    >
                      {item.icon} {item.label}
                    </button>
                  ))
                ) : (
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', padding: '8px', textAlign: 'center' }}>
                    No modules match search query
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Right: Notifications & Quick Profile Panel */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* AI Highlight Tag */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px', borderRadius: '99px',
              backgroundColor: 'var(--color-ai-light)', border: '1px solid rgba(139, 92, 246, 0.15)'
            }}>
              <Sparkles size={14} style={{ color: 'var(--color-ai)' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-ai)', letterSpacing: '0.02em' }}>
                MARGINN AI ACTIVE
              </span>
            </div>

            {/* Notification Center Bell Popover */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                style={{
                  background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer',
                  position: 'relative', display: 'flex', padding: '6px', borderRadius: '50%',
                  backgroundColor: showNotifications ? 'var(--bg-card-hover)' : 'transparent',
                  transition: 'background-color var(--transition-fast)'
                }}
              >
                <Bell size={18} />
                {unreadNotifications.length > 0 && (
                  <span style={{
                    position: 'absolute', top: '2px', right: '2px',
                    width: '8px', height: '8px', borderRadius: '50%',
                    backgroundColor: 'var(--color-error)', border: '2px solid var(--bg-card)'
                  }} />
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {showNotifications && (
                <div className="glass-panel animate-fade" style={{
                  position: 'absolute', top: '44px', right: 0, width: '320px',
                  borderRadius: 'var(--radius-lg)', padding: '16px', display: 'flex', flexDirection: 'column',
                  gap: '12px', boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)', zIndex: 100
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Notifications ({unreadNotifications.length})</span>
                    {unreadNotifications.length > 0 && (
                      <button 
                        onClick={handleMarkAllRead}
                        style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto' }}>
                    {notifications.length > 0 ? (
                      notifications.map(notif => (
                        <div 
                          key={notif.id} 
                          onClick={() => handleNotificationClick(notif.id)}
                          style={{
                            padding: '8px 10px', borderRadius: 'var(--radius-sm)',
                            borderLeft: `3px solid ${notif.type === 'error' ? 'var(--color-error)' : notif.type === 'warning' ? 'var(--color-warning)' : notif.type === 'success' ? 'var(--color-success)' : 'var(--color-primary)'}`,
                            backgroundColor: notif.read ? 'transparent' : 'var(--bg-card-hover)',
                            cursor: 'pointer', transition: 'background-color var(--transition-fast)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: notif.read ? 500 : 700 }}>
                            <span>{notif.title}</span>
                            <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{notif.time}</span>
                          </div>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.3 }}>{notif.message}</p>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        No notifications yet.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown avatar */}
            <div style={{ position: 'relative' }}>
              <div 
                onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
                style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer'
                }}
              >
                {user?.name?.charAt(0).toUpperCase() || 'S'}
              </div>

              {showProfileMenu && (
                <div className="glass-panel animate-fade" style={{
                  position: 'absolute', top: '44px', right: 0, width: '180px',
                  borderRadius: 'var(--radius-md)', padding: '6px', display: 'flex', flexDirection: 'column',
                  gap: '2px', boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)', zIndex: 100
                }}>
                  <button 
                    onClick={() => { setActiveTab('Settings'); setShowProfileMenu(false); }}
                    style={{
                      padding: '8px 12px', border: 'none', background: 'none', textAlign: 'left',
                      cursor: 'pointer', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem',
                      color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                    onMouseOver={e => e.target.style.backgroundColor = 'var(--bg-card-hover)'}
                    onMouseOut={e => e.target.style.backgroundColor = 'transparent'}
                  >
                    <Settings size={14} /> Settings
                  </button>
                  <button 
                    onClick={onLogout}
                    style={{
                      padding: '8px 12px', border: 'none', background: 'none', textAlign: 'left',
                      cursor: 'pointer', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem',
                      color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                    onMouseOver={e => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.05)'}
                    onMouseOut={e => e.target.style.backgroundColor = 'transparent'}
                  >
                    <LogOut size={14} /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Box */}
        <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
