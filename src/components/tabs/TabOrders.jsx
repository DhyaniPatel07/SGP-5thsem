import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Trash2, ShieldCheck, Truck, XCircle, 
  ChevronLeft, ChevronRight, Download, RefreshCw, CheckCircle2,
  AlertCircle, DollarSign
} from 'lucide-react';

export default function TabOrders({ orders, setOrders, addToast }) {
  const [search, setSearch] = useState('');
  const [filterMarketplace, setFilterMarketplace] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Process filters
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(o => 
        o.id.toLowerCase().includes(q) || 
        o.customerName.toLowerCase().includes(q) ||
        o.productName.toLowerCase().includes(q)
      );
    }

    if (filterMarketplace !== 'All') {
      result = result.filter(o => o.marketplace === filterMarketplace);
    }

    if (filterStatus !== 'All') {
      result = result.filter(o => o.status === filterStatus);
    }

    // Sort by Date descending (newest first)
    result.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

    return result;
  }, [orders, search, filterMarketplace, filterStatus]);

  // Page limits
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedOrders.map(o => o.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(orderId => orderId !== id));
    }
  };

  // Bulk operations
  const handleBulkShip = () => {
    setOrders(prev => prev.map(o => {
      if (selectedIds.includes(o.id) && o.status === 'Pending') {
        return {
          ...o,
          status: 'Shipped',
          trackingNumber: `TRK${8900000000 + Math.floor(Math.random() * 1000000)}`
        };
      }
      return o;
    }));
    setSelectedIds([]);
    addToast('Selected pending orders marked as Shipped', 'success');
  };

  const handleBulkCancel = () => {
    setOrders(prev => prev.map(o => {
      if (selectedIds.includes(o.id) && (o.status === 'Pending' || o.status === 'Shipped')) {
        return {
          ...o,
          status: 'Cancelled',
          paymentStatus: 'Refunded'
        };
      }
      return o;
    }));
    setSelectedIds([]);
    addToast('Selected orders marked as Cancelled & Refunded', 'warning');
  };

  const handleSyncOrders = () => {
    addToast('Contacting Amazon & Flipkart API endpoints...', 'info');
    setTimeout(() => {
      // Create 2 simulated new orders
      const newOrders = [
        {
          id: `ORD-${10000 + orders.length + 1}`,
          marketplace: 'Amazon',
          customerName: 'Kriti Deshmukh',
          productName: 'Apex Pro Wireless ANC Headphones',
          productSku: 'ELE-1000-1',
          qty: 1,
          orderValue: 3999,
          cost: 2100,
          profit: 1899,
          status: 'Pending',
          paymentStatus: 'Paid',
          trackingNumber: '',
          orderDate: new Date().toISOString(),
          deliveryDate: null,
          supplierId: 'sup-1'
        },
        {
          id: `ORD-${10000 + orders.length + 2}`,
          marketplace: 'Flipkart',
          customerName: 'Rohan Deshpande',
          productName: 'Zenith Digital Touch Air Fryer 4.5L',
          productSku: 'KIT-1002-3',
          qty: 1,
          orderValue: 4499,
          cost: 1930,
          profit: 2569,
          status: 'Pending',
          paymentStatus: 'Paid',
          trackingNumber: '',
          orderDate: new Date().toISOString(),
          deliveryDate: null,
          supplierId: 'sup-3'
        }
      ];
      setOrders(prev => [...newOrders, ...prev]);
      addToast('Import completed: 2 new orders detected', 'success');
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="title-medium" style={{ fontWeight: 800 }}>Order Processing</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Fulfill and track customer sales orders across all active marketplaces.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleSyncOrders} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
            <RefreshCw size={14} /> Fetch API Orders
          </button>
        </div>
      </div>

      {/* Control Filters panel */}
      <div className="card" style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '300px' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by Order ID, Customer Name, or Product..."
              className="input-field"
              style={{ paddingLeft: '32px', height: '36px' }}
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Marketplace Filter */}
          <select
            value={filterMarketplace}
            onChange={e => { setFilterMarketplace(e.target.value); setCurrentPage(1); }}
            className="input-field"
            style={{ width: '150px', height: '36px' }}
          >
            <option value="All">All Channels</option>
            <option value="Amazon">Amazon</option>
            <option value="Flipkart">Flipkart</option>
            <option value="ONDC">ONDC</option>
            <option value="Meesho">Meesho</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}
            className="input-field"
            style={{ width: '150px', height: '36px' }}
          >
            <option value="All">All Statuses</option>
            <option value="Delivered">Delivered</option>
            <option value="Shipped">Shipped</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bulk action buttons */}
      {selectedIds.length > 0 && (
        <div style={{
          display: 'flex', gap: '12px', alignItems: 'center', padding: '10px 16px',
          backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-primary)', animation: 'fadeIn 0.2s'
        }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)' }}>
            {selectedIds.length} orders selected
          </span>
          <button onClick={handleBulkShip} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Truck size={12} /> Ship Selected (Pending Only)
          </button>
          <button onClick={handleBulkCancel} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <XCircle size={12} /> Cancel Selected
          </button>
        </div>
      )}

      {/* Orders Table list */}
      <div className="table-container animate-fade">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '40px', padding: '12px 20px' }}>
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll} 
                  checked={paginatedOrders.length > 0 && selectedIds.length === paginatedOrders.length} 
                />
              </th>
              <th>Order ID</th>
              <th>Channel</th>
              <th>Customer</th>
              <th>Product Purchased</th>
              <th>Net Pricing</th>
              <th>Expected Profit</th>
              <th>Fulfillment Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map(o => (
                <tr key={o.id}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(o.id)} 
                      onChange={e => handleSelectRow(o.id, e.target.checked)} 
                    />
                  </td>
                  <td style={{ fontWeight: 700, fontFamily: 'monospace' }}>{o.id}</td>
                  <td>
                    <span style={{
                      fontSize: '0.75rem', fontWeight: 600,
                      color: o.marketplace === 'Amazon' ? '#ff9900' : o.marketplace === 'Flipkart' ? '#2874f0' : o.marketplace === 'ONDC' ? '#00b050' : '#ff007f'
                    }}>
                      {o.marketplace}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{o.customerName}</div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {o.trackingNumber ? `TRK: ${o.trackingNumber}` : 'No tracking log'}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500, fontSize: '0.8rem' }}>{o.productName}</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SKU: {o.productSku} (Qty: {o.qty})</span>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cost: ₹{o.cost}</div>
                      <div style={{ fontWeight: 700 }}>Retail: ₹{o.orderValue}</div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: o.profit > 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
                      ₹{o.profit}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${o.status === 'Delivered' ? 'badge-success' : o.status === 'Shipped' ? 'badge-info' : o.status === 'Pending' ? 'badge-warning' : 'badge-error'}`}>
                      {o.status}
                    </span>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Pay: {o.paymentStatus}
                    </div>
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {new Date(o.orderDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                  No orders matched active filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Showing page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({filteredOrders.length} orders total)
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

    </div>
  );
}
