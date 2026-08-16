import React, { useState, useMemo } from 'react';
import { 
  Sparkles, TrendingUp, ShieldAlert, ArrowRight, Eye, 
  EyeOff, Plus, Check, Star, RefreshCw 
} from 'lucide-react';
import { INITIAL_AI_RECOMMENDATIONS } from '../../data/mockData';

export default function TabAIProductDiscovery({ products, setProducts, addToast }) {
  const [recommendations, setRecommendations] = useState(INITIAL_AI_RECOMMENDATIONS);
  const [watchlist, setWatchlist] = useState([]);
  const [ignoredIds, setIgnoredIds] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');

  const visibleRecommendations = useMemo(() => {
    return recommendations
      .filter(r => !ignoredIds.includes(r.id))
      .filter(r => filterCategory === 'All' || r.category === filterCategory);
  }, [recommendations, ignoredIds, filterCategory]);

  const handleImportProduct = (rec) => {
    // Check if SKU already exists
    const sku = `${rec.category.substring(0, 3).toUpperCase()}-IMP-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Auto calculate fees
    const fees = Math.round(rec.suggestedPrice * (rec.feesPercent / 100));
    
    const newProduct = {
      id: `prod-imp-${Date.now()}`,
      name: rec.name,
      sku,
      category: rec.category,
      supplierId: rec.supplierId || 'sup-1',
      marketplace: 'Amazon',
      supplierCost: rec.supplierCost,
      sellingPrice: rec.suggestedPrice,
      marketplaceFees: fees,
      shippingCost: rec.shippingCost,
      expectedProfit: rec.suggestedPrice - rec.supplierCost - fees - rec.shippingCost,
      expectedMargin: rec.expectedMargin,
      inventory: 80, // initial stock
      status: 'Active',
      barcode: `890${Math.floor(100000000 + Math.random() * 900000000)}`,
      tags: [rec.category.toLowerCase(), 'imported-ai'],
      image: rec.image,
      competitorPrice: Math.round(rec.suggestedPrice * 1.05),
      demandScore: rec.demandScore,
      competitionScore: rec.competitionScore,
      growthTrend: rec.growthTrend,
      riskScore: rec.riskScore,
      recommendationScore: rec.recommendationScore
    };

    setProducts(prev => [newProduct, ...prev]);
    setIgnoredIds(prev => [...prev, rec.id]); // hide once imported
    addToast(`"${rec.name}" imported to your active listings!`, 'success');
  };

  const handleToggleWatchlist = (id) => {
    if (watchlist.includes(id)) {
      setWatchlist(prev => prev.filter(wId => wId !== id));
      addToast('Removed from Watchlist', 'info');
    } else {
      setWatchlist(prev => [...prev, id]);
      addToast('Added to Watchlist', 'success');
    }
  };

  const handleIgnore = (id) => {
    setIgnoredIds(prev => [...prev, id]);
    addToast('Recommendation hidden', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade">
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="title-medium" style={{ fontWeight: 800 }}>AI Product Discovery</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Mine social networks and wholesale listings to import trending dropshipping products.
          </p>
        </div>
        
        {/* Category filtering tab */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Electronics', 'Kitchen', 'Fitness', 'Beauty'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className="btn btn-secondary"
              style={{
                padding: '6px 12px', fontSize: '0.75rem',
                backgroundColor: filterCategory === cat ? 'var(--color-primary-light)' : 'transparent',
                borderColor: filterCategory === cat ? 'var(--color-primary)' : 'var(--border-color)',
                color: filterCategory === cat ? 'var(--color-primary)' : 'var(--text-muted)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of discovered products cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {visibleRecommendations.length > 0 ? (
          visibleRecommendations.map(rec => {
            const isWatched = watchlist.includes(rec.id);
            return (
              <div key={rec.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Visual Image Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ fontSize: '2.5rem', backgroundColor: 'var(--bg-app)', padding: '10px', borderRadius: '12px' }}>
                      {rec.image}
                    </span>
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{rec.name}</h3>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Search Volume: {rec.searchVolume}</span>
                    </div>
                  </div>

                  <span className="badge badge-ai" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                    AI Score: {rec.recommendationScore}
                  </span>
                </div>

                {/* Growth trend tags */}
                <div style={{ display: 'flex', gap: '8px', fontSize: '0.7rem', flexWrap: 'wrap' }}>
                  <span style={{ backgroundColor: 'var(--color-success-light)', color: 'var(--color-success)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    ↑ {rec.growthTrend}% Growth Trend
                  </span>
                  <span style={{ backgroundColor: 'var(--bg-card-hover)', color: 'var(--text-muted)', padding: '2px 8px', borderRadius: '4px', fontWeight: 500 }}>
                    MOQ: {rec.supplierCost} / unit cost
                  </span>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  {rec.summary}
                </p>

                {/* Score Indicators Grid */}
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px',
                  backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)',
                  padding: '12px', borderRadius: '10px', fontSize: '0.75rem'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Demand Index:</span>
                    <strong style={{ float: 'right', color: 'var(--color-success)' }}>{rec.demandScore}%</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Competition Index:</span>
                    <strong style={{ float: 'right', color: rec.competitionScore > 50 ? 'var(--color-warning)' : 'var(--color-success)' }}>
                      {rec.competitionScore}%
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>AI Risk Score:</span>
                    <strong style={{ float: 'right', color: rec.riskScore > 30 ? 'var(--color-warning)' : 'var(--color-success)' }}>
                      {rec.riskScore}%
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Suggested Price:</span>
                    <strong style={{ float: 'right' }}>₹{rec.suggestedPrice}</strong>
                  </div>
                </div>

                {/* Profit Margin estimation */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 14px', backgroundColor: 'var(--color-success-light)', borderRadius: '8px',
                  border: '1px solid rgba(16, 185, 129, 0.15)', fontSize: '0.8rem'
                }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>Expected Profit Margin:</span>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--color-success)' }}>
                    ₹{rec.suggestedPrice - rec.supplierCost - rec.shippingCost - Math.round(rec.suggestedPrice * (rec.feesPercent/100))} ({rec.expectedMargin}%)
                  </strong>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                  <button 
                    onClick={() => handleImportProduct(rec)}
                    className="btn btn-primary" 
                    style={{ flex: 1.5, fontSize: '0.75rem' }}
                  >
                    <Plus size={14} /> Import to Store
                  </button>
                  <button 
                    onClick={() => handleToggleWatchlist(rec.id)}
                    className="btn btn-secondary" 
                    style={{ flex: 1, fontSize: '0.75rem', borderColor: isWatched ? 'var(--color-primary)' : 'var(--border-color)', color: isWatched ? 'var(--color-primary)' : 'var(--text-main)' }}
                  >
                    {isWatched ? 'Watching' : 'Watchlist'}
                  </button>
                  <button 
                    onClick={() => handleIgnore(rec.id)}
                    className="btn btn-secondary" 
                    style={{ padding: '8px 10px' }}
                    title="Ignore"
                  >
                    <EyeOff size={14} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="card" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px' }}>All caught up!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Check back later. Our AI bot searches logs twice daily for new dropship recommendations.</p>
          </div>
        )}
      </div>

    </div>
  );
}
