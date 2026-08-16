import React, { useMemo } from 'react';
import { 
  TrendingUp, TrendingDown, ShoppingCart, DollarSign, 
  Percent, Package, Users, Activity, Sparkles, AlertTriangle 
} from 'lucide-react';

export default function TabDashboard({ products, suppliers, orders, onNavigateTab }) {
  
  // Calculate executive KPI metrics from stateful collections
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((acc, curr) => acc + curr.orderValue, 0);
    const totalProfit = orders.reduce((acc, curr) => acc + curr.profit, 0);
    const profitMargin = totalRevenue ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0;
    
    // Low stock count
    const lowStockCount = products.filter(p => p.status === 'Low Stock' || p.inventory <= 10).length;
    const outOfStockCount = products.filter(p => p.status === 'Out of Stock' || p.inventory === 0).length;
    const inventoryHealth = products.length ? (((products.length - outOfStockCount) / products.length) * 100).toFixed(0) : 100;
    
    // Connected marketplaces
    const marketplaces = new Set(products.map(p => p.marketplace));

    // Today's orders and revenue (last 24 hours simulation)
    const today = new Date();
    const todayOrders = orders.filter(o => {
      const orderDate = new Date(o.orderDate);
      return orderDate.getDate() === today.getDate() && orderDate.getMonth() === today.getMonth();
    });
    const todayRevenue = todayOrders.reduce((acc, curr) => acc + curr.orderValue, 0);

    return {
      totalRevenue,
      totalProfit,
      profitMargin,
      lowStockCount,
      outOfStockCount,
      inventoryHealth,
      marketplaceCount: marketplaces.size,
      todayOrders: todayOrders.length,
      todayRevenue
    };
  }, [products, suppliers, orders]);

  // Aggregate daily revenue for the past 7 days for the chart
  const weeklyChartData = useMemo(() => {
    const result = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date.toLocaleDateString();
      const dayName = dayNames[date.getDay()];
      
      // Sum orderValue for this day
      const dailySum = orders
        .filter(o => new Date(o.orderDate).toLocaleDateString() === formattedDate)
        .reduce((sum, o) => sum + o.orderValue, 0);
        
      result.push({ day: dayName, revenue: dailySum });
    }
    return result;
  }, [orders]);

  // Calculate marketplace sales shares
  const marketplaceShares = useMemo(() => {
    const shares = {};
    orders.forEach(o => {
      shares[o.marketplace] = (shares[o.marketplace] || 0) + o.orderValue;
    });
    return Object.entries(shares).map(([name, value]) => ({ name, value }));
  }, [orders]);

  // Recent 5 activities combining low stock and recent orders
  const recentActivities = useMemo(() => {
    const activities = [];
    
    // Add low stock products
    products.filter(p => p.status === 'Low Stock').slice(0, 3).forEach(p => {
      activities.push({
        type: 'inventory',
        time: 'Just now',
        title: `Low Stock Alert: ${p.sku}`,
        message: `${p.name} has only ${p.inventory} left. Recommended to reorder.`,
        severity: 'warning'
      });
    });

    // Add recent orders
    orders.slice(0, 4).forEach((o, i) => {
      activities.push({
        type: 'order',
        time: `${i + 1}h ago`,
        title: `New Order Fulfilled: ${o.id}`,
        message: `${o.customerName} ordered 1x ${o.productName} via ${o.marketplace}. Value: ₹${o.orderValue.toLocaleString()}`,
        severity: 'success'
      });
    });
    
    return activities.slice(0, 5);
  }, [products, orders]);

  // Max value for chart scaling
  const maxWeeklyRevenue = Math.max(...weeklyChartData.map(d => d.revenue), 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} className="animate-fade">
      {/* Welcome header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="title-medium" style={{ fontSize: '1.8rem', fontWeight: 800 }}>Welcome to MARGINN</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '4px' }}>
            Here is your live e-commerce automation snapshot for today.
          </p>
        </div>
        <button onClick={() => onNavigateTab('AI Insights')} className="btn btn-ai" style={{ fontSize: '0.8rem' }}>
          <Sparkles size={14} /> View AI Opportunity Insights
        </button>
      </div>

      {/* Stats Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        
        {/* Card 1: Today's Revenue */}
        <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span>Today's Revenue</span>
            <DollarSign size={16} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '14px 0 6px 0', fontFamily: 'Manrope' }}>
            ₹{stats.todayRevenue.toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>
            <TrendingUp size={12} /> +12.4% vs yesterday
          </div>
        </div>

        {/* Card 2: Today's Orders */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span>Today's Orders</span>
            <ShoppingCart size={16} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '14px 0 6px 0', fontFamily: 'Manrope' }}>
            {stats.todayOrders}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>
            <TrendingUp size={12} /> +4 orders over yesterday
          </div>
        </div>

        {/* Card 3: Monthly Revenue */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span>30-Day Revenue</span>
            <DollarSign size={16} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '14px 0 6px 0', fontFamily: 'Manrope' }}>
            ₹{stats.totalRevenue.toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>
            <TrendingUp size={12} /> +6.8% vs last month
          </div>
        </div>

        {/* Card 4: Profit Margin */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span>Net Profit Margin</span>
            <Percent size={16} style={{ color: 'var(--color-ai)' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '14px 0 6px 0', fontFamily: 'Manrope' }}>
            {stats.profitMargin}%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-ai)', fontWeight: 600 }}>
            <Sparkles size={12} /> +1.2% by AI Pricing
          </div>
        </div>
      </div>

      {/* Main Charts & Activity section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Left panel: 7-Day Revenue Trend Chart */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 className="title-small">Weekly Revenue Analytics</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Daily billing values from connected marketplaces</span>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-light)', padding: '4px 10px', borderRadius: '4px' }}>
              Auto Sync Mode
            </span>
          </div>

          {/* SVG Animated Chart */}
          <div style={{ width: '100%', height: '220px', position: 'relative', marginTop: '10px' }}>
            <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              {/* Horizontal grid lines */}
              <line x1="0" y1="180" x2="500" y2="180" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="60" x2="500" y2="60" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />

              {/* Chart Line Path */}
              <path
                d={weeklyChartData.map((d, i) => {
                  const x = (i * 80) + 10;
                  const y = 180 - (d.revenue / maxWeeklyRevenue * 140);
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Gradient Area under chart line */}
              <path
                d={`${weeklyChartData.map((d, i) => {
                  const x = (i * 80) + 10;
                  const y = 180 - (d.revenue / maxWeeklyRevenue * 140);
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')} L ${(6 * 80) + 10} 180 L 10 180 Z`}
                fill="url(#dashboard-area-gradient)"
                opacity="0.12"
              />

              {/* Data points */}
              {weeklyChartData.map((d, i) => {
                const x = (i * 80) + 10;
                const y = 180 - (d.revenue / maxWeeklyRevenue * 140);
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="5" fill="var(--bg-card)" stroke="var(--color-primary)" strokeWidth="3" />
                    <text x={x} y={y - 12} fontSize="8" fontWeight="600" fill="var(--text-main)" textAnchor="middle">
                      ₹{Math.round(d.revenue / 1000)}k
                    </text>
                    <text x={x} y="195" fontSize="9" fontWeight="500" fill="var(--text-muted)" textAnchor="middle">
                      {d.day}
                    </text>
                  </g>
                );
              })}

              <defs>
                <linearGradient id="dashboard-area-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Right panel: Marketplace Share */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="title-small">Marketplace Revenue</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '-8px' }}>Sales contribution share</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
            {marketplaceShares.map((m, i) => {
              const totalVal = stats.totalRevenue || 1;
              const percent = ((m.value / totalVal) * 100).toFixed(0);
              const barColors = {
                Amazon: '#ff9900',
                Flipkart: '#2874f0',
                ONDC: '#00b050',
                Meesho: '#ff007f'
              };
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
                    <span>{m.name}</span>
                    <span>₹{m.value.toLocaleString()} ({percent}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-input)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${percent}%`, height: '100%',
                      backgroundColor: barColors[m.name] || 'var(--color-primary)'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 3: Activity Feed and Catalog Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Left: Recent Activity Feed */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="title-small">Recent Operations Activity</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentActivities.map((act, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', paddingBottom: '12px', borderBottom: i < recentActivities.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  backgroundColor: act.severity === 'warning' ? 'var(--color-warning-light)' : 'var(--color-success-light)',
                  color: act.severity === 'warning' ? 'var(--color-warning)' : 'var(--color-success)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  {act.type === 'inventory' ? <AlertTriangle size={12} /> : <ShoppingCart size={12} />}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{act.title}</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{act.time}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.3 }}>{act.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Operations Inventory & Suppliers Summary */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justify: 'space-between', gap: '20px' }}>
          <h3 className="title-small">Platform Health Matrix</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-app)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Active Suppliers</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, margin: '6px 0 2px 0' }}>{suppliers.length}</div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>25 in database logs</span>
            </div>
            
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-app)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Catalog Health</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, margin: '6px 0 2px 0', color: 'var(--color-success)' }}>{stats.inventoryHealth}%</div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{stats.outOfStockCount} out-of-stock items</span>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'var(--bg-app)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Marketplace Sync</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, margin: '6px 0 2px 0', color: 'var(--color-primary)' }}>{stats.marketplaceCount} Channels</div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>100% API response rate</span>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'var(--bg-app)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Low Stock Warning</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, margin: '6px 0 2px 0', color: stats.lowStockCount > 0 ? 'var(--color-warning)' : 'var(--color-success)' }}>{stats.lowStockCount} SKUs</div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Auto reorder recommended</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => onNavigateTab('Products')} className="btn btn-secondary" style={{ flex: 1, fontSize: '0.75rem' }}>
              Manage Products
            </button>
            <button onClick={() => onNavigateTab('Suppliers')} className="btn btn-secondary" style={{ flex: 1, fontSize: '0.75rem' }}>
              Manage Suppliers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
