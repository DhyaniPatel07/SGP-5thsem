import React, { useState } from 'react';
import { 
  Sparkles, ShieldCheck, AlertTriangle, AlertCircle, 
  TrendingUp, RefreshCw, Send, Check 
} from 'lucide-react';
import { calculateProductMetrics } from '../../data/mockData';

export default function TabAIInsights({ products, setProducts, suppliers, addToast, onNavigateTab }) {
  const [insights, setInsights] = useState([
    {
      id: 'ins-1',
      title: 'Supplier Cost Optimization Opportunity',
      type: 'warning',
      category: 'logistics',
      message: 'Global Textiles Ltd (sup-2) is offering a 5% discount on bulk orders (> 200 units) of Cotton Oversized Tees. Switching your primary channel to this MOQ can save you approximately ₹18,400 monthly.',
      actionLabel: 'Adjust Supplier Agreement',
      actionType: 'supplier-switch',
      resolved: false
    },
    {
      id: 'ins-2',
      title: 'Impending Out-of-Stock Alert',
      type: 'error',
      category: 'inventory',
      message: 'At current sales velocity, Apex Pro Wireless ANC Headphones (SKU: ELE-1000-1) will run out of stock in 4 days. Lead time is 4 days. You should reorder immediately.',
      actionLabel: 'Quick Reorder MOQ',
      actionType: 'reorder',
      resolved: false,
      productId: 'prod-1',
      qty: 50
    },
    {
      id: 'ins-3',
      title: 'Competitor Price Increase Detected',
      type: 'info',
      category: 'pricing',
      message: 'Competitors on Amazon have raised prices of "Lumina LED RGB Ring Light" by 12%. You are pricing it at ₹1,199. AI suggests updating price to ₹1,299 to capture higher profits.',
      actionLabel: 'Apply AI Pricing',
      actionType: 'pricing-apply',
      resolved: false,
      productId: 'prod-3',
      suggestedPrice: 1299
    },
    {
      id: 'ins-4',
      title: 'High Refund Return Alert on Footwear',
      type: 'warning',
      category: 'quality',
      message: 'Elite Leather Chelsea Boots has seen a 6.2% refund request increase this week. Customers cite sizing mismatch issues. AI recommends updating size charts on Flipkart listings to reduce returns.',
      actionLabel: 'Inspect Orders log',
      actionType: 'navigate-orders',
      resolved: false
    }
  ]);

  const handleResolveInsight = (insight) => {
    if (insight.actionType === 'reorder') {
      // Perform stock reorder
      setProducts(prev => prev.map(p => {
        if (p.id === insight.productId) {
          return {
            ...p,
            inventory: p.inventory + insight.qty,
            status: 'Active'
          };
        }
        return p;
      }));
      addToast('Restock order placed via supplier API', 'success');
    } else if (insight.actionType === 'pricing-apply') {
      // Apply pricing
      setProducts(prev => prev.map(p => {
        if (p.id === insight.productId) {
          const { marketplaceFees, expectedProfit, expectedMargin } = calculateProductMetrics(
            p.supplierCost, insight.suggestedPrice, 15, p.shippingCost
          );
          return {
            ...p,
            sellingPrice: insight.suggestedPrice,
            marketplaceFees,
            expectedProfit,
            expectedMargin
          };
        }
        return p;
      }));
      addToast('AI Price adjustment applied', 'success');
    } else if (insight.actionType === 'navigate-orders') {
      onNavigateTab('Orders');
      return;
    } else if (insight.actionType === 'supplier-switch') {
      onNavigateTab('Suppliers');
      return;
    }

    // Mark as resolved
    setInsights(prev => prev.map(ins => ins.id === insight.id ? { ...ins, resolved: true } : ins));
  };

  const activeInsights = insights.filter(ins => !ins.resolved);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade">
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="title-medium" style={{ fontWeight: 800 }}>AI Insights Center</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Automated notifications, cost savings anomalies, and revenue boosters.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', backgroundColor: 'var(--color-ai-light)', padding: '6px 12px', borderRadius: '99px' }}>
          <Sparkles size={14} style={{ color: 'var(--color-ai)' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-ai)' }}>
            4 Recommendations Active
          </span>
        </div>
      </div>

      {/* Grid: Stats of savings */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div className="card">
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Recoverable Revenue</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '12px 0 4px 0', color: 'var(--color-ai)' }}>₹34,800/mo</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>From pricing mismatch logs</span>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Supplier Cost Savings</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '12px 0 4px 0', color: 'var(--color-success)' }}>₹18,400/mo</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Bulk MOU optimizations</span>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Refund Risks Mitigated</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '12px 0 4px 0', color: 'var(--color-warning)' }}>6.2% Return Limit</div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Listing update recommendations</span>
        </div>
      </div>

      {/* Active Insights List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 className="title-small">Active Opportunities</h3>
        
        {activeInsights.length > 0 ? (
          activeInsights.map(ins => (
            <div 
              key={ins.id} 
              className="card animate-fade"
              style={{
                borderLeft: `4px solid ${ins.type === 'error' ? 'var(--color-error)' : ins.type === 'warning' ? 'var(--color-warning)' : ins.type === 'info' ? 'var(--color-primary)' : 'var(--color-ai)'}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap'
              }}
            >
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    backgroundColor: ins.type === 'error' ? 'var(--color-error-light)' : ins.type === 'warning' ? 'var(--color-warning-light)' : 'var(--color-primary-light)',
                    color: ins.type === 'error' ? 'var(--color-error)' : ins.type === 'warning' ? 'var(--color-warning)' : 'var(--color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {ins.type === 'error' ? <AlertCircle size={12} /> : ins.type === 'warning' ? <AlertTriangle size={12} /> : <Sparkles size={12} />}
                  </div>
                  <strong style={{ fontSize: '0.9rem' }}>{ins.title}</strong>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>• {ins.category}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>{ins.message}</p>
              </div>

              <button 
                onClick={() => handleResolveInsight(ins)}
                className="btn btn-ai"
                style={{ padding: '8px 16px', fontSize: '0.75rem', alignSelf: 'center', flexShrink: 0 }}
              >
                {ins.actionLabel} <Check size={14} />
              </button>
            </div>
          ))
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--color-success)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>✓ All caught up!</div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>All AI optimization insights have been successfully implemented or dismissed.</span>
          </div>
        )}
      </div>

    </div>
  );
}
