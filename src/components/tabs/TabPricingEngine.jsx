import React, { useState, useMemo } from 'react';
import { 
  Sparkles, DollarSign, Percent, ShieldCheck, HelpCircle, 
  TrendingUp, RefreshCw, CheckCircle2, ArrowRight, Edit 
} from 'lucide-react';
import { calculateProductMetrics } from '../../data/mockData';

export default function TabPricingEngine({ products, setProducts, addToast }) {
  const [activeOverrideId, setActiveOverrideId] = useState(null);
  const [overridePrice, setOverridePrice] = useState('');

  // Find products that have a discrepancy between selling price and competitor price/recommended price
  // We'll showcase products where competitorPrice != sellingPrice or where there's margin enhancement
  const recommendedItems = useMemo(() => {
    return products.slice(0, 10).map(p => {
      // Calculate suggested price based on competitor price & supplier cost
      // Suggesting a price that is 2% below competitor price, but keeping at least 20% margin
      const marginSafetyCost = p.supplierCost + p.shippingCost + p.marketplaceFees;
      const minPriceForMargin = Math.round(marginSafetyCost * 1.25); // 25% markup
      
      let suggestedPrice = p.competitorPrice ? Math.round(p.competitorPrice * 0.98) : p.sellingPrice;
      if (suggestedPrice < minPriceForMargin) {
        suggestedPrice = minPriceForMargin;
      }

      // Skip if already matching
      const currentMargin = p.expectedMargin;
      const { expectedMargin: suggestedMargin } = calculateProductMetrics(
        p.supplierCost, suggestedPrice, 15, p.shippingCost
      );
      const marginGain = Number((suggestedMargin - currentMargin).toFixed(2));
      const confidence = Math.floor(Math.random() * 15) + 80; // 80-95%

      return {
        ...p,
        suggestedPrice,
        suggestedMargin,
        marginGain,
        confidence
      };
    });
  }, [products]);

  // Aggregate estimated monthly revenue gain
  const totalOptimizedGain = useMemo(() => {
    return recommendedItems.reduce((sum, item) => {
      if (item.suggestedPrice > item.sellingPrice) {
        return sum + (item.suggestedPrice - item.sellingPrice) * 120; // 120 estimated sales / month
      }
      return sum;
    }, 0);
  }, [recommendedItems]);

  const handleApplyAIPrice = (id, price) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const { marketplaceFees, expectedProfit, expectedMargin } = calculateProductMetrics(
          p.supplierCost, price, 15, p.shippingCost
        );
        return {
          ...p,
          sellingPrice: price,
          marketplaceFees,
          expectedProfit,
          expectedMargin
        };
      }
      return p;
    }));
    addToast('Pricing optimized successfully. Marketplace listing updating.', 'success');
  };

  const handleApplyAllAI = () => {
    setProducts(prev => prev.map(p => {
      const rec = recommendedItems.find(r => r.id === p.id);
      if (rec) {
        const { marketplaceFees, expectedProfit, expectedMargin } = calculateProductMetrics(
          p.supplierCost, rec.suggestedPrice, 15, p.shippingCost
        );
        return {
          ...p,
          sellingPrice: rec.suggestedPrice,
          marketplaceFees,
          expectedProfit,
          expectedMargin
        };
      }
      return p;
    }));
    addToast('All AI price recommendations applied', 'success');
  };

  const handleOverrideSubmit = (e, id) => {
    e.preventDefault();
    const val = Number(overridePrice);
    if (!val || isNaN(val)) return;

    handleApplyAIPrice(id, val);
    setActiveOverrideId(null);
    setOverridePrice('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade">
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="title-medium" style={{ fontWeight: 800 }}>AI Pricing Engine</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Dynamic pricing optimization relative to competitor pricing and margin margins.
          </p>
        </div>
        <button onClick={handleApplyAllAI} className="btn btn-ai" style={{ fontSize: '0.8rem' }}>
          <Sparkles size={14} /> Apply All Recommendations
        </button>
      </div>

      {/* KPI gains card banner */}
      <div className="glass-panel" style={{
        padding: '20px 24px', borderRadius: '16px', border: '1px solid rgba(139, 92, 246, 0.15)',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(139, 92, 246, 0.06) 100%)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-ai-light)',
            color: 'var(--color-ai)', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Potential Margin Increase: ₹{totalOptimizedGain.toLocaleString()}/mo</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Applying recommendations matches competitor price changes while guaranteeing minimum 25% product markups.
            </p>
          </div>
        </div>
        
        <span style={{
          fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-success)',
          backgroundColor: 'var(--color-success-light)', padding: '6px 12px', borderRadius: '99px'
        }}>
          92% Average Pricing Accuracy
        </span>
      </div>

      {/* Pricing lists */}
      <div className="card" style={{ padding: '0px', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="title-small">Recommended Pricing Updates</h3>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Updated 5 minutes ago</span>
        </div>

        <div className="table-container" style={{ borderRadius: 0, border: 'none' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Listing Details</th>
                <th>Supplier Cost</th>
                <th>Comm Fees & Ship</th>
                <th>Competitor Price</th>
                <th>Current Retail</th>
                <th style={{ color: 'var(--color-ai)' }}>AI Suggested Price</th>
                <th>Margin Impact</th>
                <th>Confidence</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recommendedItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.1rem' }}>{item.image}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Channel: {item.marketplace} ({item.sku})</div>
                      </div>
                    </div>
                  </td>
                  <td><strong>₹{item.supplierCost}</strong></td>
                  <td>
                    <div style={{ fontSize: '0.75rem' }}>
                      <div>Fees: ₹{item.marketplaceFees}</div>
                      <div style={{ color: 'var(--text-muted)' }}>Ship: ₹{item.shippingCost}</div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--color-warning)' }}>
                    ₹{item.competitorPrice || 'N/A'}
                  </td>
                  <td style={{ fontWeight: 500 }}>
                    ₹{item.sellingPrice}
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Margin: {item.expectedMargin}%</div>
                  </td>
                  <td style={{ backgroundColor: 'var(--color-ai-light)' }}>
                    <div style={{ fontWeight: 800, color: 'var(--color-ai)', fontSize: '0.9rem' }}>
                      ₹{item.suggestedPrice}
                    </div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Margin: {item.suggestedMargin}%</span>
                  </td>
                  <td>
                    <span style={{ 
                      fontSize: '0.75rem', fontWeight: 700, 
                      color: item.marginGain >= 0 ? 'var(--color-success)' : 'var(--color-error)'
                    }}>
                      {item.marginGain >= 0 ? `+${item.marginGain}%` : `${item.marginGain}%`}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '36px', height: '4px', backgroundColor: 'var(--bg-input)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${item.confidence}%`, height: '100%', backgroundColor: 'var(--color-ai)' }} />
                      </div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>{item.confidence}%</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button 
                        onClick={() => handleApplyAIPrice(item.id, item.suggestedPrice)}
                        className="btn btn-ai"
                        style={{ padding: '6px 12px', fontSize: '0.7rem' }}
                      >
                        Apply AI
                      </button>

                      {activeOverrideId === item.id ? (
                        <form onSubmit={(e) => handleOverrideSubmit(e, item.id)} style={{ display: 'flex', gap: '4px', zIndex: 10 }}>
                          <input
                            type="number"
                            placeholder="Price"
                            value={overridePrice}
                            onChange={e => setOverridePrice(e.target.value)}
                            className="input-field"
                            style={{ width: '70px', padding: '4px 6px', fontSize: '0.75rem', height: '28px' }}
                            required
                          />
                          <button type="submit" className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '0.7rem', height: '28px' }}>✓</button>
                        </form>
                      ) : (
                        <button
                          onClick={() => { setActiveOverrideId(item.id); setOverridePrice(item.sellingPrice); }}
                          className="btn btn-secondary"
                          style={{ padding: '6px 10px', fontSize: '0.7rem' }}
                        >
                          Override
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
