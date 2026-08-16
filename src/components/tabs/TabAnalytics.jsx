import React, { useState, useMemo } from 'react';
import { 
  BarChart4, DollarSign, ArrowUpRight, TrendingUp, Sparkles, 
  HelpCircle, Percent, ShieldCheck, Users, Calendar 
} from 'lucide-react';

export default function TabAnalytics({ orders, products }) {
  const [activeDateRange, setActiveDateRange] = useState('30d');
  
  // Interactive Simulation Sliders
  const [targetMargin, setTargetMargin] = useState(30); // in %
  const [projectedSalesGrowth, setProjectedSalesGrowth] = useState(15); // in %

  // Aggregate monthly analytics values
  const analytics = useMemo(() => {
    const totalSales = orders.reduce((sum, o) => sum + o.orderValue, 0);
    const totalProfit = orders.reduce((sum, o) => sum + o.profit, 0);
    const avgOrderValue = orders.length ? Math.round(totalSales / orders.length) : 0;
    const profitMargin = totalSales ? ((totalProfit / totalSales) * 100).toFixed(1) : 0;
    
    // Growth simulation math
    const currentMarginFraction = Number(profitMargin) / 100;
    const currentCosts = totalSales * (1 - currentMarginFraction);
    
    const simulatedRevenue = totalSales * (1 + projectedSalesGrowth / 100);
    const simulatedProfit = simulatedRevenue * (targetMargin / 100);
    const simulatedProfitIncrease = simulatedProfit - totalProfit;

    return {
      totalSales,
      totalProfit,
      avgOrderValue,
      profitMargin,
      simulatedRevenue,
      simulatedProfit,
      simulatedProfitIncrease
    };
  }, [orders, projectedSalesGrowth, targetMargin]);

  // Aggregate monthly profit trend data for past 6 months
  const monthlyProfitData = [
    { month: 'Feb', profit: 42000, margin: 24.2 },
    { month: 'Mar', profit: 58000, margin: 25.0 },
    { month: 'Apr', profit: 79000, margin: 25.8 },
    { month: 'May', profit: 92000, margin: 26.5 },
    { month: 'Jun', profit: 124000, margin: 27.2 },
    { month: 'Jul', profit: 154000, margin: 28.5 }
  ];

  const maxProfit = Math.max(...monthlyProfitData.map(d => d.profit));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade">
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="title-medium" style={{ fontWeight: 800 }}>Executive Analytics</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Interactive indicators, financial metrics, and predictive sales forecasts.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select 
            value={activeDateRange} 
            onChange={e => setActiveDateRange(e.target.value)} 
            className="input-field"
            style={{ width: '130px', height: '36px' }}
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="ytd">Year to Date</option>
          </select>
        </div>
      </div>

      {/* KPI summaries cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="card">
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Gross Sales Volume</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '12px 0 4px 0' }}>₹{analytics.totalSales.toLocaleString()}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--color-success)', fontWeight: 600 }}>
            ↑ 24% vs preceding period
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Net Operations Profit</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '12px 0 4px 0' }}>₹{analytics.totalProfit.toLocaleString()}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--color-success)', fontWeight: 600 }}>
            ↑ 28.5% vs preceding period
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Average Order Value</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '12px 0 4px 0' }}>₹{analytics.avgOrderValue.toLocaleString()}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Based on {orders.length} orders</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Weighted Net Margin</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '12px 0 4px 0', color: 'var(--color-primary)' }}>{analytics.profitMargin}%</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--color-success)', fontWeight: 600 }}>
            ↑ 1.4% improvement trend
          </div>
        </div>
      </div>

      {/* Analytics Charts & Simulator */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        
        {/* Left: Monthly Profit Trend SVG Bar Chart */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 className="title-small">Monthly Net Profit & Margins</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Financial growth track over the last 6 months</span>
          </div>

          <div style={{ width: '100%', height: '220px', position: 'relative', marginTop: '10px' }}>
            <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <line x1="0" y1="180" x2="500" y2="180" stroke="var(--border-color)" strokeWidth="1" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="0" y1="60" x2="500" y2="60" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4 4" />

              {/* Bar columns */}
              {monthlyProfitData.map((d, i) => {
                const x = (i * 76) + 30;
                const barHeight = (d.profit / maxProfit) * 140;
                const y = 180 - barHeight;
                return (
                  <g key={i}>
                    {/* Background Bar Shadow */}
                    <rect x={x} y="40" width="36" height="140" fill="var(--bg-input)" opacity="0.2" rx="4" />
                    {/* Active Bar */}
                    <rect
                      x={x}
                      y={y}
                      width="36"
                      height={barHeight}
                      fill="url(#analytics-bar-gradient)"
                      rx="4"
                    />
                    {/* Profit Label */}
                    <text x={x + 18} y={y - 8} fontSize="9" fontWeight="700" fill="var(--text-main)" textAnchor="middle">
                      ₹{Math.round(d.profit / 1000)}k
                    </text>
                    {/* Margin line label */}
                    <text x={x + 18} y={y + 16} fontSize="8" fontWeight="800" fill="white" textAnchor="middle">
                      {d.margin}%
                    </text>
                    {/* X axis Label */}
                    <text x={x + 18} y="195" fontSize="10" fontWeight="600" fill="var(--text-muted)" textAnchor="middle">
                      {d.month}
                    </text>
                  </g>
                );
              })}

              <defs>
                <linearGradient id="analytics-bar-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="var(--color-ai)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Right: Interactive Forecast Simulator */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justify: 'space-between', gap: '20px' }}>
          <div>
            <h3 className="title-small" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} style={{ color: 'var(--color-ai)' }} /> AI Business Growth Simulator
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Adjust operational parameters to project profits</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Slider 1 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                <span>Target Net Margin:</span>
                <span style={{ color: 'var(--color-ai)' }}>{targetMargin}%</span>
              </div>
              <input
                type="range"
                min="15"
                max="50"
                value={targetMargin}
                onChange={e => setTargetMargin(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-ai)' }}
              />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Current: {analytics.profitMargin}%</span>
            </div>

            {/* Slider 2 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                <span>Projected Order Volume Growth:</span>
                <span style={{ color: 'var(--color-primary)' }}>+{projectedSalesGrowth}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={projectedSalesGrowth}
                onChange={e => setProjectedSalesGrowth(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
              />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Over the next 30 days</span>
            </div>
          </div>

          {/* Results Block */}
          <div style={{
            backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)',
            padding: '16px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Projected Sales:</span>
              <strong>₹{Math.round(analytics.simulatedRevenue).toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Projected Net Profit:</span>
              <strong>₹{Math.round(analytics.simulatedProfit).toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '8px', fontSize: '0.85rem' }}>
              <span style={{ fontWeight: 600 }}>Incremental Profit Gain:</span>
              <strong style={{ color: 'var(--color-success)' }}>+₹{Math.round(analytics.simulatedProfitIncrease).toLocaleString()}</strong>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
