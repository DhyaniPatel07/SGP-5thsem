import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Filter, Trash2, Edit2, Download, 
  ChevronLeft, ChevronRight, Calculator, AlertTriangle, Sparkles
} from 'lucide-react';
import { calculateProductMetrics } from '../../data/mockData';

export default function TabProducts({ products, setProducts, suppliers, addToast }) {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterMarketplace, setFilterMarketplace] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // New Product Form State
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formCategory, setFormCategory] = useState('Electronics');
  const [formSupplierId, setFormSupplierId] = useState(suppliers[0]?.id || 'sup-1');
  const [formMarketplace, setFormMarketplace] = useState('Amazon');
  const [formCost, setFormCost] = useState(200);
  const [formPrice, setFormPrice] = useState(499);
  const [formFeesPercent, setFormFeesPercent] = useState(15);
  const [formShipping, setFormShipping] = useState(60);
  const [formInventory, setFormInventory] = useState(100);

  // Selection
  const [selectedIds, setSelectedIds] = useState([]);

  // Calculate live metrics inside the form as user inputs pricing
  const liveMetrics = useMemo(() => {
    return calculateProductMetrics(
      Number(formCost) || 0,
      Number(formPrice) || 0,
      Number(formFeesPercent) || 0,
      Number(formShipping) || 0
    );
  }, [formCost, formPrice, formFeesPercent, formShipping]);

  // Categories & Marketplaces lists
  const categories = useMemo(() => {
    return ['All', ...new Set(products.map(p => p.category))];
  }, [products]);

  const marketplaces = useMemo(() => {
    return ['All', ...new Set(products.map(p => p.marketplace))];
  }, [products]);

  // Filtered and Sorted list
  const processedProducts = useMemo(() => {
    let result = [...products];

    // Search query matching
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }

    // Category filter
    if (filterCategory !== 'All') {
      result = result.filter(p => p.category === filterCategory);
    }

    // Marketplace filter
    if (filterMarketplace !== 'All') {
      result = result.filter(p => p.marketplace === filterMarketplace);
    }

    // Status filter
    if (filterStatus !== 'All') {
      result = result.filter(p => p.status === filterStatus);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'sku') return a.sku.localeCompare(b.sku);
      if (sortBy === 'price-asc') return a.sellingPrice - b.sellingPrice;
      if (sortBy === 'price-desc') return b.sellingPrice - a.sellingPrice;
      if (sortBy === 'margin-desc') return b.expectedMargin - a.expectedMargin;
      if (sortBy === 'inventory-desc') return b.inventory - a.inventory;
      return 0;
    });

    return result;
  }, [products, search, filterCategory, filterMarketplace, filterStatus, sortBy]);

  // Pagination bounds
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedProducts.slice(start, start + itemsPerPage);
  }, [processedProducts, currentPage]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedProducts.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(rowId => rowId !== id));
    }
  };

  const handleAddOrEditProduct = (e) => {
    e.preventDefault();
    if (!formName || !formSku) return;

    const inventoryVal = Number(formInventory);
    const statusVal = inventoryVal === 0 ? 'Out of Stock' : inventoryVal <= 10 ? 'Low Stock' : 'Active';

    if (editingProduct) {
      // Edit mode
      setProducts(prev => prev.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: formName,
            sku: formSku,
            category: formCategory,
            supplierId: formSupplierId,
            marketplace: formMarketplace,
            supplierCost: Number(formCost),
            sellingPrice: Number(formPrice),
            marketplaceFees: liveMetrics.marketplaceFees,
            shippingCost: Number(formShipping),
            expectedProfit: liveMetrics.expectedProfit,
            expectedMargin: liveMetrics.expectedMargin,
            inventory: inventoryVal,
            status: statusVal
          };
        }
        return p;
      }));
      addToast('Product details updated successfully', 'success');
    } else {
      // Create mode
      const newProduct = {
        id: `prod-${products.length + 1}`,
        name: formName,
        sku: formSku,
        category: formCategory,
        supplierId: formSupplierId,
        marketplace: formMarketplace,
        supplierCost: Number(formCost),
        sellingPrice: Number(formPrice),
        marketplaceFees: liveMetrics.marketplaceFees,
        shippingCost: Number(formShipping),
        expectedProfit: liveMetrics.expectedProfit,
        expectedMargin: liveMetrics.expectedMargin,
        inventory: inventoryVal,
        status: statusVal,
        barcode: `890${Math.floor(100000000 + Math.random() * 900000000)}`,
        tags: [formCategory.toLowerCase(), 'new'],
        image: '📦',
        competitorPrice: Math.round(Number(formPrice) * 0.95),
        demandScore: 80,
        competitionScore: 40,
        growthTrend: 5.0,
        riskScore: 20,
        recommendationScore: 85
      };
      setProducts(prev => [newProduct, ...prev]);
      addToast('New product added to catalog', 'success');
    }

    // Reset Form
    resetForm();
  };

  const startEditProduct = (prod) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormSku(prod.sku);
    setFormCategory(prod.category);
    setFormSupplierId(prod.supplierId);
    setFormMarketplace(prod.marketplace);
    setFormCost(prod.supplierCost);
    setFormPrice(prod.sellingPrice);
    setFormShipping(prod.shippingCost);
    setFormInventory(prod.inventory);
    // Find fees percentage
    const feePerc = Math.round((prod.marketplaceFees / prod.sellingPrice) * 100) || 15;
    setFormFeesPercent(feePerc);
    
    setShowAddModal(true);
  };

  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast('Product deleted from catalog', 'warning');
  };

  const handleBulkDelete = () => {
    setProducts(prev => prev.filter(p => !selectedIds.includes(p.id)));
    setSelectedIds([]);
    addToast('Selected products deleted successfully', 'warning');
  };

  const resetForm = () => {
    setFormName('');
    setFormSku('');
    setFormCost(200);
    setFormPrice(499);
    setFormFeesPercent(15);
    setFormShipping(60);
    setFormInventory(100);
    setEditingProduct(null);
    setShowAddModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Title & Top Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="title-medium" style={{ fontWeight: 800 }}>Product Catalog</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Manage {products.length} products listed across your e-commerce channels.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setShowImportModal(true)} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
            <Download size={14} /> Import Products
          </button>
          <button onClick={() => { resetForm(); setShowAddModal(true); }} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
            <Plus size={14} /> Add Product
          </button>
        </div>
      </div>

      {/* Filters & Search Area */}
      <div className="card" style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '300px' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by Name or SKU..."
              className="input-field"
              style={{ paddingLeft: '32px', height: '36px' }}
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>

          {/* Category Filter */}
          <select 
            value={filterCategory} 
            onChange={e => { setFilterCategory(e.target.value); setCurrentPage(1); }} 
            className="input-field" 
            style={{ width: '150px', height: '36px' }}
          >
            {categories.map((c, i) => <option key={i} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Marketplace Filter */}
          <select
            value={filterMarketplace}
            onChange={e => { setFilterMarketplace(e.target.value); setCurrentPage(1); }}
            className="input-field"
            style={{ width: '140px', height: '36px' }}
          >
            <option value="All">All Channels</option>
            {marketplaces.map((m, i) => m !== 'All' && <option key={i} value={m}>{m}</option>)}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}
            className="input-field"
            style={{ width: '130px', height: '36px' }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          {/* Sort Filter */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="input-field"
            style={{ width: '150px', height: '36px' }}
          >
            <option value="name">Sort: Name (A-Z)</option>
            <option value="sku">Sort: SKU</option>
            <option value="price-asc">Sort: Price (Low-High)</option>
            <option value="price-desc">Sort: Price (High-Low)</option>
            <option value="margin-desc">Sort: Highest Margin</option>
            <option value="inventory-desc">Sort: Highest Stock</option>
          </select>
        </div>
      </div>

      {/* Bulk action buttons */}
      {selectedIds.length > 0 && (
        <div style={{
          display: 'flex', gap: '12px', alignItems: 'center', padding: '10px 16px',
          backgroundColor: 'var(--color-error-light)', borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(239, 68, 68, 0.2)', animation: 'fadeIn 0.2s'
        }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-error)' }}>
            {selectedIds.length} products selected
          </span>
          <button onClick={handleBulkDelete} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
            <Trash2 size={12} /> Bulk Delete
          </button>
        </div>
      )}

      {/* Products Table */}
      <div className="table-container animate-fade">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '40px', padding: '12px 20px' }}>
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll} 
                  checked={paginatedProducts.length > 0 && selectedIds.length === paginatedProducts.length} 
                />
              </th>
              <th>Product Details</th>
              <th>SKU / Code</th>
              <th>Category</th>
              <th>Channel</th>
              <th>Cost / Retail</th>
              <th>Expected Margin</th>
              <th>Stock Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((prod) => (
                <tr key={prod.id}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(prod.id)} 
                      onChange={e => handleSelectRow(prod.id, e.target.checked)} 
                    />
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.25rem' }}>{prod.image}</span>
                      <div>
                        <div style={{ fontWeight: 600 }}>{prod.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Barcode: {prod.barcode}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontWeight: 500 }}>{prod.sku}</td>
                  <td>
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'var(--bg-card-hover)' }}>
                      {prod.category}
                    </span>
                  </td>
                  <td>
                    <span style={{
                      fontSize: '0.75rem', fontWeight: 600,
                      color: prod.marketplace === 'Amazon' ? '#ff9900' : prod.marketplace === 'Flipkart' ? '#2874f0' : prod.marketplace === 'ONDC' ? '#00b050' : '#ff007f'
                    }}>
                      {prod.marketplace}
                    </span>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cost: ₹{prod.supplierCost}</div>
                      <div style={{ fontWeight: 700 }}>Retail: ₹{prod.sellingPrice}</div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontWeight: 700, color: prod.expectedProfit > 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
                        ₹{prod.expectedProfit}
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Margin: {prod.expectedMargin}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${prod.status === 'Active' ? 'badge-success' : prod.status === 'Low Stock' ? 'badge-warning' : 'badge-error'}`}>
                      {prod.status === 'Low Stock' && <AlertTriangle size={10} />}
                      {prod.status} ({prod.inventory})
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => startEditProduct(prod)} className="theme-toggle-btn" title="Edit Product">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDeleteProduct(prod.id)} className="theme-toggle-btn" style={{ color: 'var(--color-error)' }} title="Delete Product">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                  No products matched the active filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Showing page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({processedProducts.length} items total)
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
            className="btn btn-secondary" 
            style={{ padding: '6px 12px', fontSize: '0.75rem', opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
          >
            <ChevronLeft size={14} /> Prev
          </button>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages}
            className="btn btn-secondary" 
            style={{ padding: '6px 12px', fontSize: '0.75rem', opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1200,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px',
            padding: '30px', width: '90%', maxWidth: '560px', boxShadow: 'var(--shadow-lg)', maxHeight: '90vh', overflowY: 'auto'
          }} className="animate-fade">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calculator size={18} style={{ color: 'var(--color-primary)' }} />
              {editingProduct ? 'Modify Listing details' : 'Add New Product to Catalog'}
            </h3>

            <form onSubmit={handleAddOrEditProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Product Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Wireless ANC Pro Headset" 
                  value={formName} 
                  onChange={e => setFormName(e.target.value)} 
                  className="input-field" 
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>SKU Code</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ELE-HDP-01" 
                    value={formSku} 
                    onChange={e => setFormSku(e.target.value)} 
                    className="input-field" 
                    required 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Initial Stock Qty</label>
                  <input 
                    type="number" 
                    value={formInventory} 
                    onChange={e => setFormInventory(Number(e.target.value))} 
                    className="input-field" 
                    required 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Category</label>
                  <select value={formCategory} onChange={e => setFormCategory(e.target.value)} className="input-field">
                    <option value="Electronics">Electronics</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Beauty">Beauty</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Channel</label>
                  <select value={formMarketplace} onChange={e => setFormMarketplace(e.target.value)} className="input-field">
                    <option value="Amazon">Amazon</option>
                    <option value="Flipkart">Flipkart</option>
                    <option value="ONDC">ONDC</option>
                    <option value="Meesho">Meesho</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Logistics Supplier</label>
                  <select value={formSupplierId} onChange={e => setFormSupplierId(e.target.value)} className="input-field">
                    {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              {/* Pricing breakdown section with calculators */}
              <div style={{ backgroundColor: 'var(--bg-app)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '12px' }}>
                  Expected Margin Calculator (Live)
                </span>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Supplier Wholesale Cost (₹)</label>
                    <input 
                      type="number" 
                      value={formCost} 
                      onChange={e => setFormCost(Number(e.target.value))} 
                      className="input-field" 
                      style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Retail Selling Price (₹)</label>
                    <input 
                      type="number" 
                      value={formPrice} 
                      onChange={e => setFormPrice(Number(e.target.value))} 
                      className="input-field" 
                      style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Marketplace Comm Fees (%)</label>
                    <input 
                      type="number" 
                      value={formFeesPercent} 
                      onChange={e => setFormFeesPercent(Number(e.target.value))} 
                      className="input-field" 
                      style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Shipping Label Cost (₹)</label>
                    <input 
                      type="number" 
                      value={formShipping} 
                      onChange={e => setFormShipping(Number(e.target.value))} 
                      className="input-field" 
                      style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '10px', fontSize: '0.75rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Marketplace Fees:</span>
                    <strong style={{ marginLeft: '4px' }}>₹{liveMetrics.marketplaceFees}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Expected Profit:</span>
                    <strong style={{ marginLeft: '4px', color: liveMetrics.expectedProfit > 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
                      ₹{liveMetrics.expectedProfit}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Net Margin:</span>
                    <strong style={{ marginLeft: '4px', color: liveMetrics.expectedMargin > 20 ? 'var(--color-success)' : 'var(--text-main)' }}>
                      {liveMetrics.expectedMargin}%
                    </strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={resetForm} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {editingProduct ? 'Update Listing' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Catalog Mock Modal */}
      {showImportModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1200,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px',
            padding: '30px', width: '90%', maxWidth: '480px', boxShadow: 'var(--shadow-lg)', textAlign: 'center'
          }} className="animate-fade">
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Sparkles size={24} />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Bulk Import Products</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '24px' }}>
              Upload your inventory catalog CSV/Excel sheet or sync directly from linked Amazon/Flipkart supplier systems.
            </p>

            <div style={{
              border: '2px dashed var(--border-color)', padding: '30px', borderRadius: '10px',
              backgroundColor: 'var(--bg-app)', cursor: 'pointer', transition: 'all var(--transition-fast)',
              marginBottom: '20px'
            }} onMouseOver={e => e.target.style.borderColor = 'var(--color-primary)'} onMouseOut={e => e.target.style.borderColor = 'var(--border-color)'}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                Drag and drop your listing file here
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                Supports .CSV, .XLS, .XLSX (Max size 10MB)
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowImportModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
              <button 
                onClick={() => { setShowImportModal(false); addToast('Catalog file uploaded. 12 new items imported.', 'success'); }} 
                className="btn btn-primary" 
                style={{ flex: 1 }}
              >
                Upload File
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
