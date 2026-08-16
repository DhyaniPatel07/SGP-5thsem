import React, { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_SUPPLIERS, INITIAL_ORDERS } from './data/mockData';

// Pages
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import Onboarding from './components/Onboarding';
import DashboardLayout from './components/DashboardLayout';

// Tabs
import TabDashboard from './components/tabs/TabDashboard';
import TabProducts from './components/tabs/TabProducts';
import TabAIProductDiscovery from './components/tabs/TabAIProductDiscovery';
import TabSuppliers from './components/tabs/TabSuppliers';
import TabMarketplace from './components/tabs/TabMarketplace';
import TabInventory from './components/tabs/TabInventory';
import TabOrders from './components/tabs/TabOrders';
import TabPricingEngine from './components/tabs/TabPricingEngine';
import TabAnalytics from './components/tabs/TabAnalytics';
import TabReports from './components/tabs/TabReports';
import TabAIInsights from './components/tabs/TabAIInsights';
import TabSettings from './components/tabs/TabSettings';

// Global Widgets
import AIAssistantWidget from './components/AIAssistantWidget';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' | 'auth' | 'onboarding' | 'dashboard'
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [dashboardTab, setDashboardTab] = useState('Dashboard');

  // Stateful Hydrated Data
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Global Toasts Notification
  const [toasts, setToasts] = useState([]);

  // Notifications Feed
  const [notifications, setNotifications] = useState([
    { 
      id: 'n-1', 
      title: 'Low Inventory Alert', 
      message: 'Apex Pro ANC Headphones is running low (0 units left). Restock suggested.', 
      type: 'error', 
      time: '5m ago', 
      read: false 
    },
    { 
      id: 'n-2', 
      title: 'AI Pricing Suggestion', 
      message: 'Competitor price increased on RGB Ring Light. Recommended adjustment: ₹1,299.', 
      type: 'info', 
      time: '12m ago', 
      read: false 
    },
    { 
      id: 'n-3', 
      title: 'Fulfillment Sync Success', 
      message: 'Order ORD-10023 successfully routed and shipped via BlueDart.', 
      type: 'success', 
      time: '1h ago', 
      read: true 
    },
    {
      id: 'n-4',
      title: 'Supplier Update',
      message: 'Global Textiles Ltd updated shipping speed to 5 days average lead time.',
      type: 'warning',
      time: '3h ago',
      read: true
    }
  ]);

  // Toast adder helper
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Automatically dismiss after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Sync theme with HTML root attribute
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    addToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
  };

  const handleLoginSuccess = (payload) => {
    setUser(payload);
    // If user has connected platform via OAuth, skip onboarding directly to Dashboard
    if (payload.connectedMarketplace) {
      setCurrentPage('dashboard');
      addToast('Signed in successfully via Seller Account', 'success');
    } else {
      setCurrentPage('onboarding');
      addToast('Sign in successful. Welcome to Onboarding!', 'success');
    }
  };

  const handleOnboardingComplete = (data) => {
    setUser(prev => ({
      ...prev,
      onboarding: data
    }));
    setCurrentPage('dashboard');
    addToast('Onboarding complete! Dashboard loaded.', 'success');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
    addToast('Signed out of MARGINN', 'info');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-app)', color: 'var(--text-main)' }}>
      {/* Toast Notification Renderer */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type} animate-fade`}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>
                {t.type === 'success' ? '✓ Action Complete' : t.type === 'error' ? '⚠ Error Encountered' : t.type === 'warning' ? '⚡ System Warning' : 'ℹ System Notice'}
              </div>
              <p style={{ fontSize: '0.75rem', marginTop: '2px', opacity: 0.85 }}>{t.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Page Routing */}
      {currentPage === 'landing' && (
        <LandingPage 
          onGetStarted={() => setCurrentPage('auth')} 
          onLogin={() => setCurrentPage('auth')} 
        />
      )}

      {currentPage === 'auth' && (
        <Auth 
          onLoginSuccess={handleLoginSuccess} 
          onBackToLanding={() => setCurrentPage('landing')} 
        />
      )}

      {currentPage === 'onboarding' && (
        <Onboarding 
          user={user} 
          onComplete={handleOnboardingComplete} 
        />
      )}

      {currentPage === 'dashboard' && (
        <DashboardLayout
          user={user}
          theme={theme}
          toggleTheme={toggleTheme}
          activeTab={dashboardTab}
          setActiveTab={setDashboardTab}
          notifications={notifications}
          setNotifications={setNotifications}
          onLogout={handleLogout}
        >
          {/* Active Tab Router */}
          {dashboardTab === 'Dashboard' && (
            <TabDashboard 
              products={products} 
              suppliers={suppliers} 
              orders={orders} 
              onNavigateTab={setDashboardTab}
            />
          )}

          {dashboardTab === 'Products' && (
            <TabProducts 
              products={products} 
              setProducts={setProducts} 
              suppliers={suppliers}
              addToast={addToast}
            />
          )}

          {dashboardTab === 'AI Discovery' && (
            <TabAIProductDiscovery 
              products={products}
              setProducts={setProducts}
              addToast={addToast}
            />
          )}

          {dashboardTab === 'Suppliers' && (
            <TabSuppliers 
              suppliers={suppliers} 
              setSuppliers={setSuppliers} 
              addToast={addToast}
            />
          )}

          {dashboardTab === 'Marketplace' && (
            <TabMarketplace 
              addToast={addToast}
            />
          )}

          {dashboardTab === 'Inventory' && (
            <TabInventory 
              products={products} 
              setProducts={setProducts} 
              suppliers={suppliers}
              addToast={addToast}
            />
          )}

          {dashboardTab === 'Orders' && (
            <TabOrders 
              orders={orders} 
              setOrders={setOrders} 
              addToast={addToast}
            />
          )}

          {dashboardTab === 'Pricing Engine' && (
            <TabPricingEngine 
              products={products} 
              setProducts={setProducts} 
              addToast={addToast}
            />
          )}

          {dashboardTab === 'Analytics' && (
            <TabAnalytics 
              orders={orders} 
              products={products}
            />
          )}

          {dashboardTab === 'Reports' && (
            <TabReports 
              addToast={addToast}
            />
          )}

          {dashboardTab === 'AI Insights' && (
            <TabAIInsights 
              products={products}
              setProducts={setProducts}
              suppliers={suppliers}
              addToast={addToast}
              onNavigateTab={setDashboardTab}
            />
          )}

          {dashboardTab === 'Settings' && (
            <TabSettings 
              user={user}
              theme={theme}
              toggleTheme={toggleTheme}
              addToast={addToast}
            />
          )}

          {/* Floating AI Business Assistant Widget */}
          <AIAssistantWidget 
            products={products} 
            orders={orders} 
            activeTab={dashboardTab}
            onNavigateTab={setDashboardTab}
          />
        </DashboardLayout>
      )}
    </div>
  );
}
