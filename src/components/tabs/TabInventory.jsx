import React, { useMemo } from 'react';
import { 
  Layers, Package, AlertTriangle, Activity, RefreshCw, 
  TrendingUp, BarChart3, ShieldAlert, Sparkles, Send 
} from 'lucide-react';

export default function TabInventory({ products, setProducts, suppliers, addToast }) {
  
  // Aggregate inventory metrics
  const stats = useMemo(() => {
    let totalStock = 0;
    let lowStock = 0;
    let outOfStock = 0;
    let totalCostVal = 0;

    products.forEach(p => {
      totalStock += p.inventory;
      totalCostVal += p.supplierCost * p.inventory;
      if (p.status === 'Low Stock') lowStock++;
      if (p.status === 'Out of Stock') outOfStock++;
    });

    return { totalStock, lowStock, outOfStock, totalCostVal };
  }, [products]);

  // Find products that are low stock or out of stock
  const criticalItems = useMemo(() => {
    return products.filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock').slice(0, 5);
  }, [products]);

  // Handle reorder replenishment action
  const handleQuickReorder = (productId, qty) => {
    const prod = products.find(p => p.id === productId);
    const supplier = suppliers.find(s => s.id === prod.supplierId) || { name: 'Supplier' };

    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          inventory: p.inventory + qty,
          status: 'Active'
        };
      }
      return p;
    }));

    addToast(`Reordered ${qty} units of ${prod.name} from ${supplier.name}. PO #${Math.floor(10000 + Math.random() * 90000)} generated.`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade">
      
      {/* Header */}
      <div>
        <h1 className="title-medium" style={{ fontWeight: 800 }}>Inventory Hub</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Realtime warehouse volumes, forecasting models, and supplier procurement tracking.
        </p>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
            <span>Total Stock Units</span>
            <Package size={16} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '14px 0 6px 0' }}>
            {stats.totalStock.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Units stored globally</span>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
            <span>Supplier Stock Value</span>
            <Layers size={16} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '14px 0 6px 0' }}>
            ₹{stats.totalCostVal.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-primary)', fontWeight: 600 }}>Valued at wholesale cost</span>
        </div>

        <div className="card" style={{ borderLeft: stats.lowStock > 0 ? '3px solid var(--color-warning)' : '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
            <span>Low Stock SKUs</span>
            <AlertTriangle size={16} style={{ color: 'var(--color-warning)' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '14px 0 6px 0', color: stats.lowStock > 0 ? 'var(--color-warning)' : 'var(--text-main)' }}>
            {stats.lowStock}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Require immediate order</span>
        </div>

        <div className="card" style={{ borderLeft: stats.outOfStock > 0 ? '3px solid var(--color-error)' : '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
            <span>Out of Stock SKUs</span>
            <ShieldAlert size={16} style={{ color: 'var(--color-error)' }} />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '14px 0 6px 0', color: stats.outOfStock > 0 ? 'var(--color-error)' : 'var(--text-main)' }}>
            {stats.outOfStock}
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Listing disabled channels</span>
        </div>
      </div>

      {/* Forecasting and Warehouse Map grids */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Inventory Stock forecasting graph */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 className="title-small">AI Demand Forecasting & Run-Out Predictor</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Expected stock levels over the next 15 days based on sales velocity</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', backgroundColor: 'var(--color-ai-light)', padding: '4px 10px', borderRadius: '4px' }}>
              <Sparkles size={12} style={{ color: 'var(--color-ai)' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-ai)' }}>Forecast Eng</span>
            </div>
          </div>

          {/* Forecasting SVG Graph */}
          <div style={{ width: '100%', height: '220px', position: 'relative', marginTop: '10px' }}>
            <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              {/* Grid lines */}
              <line x1="0" y1="180" x2="500" y2="180" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="60" x2="500" y2="60" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />

              {/* Path: Historical levels (solid) */}
              <path d="M 0 50 L 80 60 L 160 85 L 240 100" fill="none" stroke="var(--color-primary)" strokeWidth="3" />
              
              {/* Path: Projected levels (dotted line representing AI forecast decline and replenishment) */}
              <path d="M 240 100 L 320 125 L 400 150 L 480 30" fill="none" stroke="var(--color-ai)" strokeWidth="3" strokeDasharray="6 4" />

              {/* Historical marker circles */}
              <circle cx="0" cy="50" r="4" fill="var(--color-primary)" />
              <circle cx="80" cy="60" r="4" fill="var(--color-primary)" />
              <circle cx="160" cy="85" r="4" fill="var(--color-primary)" />
              
              {/* Current day indicator */}
              <g transform="translate(240, 100)">
                <line x1="0" y1="-100" x2="0" y2="80" stroke="var(--color-primary)" strokeWidth="1" opacity="0.4" />
                <circle cx="0" cy="0" r="6" fill="var(--color-primary)" stroke="var(--bg-card)" strokeWidth="2" />
                <rect x="-35" y="-22" width="70" height="15" rx="3" fill="var(--color-primary)" />
                <text x="0" y="-12" fontSize="8" fontWeight="800" fill="white" textAnchor="middle">Today</text>
              </g>

              {/* Replenishment alert node */}
              <g transform="translate(400, 150)">
                <circle cx="0" cy="0" r="8" fill="var(--color-error-light)" />
                <circle cx="0" cy="0" r="4" fill="var(--color-error)" />
                <text x="-40" y="20" fontSize="9" fontWeight="700" fill="var(--color-error)">Expected Out-of-Stock</text>
              </g>
              
              <g transform="translate(480, 30)">
                <circle cx="0" cy="0" r="5" fill="var(--color-success)" />
                <text x="-40" y="-12" fontSize="9" fontWeight="700" fill="var(--color-success)">PO Arrival</text>
              </g>

              {/* X axis labels */}
              <text x="0" y="195" fontSize="8" fontWeight="600" fill="var(--text-muted)" textAnchor="middle">7d ago</text>
              <text x="120" y="195" fontSize="8" fontWeight="600" fill="var(--text-muted)" textAnchor="middle">3d ago</text>
              <text x="240" y="195" fontSize="8" fontWeight="600" fill="var(--text-muted)" textAnchor="middle">Today</text>
              <text x="360" y="195" fontSize="8" fontWeight="600" fill="var(--text-muted)" textAnchor="middle">Projected +5d</text>
              <text x="480" y="195" fontSize="8" fontWeight="600" fill="var(--text-muted)" textAnchor="middle">Projected +10d</text>
            </svg>
          </div>
        </div>

        {/* Warehouse Breakdown */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="title-small">Warehouse Storage Metrics</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '-8px' }}>Capacity limits of shared logistics spaces</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '10px' }}>
            {[
              { name: 'Noida Transit Hub', capacity: 74, space: '3,700 / 5,000 sq.ft' },
              { name: 'Surat Cargo Yards', capacity: 48, space: '2,400 / 5,000 sq.ft' },
              { name: 'Mumbai Warehousing', capacity: 92, space: '4,600 / 5,000 sq.ft' }
            ].map((wh, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
                  <span>{wh.name}</span>
                  <span style={{ color: wh.capacity > 90 ? 'var(--color-error)' : 'var(--text-main)' }}>{wh.capacity}% Filled</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-input)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${wh.capacity}%`, height: '100%',
                    backgroundColor: wh.capacity > 90 ? 'var(--color-error)' : 'var(--color-primary)'
                  }} />
                </div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{wh.space} used</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Stock Alerts Table */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 className="title-small" style={{ color: 'var(--color-warning)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={18} /> Critical Out-of-Stock & Low-Stock Alerts
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '-8px' }}>
          MARGINN automated replenishment engine identifies these items as near stockout. Click "Automated PO" to submit a restock order.
        </p>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product Title</th>
                <th>SKU</th>
                <th>Channel</th>
                <th>Available</th>
                <th>Run-out Est.</th>
                <th>Default Supplier</th>
                <th>Replenish Qty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {criticalItems.length > 0 ? (
                criticalItems.map((prod) => {
                  const sup = suppliers.find(s => s.id === prod.supplierId) || { name: 'Apex Electronics' };
                  const isOOS = prod.status === 'Out of Stock';
                  return (
                    <tr key={prod.id}>
                      <td style={{ fontWeight: 600 }}>
                        <span style={{ marginRight: '6px' }}>{prod.image}</span> {prod.name}
                      </td>
                      <td style={{ fontFamily: 'monospace' }}>{prod.sku}</td>
                      <td>{prod.marketplace}</td>
                      <td>
                        <span className={`badge ${isOOS ? 'badge-error' : 'badge-warning'}`}>
                          {prod.inventory} units
                        </span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600, color: isOOS ? 'var(--color-error)' : 'var(--text-main)' }}>
                          {isOOS ? 'Immediate' : '4 days'}
                        </span>
                      </td>
                      <td>{sup.name}</td>
                      <td><strong>{sup.moq || 50} units (MOQ)</strong></td>
                      <td>
                        <button 
                          onClick={() => handleQuickReorder(prod.id, sup.moq || 50)}
                          className="btn btn-secondary" 
                          style={{
                            padding: '6px 12px', fontSize: '0.7rem', display: 'inline-flex', gap: '6px',
                            borderColor: 'var(--color-primary)', color: 'var(--color-primary)'
                          }}
                        >
                          <Send size={12} /> Restock Now
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '24px 0', color: 'var(--color-success)', fontWeight: 600 }}>
                    ✓ All catalog inventory is healthy! No low stock alerts active.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
