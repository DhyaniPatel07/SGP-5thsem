import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Grid, List, Map, Phone, Mail, Globe, 
  MapPin, ShieldAlert, Star, ExternalLink, Calendar, Truck,
  Settings, CheckCircle2, Trash2, Edit2
} from 'lucide-react';

export default function TabSuppliers({ suppliers, setSuppliers, addToast }) {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table' | 'map'
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formGst, setFormGst] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formWebsite, setFormWebsite] = useState('');
  const [formCategory, setFormCategory] = useState('Electronics');
  const [formMOQ, setFormMOQ] = useState(50);
  const [formDeliveryTime, setFormDeliveryTime] = useState(4);
  const [formPaymentTerms, setFormPaymentTerms] = useState('Net 30');
  const [formShippingPartner, setFormShippingPartner] = useState('BlueDart');
  const [formApi, setFormApi] = useState('');
  const [formWebhook, setFormWebhook] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formAddress, setFormAddress] = useState('');

  // Extract unique categories across all suppliers
  const categoriesList = useMemo(() => {
    const set = new Set();
    suppliers.forEach(s => {
      if (Array.isArray(s.categories)) {
        s.categories.forEach(c => set.add(c));
      }
    });
    return ['All', ...set];
  }, [suppliers]);

  // Filtered suppliers
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(sup => {
      const matchesSearch = 
        sup.name.toLowerCase().includes(search.toLowerCase()) ||
        sup.company.toLowerCase().includes(search.toLowerCase()) ||
        sup.contactPerson.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = 
        filterCategory === 'All' ||
        (Array.isArray(sup.categories) && sup.categories.includes(filterCategory));
      
      return matchesSearch && matchesCategory;
    });
  }, [suppliers, search, filterCategory]);

  const handleAddOrEditSupplier = (e) => {
    e.preventDefault();
    if (!formName || !formCompany || !formContact) return;

    if (editingSupplier) {
      // Edit
      setSuppliers(prev => prev.map(s => {
        if (s.id === editingSupplier.id) {
          return {
            ...s,
            name: formName,
            company: formCompany,
            gst: formGst,
            contactPerson: formContact,
            phone: formPhone,
            email: formEmail,
            website: formWebsite,
            categories: [formCategory],
            moq: Number(formMOQ),
            avgDeliveryTime: Number(formDeliveryTime),
            paymentTerms: formPaymentTerms,
            shippingPartner: formShippingPartner,
            apiEndpoint: formApi,
            webhookUrl: formWebhook,
            notes: formNotes,
            address: formAddress
          };
        }
        return s;
      }));
      addToast('Supplier records updated', 'success');
    } else {
      // Create
      const newSupplier = {
        id: `sup-${suppliers.length + 1}`,
        name: formName,
        company: formCompany,
        gst: formGst,
        contactPerson: formContact,
        phone: formPhone,
        email: formEmail,
        website: formWebsite,
        categories: [formCategory],
        moq: Number(formMOQ),
        avgDeliveryTime: Number(formDeliveryTime),
        rating: 4.5,
        paymentTerms: formPaymentTerms,
        shippingPartner: formShippingPartner,
        apiEndpoint: formApi,
        webhookUrl: formWebhook,
        notes: formNotes,
        address: formAddress
      };
      setSuppliers(prev => [newSupplier, ...prev]);
      addToast('New supplier onboarded successfully', 'success');
    }

    resetForm();
  };

  const startEditSupplier = (sup) => {
    setEditingSupplier(sup);
    setFormName(sup.name);
    setFormCompany(sup.company);
    setFormGst(sup.gst || '');
    setFormContact(sup.contactPerson);
    setFormPhone(sup.phone || '');
    setFormEmail(sup.email || '');
    setFormWebsite(sup.website || '');
    setFormCategory(sup.categories?.[0] || 'Electronics');
    setFormMOQ(sup.moq || 50);
    setFormDeliveryTime(sup.avgDeliveryTime || 4);
    setFormPaymentTerms(sup.paymentTerms || 'Net 30');
    setFormShippingPartner(sup.shippingPartner || 'BlueDart');
    setFormApi(sup.apiEndpoint || '');
    setFormWebhook(sup.webhookUrl || '');
    setFormNotes(sup.notes || '');
    setFormAddress(sup.address || '');

    setShowAddModal(true);
  };

  const handleDeleteSupplier = (id) => {
    setSuppliers(prev => prev.filter(s => s.id !== id));
    addToast('Supplier removed from platform database', 'warning');
  };

  const resetForm = () => {
    setFormName('');
    setFormCompany('');
    setFormGst('');
    setFormContact('');
    setFormPhone('');
    setFormEmail('');
    setFormWebsite('');
    setFormCategory('Electronics');
    setFormMOQ(50);
    setFormDeliveryTime(4);
    setFormPaymentTerms('Net 30');
    setFormShippingPartner('BlueDart');
    setFormApi('');
    setFormWebhook('');
    setFormNotes('');
    setFormAddress('');
    setEditingSupplier(null);
    setShowAddModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Title & Top action buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="title-medium" style={{ fontWeight: 800 }}>Supplier Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Coordinate logistics networks, API integrations, and fulfillment pipelines.
          </p>
        </div>
        <button onClick={() => { resetForm(); setShowAddModal(true); }} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
          <Plus size={14} /> Add Supplier
        </button>
      </div>

      {/* Control Filter Panel */}
      <div className="card" style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '300px' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by supplier name, company, or contact..."
              className="input-field"
              style={{ paddingLeft: '32px', height: '36px' }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <select 
            value={filterCategory} 
            onChange={e => setFilterCategory(e.target.value)} 
            className="input-field" 
            style={{ width: '150px', height: '36px' }}
          >
            {categoriesList.map((c, i) => <option key={i} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
          </select>
        </div>

        {/* View Mode Toggles */}
        <div style={{ display: 'flex', backgroundColor: 'var(--bg-app)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button 
            onClick={() => setViewMode('cards')} 
            className="theme-toggle-btn"
            style={{ backgroundColor: viewMode === 'cards' ? 'var(--bg-card)' : 'transparent', borderRadius: '6px', width: '32px', height: '32px' }}
            title="Card Grid View"
          >
            <Grid size={16} style={{ color: viewMode === 'cards' ? 'var(--color-primary)' : 'var(--text-muted)' }} />
          </button>
          <button 
            onClick={() => setViewMode('table')} 
            className="theme-toggle-btn"
            style={{ backgroundColor: viewMode === 'table' ? 'var(--bg-card)' : 'transparent', borderRadius: '6px', width: '32px', height: '32px' }}
            title="List Table View"
          >
            <List size={16} style={{ color: viewMode === 'table' ? 'var(--color-primary)' : 'var(--text-muted)' }} />
          </button>
          <button 
            onClick={() => setViewMode('map')} 
            className="theme-toggle-btn"
            style={{ backgroundColor: viewMode === 'map' ? 'var(--bg-card)' : 'transparent', borderRadius: '6px', width: '32px', height: '32px' }}
            title="Logistics Map View"
          >
            <Map size={16} style={{ color: viewMode === 'map' ? 'var(--color-primary)' : 'var(--text-muted)' }} />
          </button>
        </div>
      </div>

      {/* Render Active View */}
      
      {/* 1. Card Grid View */}
      {viewMode === 'cards' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }} className="animate-fade">
          {filteredSuppliers.length > 0 ? (
            filteredSuppliers.map(sup => (
              <div key={sup.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }} className="title-small">{sup.name}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sup.company}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', backgroundColor: 'var(--color-warning-light)', color: 'var(--color-warning)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                    <Star size={10} fill="currentColor" /> {sup.rating}
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {sup.categories.map((c, i) => (
                    <span key={i} style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', fontWeight: 600 }}>
                      {c}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '12px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Contact:</span>
                    <strong style={{ color: 'var(--text-main)' }}>{sup.contactPerson}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>MOQ:</span>
                    <strong>{sup.moq} units</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Delivery time:</span>
                    <strong>{sup.avgDeliveryTime} days</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Terms / Partner:</span>
                    <strong>{sup.paymentTerms} • {sup.shippingPartner}</strong>
                  </div>
                </div>

                {sup.notes && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.3 }}>
                    "{sup.notes}"
                  </p>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {sup.email && <a href={`mailto:${sup.email}`} style={{ color: 'var(--text-muted)' }} title={sup.email}><Mail size={16} /></a>}
                    {sup.phone && <a href={`tel:${sup.phone}`} style={{ color: 'var(--text-muted)' }} title={sup.phone}><Phone size={16} /></a>}
                    {sup.website && <a href={sup.website} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }}><Globe size={16} /></a>}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={() => startEditSupplier(sup)} className="theme-toggle-btn" style={{ width: '28px', height: '28px' }} title="Edit"><Edit2 size={12} /></button>
                    <button onClick={() => handleDeleteSupplier(sup.id)} className="theme-toggle-btn" style={{ color: 'var(--color-error)', width: '28px', height: '28px' }} title="Delete"><Trash2 size={12} /></button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
              No suppliers match active filters.
            </div>
          )}
        </div>
      )}

      {/* 2. Table View */}
      {viewMode === 'table' && (
        <div className="table-container animate-fade">
          <table className="data-table">
            <thead>
              <tr>
                <th>Supplier / Company</th>
                <th>GSTIN</th>
                <th>Category Focus</th>
                <th>Contact</th>
                <th>MOQ Limit</th>
                <th>Delivery speed</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map(sup => (
                  <tr key={sup.id}>
                    <td>
                      <div>
                        <div style={{ fontWeight: 600 }}>{sup.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{sup.company}</div>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{sup.gst || 'N/A'}</td>
                    <td>
                      <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', fontWeight: 600 }}>
                        {sup.categories.join(', ')}
                      </span>
                    </td>
                    <td>
                      <div>
                        <div style={{ fontWeight: 500 }}>{sup.contactPerson}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{sup.phone}</div>
                      </div>
                    </td>
                    <td><strong>{sup.moq} units</strong></td>
                    <td><strong>{sup.avgDeliveryTime} days</strong></td>
                    <td>
                      <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
                        <Star size={10} fill="currentColor" /> {sup.rating}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => startEditSupplier(sup)} className="theme-toggle-btn" title="Edit"><Edit2 size={12} /></button>
                        <button onClick={() => handleDeleteSupplier(sup.id)} className="theme-toggle-btn" style={{ color: 'var(--color-error)' }} title="Delete"><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                    No suppliers found matching active filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. Map View */}
      {viewMode === 'map' && (
        <div className="card animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }} className="title-small">Global E-commerce Logistics Map</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Distribution hubs and supplier warehouse locations</span>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '360px', borderRadius: '10px', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            {/* Draw a simulated map using SVG lines/nodes */}
            <svg viewBox="0 0 800 360" style={{ width: '100%', height: '100%' }}>
              {/* Map background grids representing logistics routes */}
              <circle cx="150" cy="180" r="100" fill="none" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="5 5" />
              <circle cx="450" cy="140" r="80" fill="none" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="5 5" />
              <circle cx="650" cy="220" r="90" fill="none" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="5 5" />
              
              {/* Connection logistics routes */}
              <path d="M 120 120 Q 300 100, 480 180" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.3" strokeDasharray="4 4" />
              <path d="M 480 180 Q 580 120, 680 160" fill="none" stroke="var(--color-ai)" strokeWidth="1.5" opacity="0.3" strokeDasharray="4 4" />
              <path d="M 120 120 Q 400 240, 680 160" fill="none" stroke="var(--color-success)" strokeWidth="1" opacity="0.2" />

              {/* Warehouse Pinpoints */}
              <g transform="translate(120, 120)">
                <circle cx="0" cy="0" r="12" fill="var(--color-primary-light)" />
                <circle cx="0" cy="0" r="6" fill="var(--color-primary)" className="animate-float" />
                <text x="16" y="4" fontSize="10" fontWeight="700" fill="var(--text-main)">Noida Logistics Hub</text>
              </g>

              <g transform="translate(480, 180)">
                <circle cx="0" cy="0" r="12" fill="var(--color-ai-light)" />
                <circle cx="0" cy="0" r="6" fill="var(--color-ai)" />
                <text x="16" y="4" fontSize="10" fontWeight="700" fill="var(--text-main)">Surat Textile Center</text>
              </g>

              <g transform="translate(680, 160)">
                <circle cx="0" cy="0" r="12" fill="var(--color-success-light)" />
                <circle cx="0" cy="0" r="6" fill="var(--color-success)" />
                <text x="-120" y="4" fontSize="10" fontWeight="700" fill="var(--text-main)">Bangalore Tech Depot</text>
              </g>
              
              <g transform="translate(300, 245)">
                <circle cx="0" cy="0" r="10" fill="var(--color-warning-light)" />
                <circle cx="0" cy="0" r="5" fill="var(--color-warning)" />
                <text x="14" y="4" fontSize="10" fontWeight="700" fill="var(--text-main)">Mumbai Transit Yard</text>
              </g>
            </svg>

            {/* Hover details box */}
            <div style={{
              position: 'absolute', bottom: '16px', left: '16px', backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)', padding: '10px 14px', borderRadius: '6px', fontSize: '0.75rem',
              boxShadow: 'var(--shadow-md)', maxWidth: '280px'
            }}>
              <strong>Route Status: Healthy</strong>
              <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>All primary ports in Mumbai, Surat, and Noida reporting average transit delays under 12h. Integrated BlueDart API responding.</div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Supplier Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1200,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px',
            padding: '30px', width: '90%', maxWidth: '580px', boxShadow: 'var(--shadow-lg)', maxHeight: '90vh', overflowY: 'auto'
          }} className="animate-fade">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={18} style={{ color: 'var(--color-primary)' }} />
              {editingSupplier ? 'Modify Supplier Profile' : 'Onboard New Supplier'}
            </h3>

            <form onSubmit={handleAddOrEditSupplier} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Supplier / Agency Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Apex Electronics Corp" 
                    value={formName} 
                    onChange={e => setFormName(e.target.value)} 
                    className="input-field" 
                    required 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Registered Company Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Apex Electronics India Pvt Ltd" 
                    value={formCompany} 
                    onChange={e => setFormCompany(e.target.value)} 
                    className="input-field" 
                    required 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>GSTIN Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 27AAACA1234A1Z1" 
                    value={formGst} 
                    onChange={e => setFormGst(e.target.value)} 
                    className="input-field" 
                    style={{ textTransform: 'uppercase' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Contact Person</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Rajesh Kumar" 
                    value={formContact} 
                    onChange={e => setFormContact(e.target.value)} 
                    className="input-field" 
                    required 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Phone</label>
                  <input 
                    type="tel" 
                    placeholder="+91..." 
                    value={formPhone} 
                    onChange={e => setFormPhone(e.target.value)} 
                    className="input-field" 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Email</label>
                  <input 
                    type="email" 
                    placeholder="contact@..." 
                    value={formEmail} 
                    onChange={e => setFormEmail(e.target.value)} 
                    className="input-field" 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Website</label>
                  <input 
                    type="text" 
                    placeholder="https://..." 
                    value={formWebsite} 
                    onChange={e => setFormWebsite(e.target.value)} 
                    className="input-field" 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
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
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>MOQ</label>
                  <input 
                    type="number" 
                    value={formMOQ} 
                    onChange={e => setFormMOQ(Number(e.target.value))} 
                    className="input-field" 
                    required 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Delivery Speed (Days)</label>
                  <input 
                    type="number" 
                    value={formDeliveryTime} 
                    onChange={e => setFormDeliveryTime(Number(e.target.value))} 
                    className="input-field" 
                    required 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Terms</label>
                  <select value={formPaymentTerms} onChange={e => setFormPaymentTerms(e.target.value)} className="input-field">
                    <option value="Net 30">Net 30</option>
                    <option value="Net 15">Net 15</option>
                    <option value="Prepaid">Prepaid</option>
                    <option value="P.O.D">Cash on Delivery</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Courier Partner</label>
                  <select value={formShippingPartner} onChange={e => setFormShippingPartner(e.target.value)} className="input-field">
                    <option value="BlueDart">BlueDart</option>
                    <option value="Delhivery">Delhivery</option>
                    <option value="SafeExpress">SafeExpress</option>
                    <option value="Local Courier">Local Courier</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Supplier API Endpoint</label>
                  <input 
                    type="text" 
                    placeholder="https://api..." 
                    value={formApi} 
                    onChange={e => setFormApi(e.target.value)} 
                    className="input-field" 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Webhook URL</label>
                  <input 
                    type="text" 
                    placeholder="https://marginn.io/webhooks..." 
                    value={formWebhook} 
                    onChange={e => setFormWebhook(e.target.value)} 
                    className="input-field" 
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Office Address</label>
                <input 
                  type="text" 
                  placeholder="Billing / Shipping origin address" 
                  value={formAddress} 
                  onChange={e => setFormAddress(e.target.value)} 
                  className="input-field" 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Internal Admin Notes</label>
                <textarea 
                  placeholder="E.g. Primary supply line for ANC Audio accessories, holds high priority status." 
                  value={formNotes} 
                  onChange={e => setFormNotes(e.target.value)} 
                  className="input-field" 
                  rows="2" 
                  style={{ resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={resetForm} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {editingSupplier ? 'Save Supplier Details' : 'Onboard Supplier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
