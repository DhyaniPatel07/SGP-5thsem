import React, { useState } from 'react';
import { 
  Building2, Globe, ShieldCheck, Check, ArrowRight, ArrowLeft, 
  ShoppingBag, Sparkles, CheckCircle2, AlertCircle 
} from 'lucide-react';

export default function Onboarding({ user, onComplete }) {
  const [step, setStep] = useState(1);
  
  // Step 1: Marketplace connection state
  const [connectedMarketplaces, setConnectedMarketplaces] = useState({
    Amazon: user?.connectedMarketplace === 'Amazon',
    Flipkart: user?.connectedMarketplace === 'Flipkart'
  });
  
  // Step 2: Business Information
  const [businessName, setBusinessName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [businessEmail, setBusinessEmail] = useState(user?.email || '');
  const [gstError, setGstError] = useState('');

  // Step 3: Supplier Information
  const [supplierName, setSupplierName] = useState('Local Wholesale Hub');
  const [supplierContact, setSupplierContact] = useState('Rahul Anand');
  const [supplierEmail, setSupplierEmail] = useState('orders@localwholesale.com');
  const [supplierCategory, setSupplierCategory] = useState('Electronics');
  const [supplierMOQ, setSupplierMOQ] = useState('25');

  const handleConnectMarketplace = (platform) => {
    setConnectedMarketplaces(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  const handleNextStep = () => {
    if (step === 2) {
      // Validate GST format (simple Indian GST validator simulation: 15 characters)
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (gstNumber && !gstRegex.test(gstNumber.toUpperCase())) {
        setGstError('Invalid GST Format. E.g. 27AAACA1234A1Z1');
        return;
      }
      setGstError('');
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleFinish = () => {
    // Return accumulated onboarding data
    onComplete({
      marketplaces: connectedMarketplaces,
      business: { businessName, gstNumber, address, phone, businessEmail },
      supplier: { supplierName, supplierContact, supplierEmail, supplierCategory, moq: Number(supplierMOQ) }
    });
  };

  const stepsData = [
    { title: "Marketplace Connections", desc: "Sync listing data" },
    { title: "Business Profile", desc: "GST & tax registration" },
    { title: "Primary Supplier", desc: "Setup logistics channel" },
    { title: "Launch Dashboard", desc: "Complete integration" }
  ];

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      backgroundColor: 'var(--bg-app)', color: 'var(--text-main)', fontFamily: 'var(--font-sans)'
    }}>
      {/* Navbar mockup */}
      <header className="glass-panel" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 5%', borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-ai))',
            width: '32px', height: '32px', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800
          }}>
            M
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'Manrope' }}>
            MARGINN
          </span>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Onboarding progress for: <strong style={{ color: 'var(--text-main)' }}>{user?.email}</strong>
        </div>
      </header>

      {/* Main stepper body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        
        {/* Stepper Progress Bar */}
        <div style={{ display: 'flex', gap: '30px', marginBottom: '40px', width: '100%', maxWidth: '750px', justifyContent: 'space-between' }} className="stepper-indicators">
          {stepsData.map((s, idx) => {
            const stepNum = idx + 1;
            const isCompleted = step > stepNum;
            const isActive = step === stepNum;
            return (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', opacity: isActive || isCompleted ? 1 : 0.4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    backgroundColor: isCompleted ? 'var(--color-success)' : isActive ? 'var(--color-primary)' : 'var(--bg-input)',
                    color: isCompleted || isActive ? 'white' : 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700
                  }}>
                    {isCompleted ? <Check size={14} /> : stepNum}
                  </div>
                  <div style={{
                    flex: 1, height: '4px', borderRadius: '2px',
                    backgroundColor: isCompleted ? 'var(--color-success)' : isActive ? 'var(--color-primary-light)' : 'var(--border-color)'
                  }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{s.title}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="card animate-fade" style={{ width: '100%', maxWidth: '580px', padding: '36px', position: 'relative' }}>
          
          {/* Step 1: Marketplaces */}
          {step === 1 && (
            <div className="animate-fade">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Step 1: Connect your marketplace channels</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '24px' }}>
                MARGINN connects directly to your seller portals using APIs to fetch products, orders, pricing guidelines, and listings automatically.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  backgroundColor: connectedMarketplaces.Amazon ? 'var(--color-primary-light)' : 'var(--bg-app)',
                  transition: 'all var(--transition-fast)'
                }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#ff9900',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.25rem'
                    }}>
                      a
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Amazon Seller Central</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sync catalog, orders, FBA tracking status</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleConnectMarketplace('Amazon')} 
                    className={`btn ${connectedMarketplaces.Amazon ? 'btn-secondary' : 'btn-primary'}`}
                    style={{ padding: '8px 16px', fontSize: '0.75rem' }}
                  >
                    {connectedMarketplaces.Amazon ? 'Disconnect' : 'Connect Account'}
                  </button>
                </div>

                <div style={{
                  padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  backgroundColor: connectedMarketplaces.Flipkart ? 'var(--color-primary-light)' : 'var(--bg-app)',
                  transition: 'all var(--transition-fast)'
                }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#2874f0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.25rem'
                    }}>
                      F
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Flipkart Seller Hub</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sync Flipkart Assured inventory and pricing logs</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleConnectMarketplace('Flipkart')} 
                    className={`btn ${connectedMarketplaces.Flipkart ? 'btn-secondary' : 'btn-primary'}`}
                    style={{ padding: '8px 16px', fontSize: '0.75rem' }}
                  >
                    {connectedMarketplaces.Flipkart ? 'Disconnect' : 'Connect Account'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Business profile */}
          {step === 2 && (
            <div className="animate-fade">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Step 2: Enter your business information</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '24px' }}>
                We require these details to configure invoice layouts, taxation rates (GST), and shipping label structures.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Registered Business Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Apex E-Commerce Enterprises" 
                    value={businessName} 
                    onChange={e => setBusinessName(e.target.value)} 
                    className="input-field" 
                    required 
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>GSTIN Number (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 27AAACA1234A1Z1" 
                    value={gstNumber} 
                    onChange={e => setGstNumber(e.target.value)} 
                    className="input-field" 
                    style={{ textTransform: 'uppercase' }}
                  />
                  {gstError && (
                    <div style={{ color: 'var(--color-error)', fontSize: '0.75rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={12} /> {gstError}
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Business Phone</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 98765 43210" 
                      value={phone} 
                      onChange={e => setPhone(e.target.value)} 
                      className="input-field" 
                      required 
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Billing Email</label>
                    <input 
                      type="email" 
                      placeholder="billing@company.com" 
                      value={businessEmail} 
                      onChange={e => setBusinessEmail(e.target.value)} 
                      className="input-field" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Office Address</label>
                  <textarea 
                    placeholder="Enter complete office/warehouse address" 
                    value={address} 
                    onChange={e => setAddress(e.target.value)} 
                    className="input-field" 
                    rows="3" 
                    style={{ resize: 'none' }}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Suppliers */}
          {step === 3 && (
            <div className="animate-fade">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Step 3: Onboard your primary supplier</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '24px' }}>
                Setup your first supplier. MARGINN uses this configuration to automate purchase orders and query stock parameters.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Supplier / Agency Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Delhi Wholesale Distributors" 
                    value={supplierName} 
                    onChange={e => setSupplierName(e.target.value)} 
                    className="input-field" 
                    required 
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Contact Person</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Amit Verma" 
                      value={supplierContact} 
                      onChange={e => setSupplierContact(e.target.value)} 
                      className="input-field" 
                      required 
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Supplier Email</label>
                    <input 
                      type="email" 
                      placeholder="orders@supplier.com" 
                      value={supplierEmail} 
                      onChange={e => setSupplierEmail(e.target.value)} 
                      className="input-field" 
                      required 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Category Focus</label>
                    <select 
                      value={supplierCategory} 
                      onChange={e => setSupplierCategory(e.target.value)} 
                      className="input-field"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Kitchen">Kitchen Appliances</option>
                      <option value="Apparel">Apparel & Textiles</option>
                      <option value="Fitness">Fitness & Outdoors</option>
                      <option value="Home Decor">Home Decor</option>
                      <option value="Beauty">Beauty & Cosmetics</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Minimum Order Qty (MOQ)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 50" 
                      value={supplierMOQ} 
                      onChange={e => setSupplierMOQ(e.target.value)} 
                      className="input-field" 
                      required 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Complete */}
          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }} className="animate-fade">
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'var(--color-success-light)',
                color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto'
              }}>
                <CheckCircle2 size={44} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Setup Complete!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '400px', margin: '0 auto 24px auto', lineHeight: 1.5 }}>
                Your channels are successfully linked, and the inventory simulator is hydrated. 100 sample products and 300 active orders are generated for your dashboard analysis.
              </p>

              <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '360px', margin: '0 auto 28px auto', backgroundColor: 'var(--bg-app)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'left', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Connected Channels:</span>
                  <span style={{ fontWeight: 600 }}>{Object.values(connectedMarketplaces).filter(Boolean).length || 'None (Demo Mode)'} Connected</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>GST Number:</span>
                  <span style={{ fontWeight: 600, textTransform: 'uppercase' }}>{gstNumber || 'Unregistered'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Primary Supplier:</span>
                  <span style={{ fontWeight: 600 }}>{supplierName} (MOQ: {supplierMOQ})</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Hydration Data:</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-ai)' }}>100 Products, 300 Orders Active</span>
                </div>
              </div>

              <button onClick={handleFinish} className="btn btn-ai" style={{ width: '100%', maxWidth: '360px', padding: '14px', fontSize: '0.95rem' }}>
                Enter Executive Dashboard <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Nav Buttons */}
          {step < 4 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              <button 
                onClick={handlePrevStep} 
                disabled={step === 1}
                className="btn btn-secondary" 
                style={{ opacity: step === 1 ? 0.3 : 1, cursor: step === 1 ? 'not-allowed' : 'pointer' }}
              >
                <ArrowLeft size={16} /> Back
              </button>

              <button 
                onClick={handleNextStep} 
                className="btn btn-primary"
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
