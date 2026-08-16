import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ShieldCheck, Sparkles, TrendingUp, RefreshCw, BarChart3, 
  Zap, Globe, HelpCircle, Check, Play, MessageSquare, Star, ArrowUpRight
} from 'lucide-react';

export default function LandingPage({ onGetStarted, onLogin }) {
  const [activePricingTab, setActivePricingTab] = useState('monthly');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "MARGINN changed our dropshipping business. We scaled from 50 orders a day to 400+ without hiring extra operations help. The AI Pricing engine alone boosted our net margins by 6.2%.",
      author: "Vikram Sethi",
      role: "Founder, V-Trends eCommerce",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    {
      quote: "Managing 15+ suppliers across Surat and Delhi was a nightmare. MARGINN's supplier directory and automated inventory sync saved us at least 25 hours a week. A must-have for serious e-commerce sellers.",
      author: "Pooja Hegde",
      role: "Operations Director, Loom & Weaver",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
    },
    {
      quote: "The ONDC and Amazon multi-channel sync works flawlessly. We imported our entire catalog in under 5 minutes, and the AI product recommendations helped us find 3 new high-margin bestsellers.",
      author: "Arjun Srinivasan",
      role: "Managing Partner, Zenith Retail India",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-page" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-main)' }}>
      {/* Top Navbar */}
      <header className="glass-panel" style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 5%', borderBottom: '1px solid var(--border-color)',
        backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
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

        <nav style={{ display: 'flex', gap: '28px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }} className="nav-links">
          <a href="#features" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = 'var(--text-main)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Features</a>
          <a href="#benefits" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = 'var(--text-main)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Benefits</a>
          <a href="#pricing" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = 'var(--text-main)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Pricing</a>
          <a href="#testimonials" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e => e.target.style.color = 'var(--text-main)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Testimonials</a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onLogin} className="btn btn-secondary" style={{ padding: '8px 16px' }}>Sign In</button>
          <button onClick={onGetStarted} className="btn btn-primary" style={{ padding: '8px 18px' }}>Get Started <ArrowRight size={16} /></button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '80px 5% 40px 5%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Glow Effects */}
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(139, 92, 246, 0.04) 50%, rgba(0,0,0,0) 70%)',
          filter: 'blur(40px)', zIndex: -1
        }} />
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--color-primary-light)', padding: '6px 12px', borderRadius: '99px', marginBottom: '24px' }}>
          <Sparkles size={14} style={{ color: 'var(--color-primary)' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', letterSpacing: '0.02em' }}>NEXT-GEN AI AUTOMATION PLATFORM</span>
        </div>

        <h1 className="title-large" style={{ fontSize: '3.75rem', maxWidth: '900px', margin: '0 auto 20px auto', lineHeight: 1.1 }}>
          AI-Powered Commerce Automation for <span style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-ai))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Smarter Selling</span>
        </h1>
        
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 36px auto', lineHeight: 1.5 }}>
          Manage suppliers, products, marketplaces, pricing, inventory, orders, and analytics from one intelligent, investor-ready dashboard.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '60px' }}>
          <button onClick={onGetStarted} className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
            Start Free Trial <ArrowRight size={18} />
          </button>
          <button onClick={onGetStarted} className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
            <Play size={16} fill="currentColor" /> Book Demo
          </button>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="glass-panel" style={{
          maxWidth: '1000px', margin: '0 auto', borderRadius: '16px', border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)', padding: '12px', background: 'rgba(255, 255, 255, 0.02)',
          transform: 'perspective(1000px) rotateX(2deg)', transition: 'transform 0.5s ease'
        }}>
          <div style={{ backgroundColor: 'var(--bg-app)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            {/* Inner Dashboard Header mockup */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              </div>
              <div style={{ flex: 1, height: '24px', backgroundColor: 'var(--bg-input)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                app.marginn.io/dashboard
              </div>
            </div>
            
            {/* Dashboard Content Mockup */}
            <div style={{ padding: '24px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Top Row Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Today's Revenue</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>₹1,42,850</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-success)', marginTop: '4px' }}>↑ 18.2% vs yesterday</div>
                </div>
                <div style={{ padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>AI Opportunity Score</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-ai)', display: 'flex', alignItems: 'center', gap: '4px' }}>94/100</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>4 active profit suggestions</div>
                </div>
                <div style={{ padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Inventory Health</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Healthy (92%)</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-warning)', marginTop: '4px' }}>2 items low stock</div>
                </div>
              </div>
              
              {/* Bottom Row Mockup Content */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div style={{ padding: '20px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)', minHeight: '180px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Sales Analytics & Growth</div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>Last 7 Days</span>
                  </div>
                  {/* Mock Chart lines */}
                  <svg viewBox="0 0 400 120" style={{ width: '100%', height: '120px' }}>
                    <path d="M 0 100 Q 50 80, 100 90 T 200 40 T 300 50 T 400 20" fill="none" stroke="var(--color-primary)" strokeWidth="3" />
                    <path d="M 0 100 Q 50 80, 100 90 T 200 40 T 300 50 T 400 20 L 400 120 L 0 120 Z" fill="url(#hero-gradient)" opacity="0.1" />
                    <defs>
                      <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--color-primary)" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                <div style={{ padding: '20px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '14px' }}>AI Actions Recommendation</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ padding: '8px', borderLeft: '3px solid var(--color-ai)', backgroundColor: 'var(--bg-app)', borderRadius: '4px', fontSize: '0.75rem' }}>
                      <strong>Pricing:</strong> Competitor raised price. Raise yours to increase margin by 8%?
                    </div>
                    <div style={{ padding: '8px', borderLeft: '3px solid var(--color-warning)', backgroundColor: 'var(--bg-app)', borderRadius: '4px', fontSize: '0.75rem' }}>
                      <strong>Stockout:</strong> Reorder Pro Headphones in 2 days to prevent delays.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section style={{ padding: '40px 5%', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
        <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '24px', fontWeight: 600 }}>
          TRUSTED BY MODERN E-COMMERCE OPERATORS ACROSS PLATFORMS
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '48px', alignItems: 'center', opacity: 0.65 }}>
          {['Amazon Seller', 'Flipkart Assured', 'Meesho Partner', 'ONDC Network', 'MSMEs India', 'Direct Manufacturers'].map((brand, idx) => (
            <span key={idx} style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-main)', fontFamily: 'Manrope' }}>
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" style={{ padding: '80px 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="title-medium" style={{ fontSize: '2.25rem', marginBottom: '16px' }}>
            Powering E-Commerce Operations with AI
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            Save dozens of hours weekly and maximize profits. MARGINN integrates directly with your existing setup to automate daily tasks.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            {
              icon: <Sparkles size={20} style={{ color: 'var(--color-ai)' }} />,
              title: "AI Product Discovery",
              desc: "Mine live market data to identify trending, high-demand, low-competition products with optimized margins instantly."
            },
            {
              icon: <TrendingUp size={20} style={{ color: 'var(--color-primary)' }} />,
              title: "Intelligent Pricing Engine",
              desc: "Dynamic real-time pricing adjusts relative to supplier cost, marketplace fees, and competitors automatically."
            },
            {
              icon: <Globe size={20} style={{ color: 'var(--color-success)' }} />,
              title: "Supplier Management",
              desc: "Onboard, communicate, and track performance of 25+ standard suppliers with live lead time analysis."
            },
            {
              icon: <RefreshCw size={20} style={{ color: 'var(--color-warning)' }} />,
              title: "Instant Inventory Sync",
              desc: "Zero manual inventory entry. Automatic stock adjustments prevent penalties, cancellations, and stockouts."
            },
            {
              icon: <ShieldCheck size={20} style={{ color: 'var(--color-primary)' }} />,
              title: "Marketplace Integrations",
              desc: "Connect your Amazon, Flipkart, Meesho, and ONDC channels in a single click to centralize listings."
            },
            {
              icon: <BarChart3 size={20} style={{ color: 'var(--color-primary)' }} />,
              title: "Smart Analytics & Forecast",
              desc: "Stripe-grade revenue and profit tracking dashboards with forecasting to plan cash flows."
            },
            {
              icon: <Zap size={20} style={{ color: 'var(--color-ai)' }} />,
              title: "Automated Order Processing",
              desc: "Orders from connected marketplaces are routed to appropriate suppliers immediately without human error."
            },
            {
              icon: <MessageSquare size={20} style={{ color: 'var(--color-ai)' }} />,
              title: "AI Business Assistant",
              desc: "Ask business questions, query margins, identify bottlenecks, and get smart daily optimization tips."
            }
          ].map((feat, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {feat.icon}
              </div>
              <div>
                <h3 className="title-small" style={{ marginBottom: '8px' }}>{feat.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" style={{ padding: '80px 5%', backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <h2 className="title-medium" style={{ fontSize: '2.25rem', marginBottom: '20px', lineHeight: 1.2 }}>
              Why Dropshippers and Brands Choose MARGINN
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '1.05rem', lineHeight: 1.5 }}>
              Scale your e-commerce operations, reduce manual order fulfillment steps, and let AI protect your profit margins.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                "Saves up to 25+ operational hours every week",
                "Boosts net margins by 4.5% to 8% in the first 30 days",
                "Decreases order cancellation and stockout rates to under 0.5%",
                "Allows managing multi-marketplace listings from a single app"
              ].map((benefit, bIdx) => (
                <div key={bIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ backgroundColor: 'var(--color-success-light)', color: 'var(--color-success)', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={12} />
                  </div>
                  <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--bg-app)' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>92%</span>
              <h4 style={{ fontWeight: 600, margin: '12px 0 6px 0', fontSize: '0.95rem' }}>Time Saved</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Automate supplier routing, inventory, and listings.</p>
            </div>
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--bg-app)' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-ai)' }}>+6.8%</span>
              <h4 style={{ fontWeight: 600, margin: '12px 0 6px 0', fontSize: '0.95rem' }}>Margin Boost</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AI dynamic pricing matches market competition dynamically.</p>
            </div>
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--bg-app)' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-success)' }}>0.2%</span>
              <h4 style={{ fontWeight: 600, margin: '12px 0 6px 0', fontSize: '0.95rem' }}>Stockout Rate</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Prevent deactivations with intelligent demand forecasting.</p>
            </div>
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--bg-app)' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-warning)' }}>₹25L+</span>
              <h4 style={{ fontWeight: 600, margin: '12px 0 6px 0', fontSize: '0.95rem' }}>Fulfillment Saved</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Eliminated manual entry mistakes and double orders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" style={{ padding: '80px 5%', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="title-medium" style={{ fontSize: '2rem', marginBottom: '32px' }}>
            Trusted by Entrepreneurs & E-commerce Hubs
          </h2>
          
          <div className="card animate-fade" key={activeTestimonial} style={{ padding: '40px', position: 'relative', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '20px' }}>
              {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} size={18} fill="var(--color-warning)" stroke="var(--color-warning)" />
              ))}
            </div>
            
            <p style={{ fontSize: '1.25rem', fontWeight: 500, fontStyle: 'italic', marginBottom: '28px', lineHeight: 1.6 }}>
              "{testimonials[activeTestimonial].quote}"
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 600 }}>
                {testimonials[activeTestimonial].author.charAt(0)}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{testimonials[activeTestimonial].author}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{testimonials[activeTestimonial].role}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            {testimonials.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveTestimonial(idx)} 
                style={{ 
                  width: '8px', height: '8px', borderRadius: '50%', border: 'none', 
                  backgroundColor: activeTestimonial === idx ? 'var(--color-primary)' : 'var(--border-color)',
                  cursor: 'pointer', transition: 'background-color 0.3s'
                }} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '80px 5%', backgroundColor: 'var(--bg-app)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="title-medium" style={{ fontSize: '2.25rem', marginBottom: '16px' }}>
            Simple, Transparent Pricing Plans
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '28px' }}>
            Choose a plan that matches your business volume. Cancel or upgrade at any time.
          </p>

          <div style={{ display: 'inline-flex', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '4px', borderRadius: '99px' }}>
            <button 
              onClick={() => setActivePricingTab('monthly')}
              style={{
                padding: '8px 20px', borderRadius: '99px', border: 'none', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                backgroundColor: activePricingTab === 'monthly' ? 'var(--color-primary)' : 'transparent',
                color: activePricingTab === 'monthly' ? 'white' : 'var(--text-muted)',
                transition: 'all var(--transition-fast)'
              }}
            >
              Monthly
            </button>
            <button 
              onClick={() => setActivePricingTab('yearly')}
              style={{
                padding: '8px 20px', borderRadius: '99px', border: 'none', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                backgroundColor: activePricingTab === 'yearly' ? 'var(--color-primary)' : 'transparent',
                color: activePricingTab === 'yearly' ? 'white' : 'var(--text-muted)',
                transition: 'all var(--transition-fast)'
              }}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 350px))', gap: '30px', justifyContent: 'center' }}>
          {/* Starter Plan */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px', backgroundColor: 'var(--bg-card)' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Starter</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Ideal for beginners getting their first sales.</p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>₹{activePricingTab === 'monthly' ? '2,999' : '2,399'}</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>/ month</span>
            </div>

            <button onClick={onGetStarted} className="btn btn-secondary" style={{ width: '100%' }}>Start 14-day Trial</button>

            <div style={{ borderBottom: '1px solid var(--border-color)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              {[
                "Up to 2 connected Marketplaces",
                "Up to 200 orders / month",
                "AI Product research (50 queries)",
                "Standard supplier profiles",
                "Daily stock synchronization",
                "Email support"
              ].map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} style={{ color: 'var(--color-success)' }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Plan (Featured) */}
          <div className="card" style={{ 
            display: 'flex', flexDirection: 'column', gap: '24px', backgroundColor: 'var(--bg-card)',
            border: '2px solid var(--color-primary)', position: 'relative'
          }}>
            <div style={{ 
              position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
              backgroundColor: 'var(--color-primary)', color: 'white', fontSize: '0.7rem', fontWeight: 700,
              padding: '4px 12px', borderRadius: '99px', letterSpacing: '0.05em', textTransform: 'uppercase'
            }}>
              Most Popular
            </div>

            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Professional</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Best for growing merchants with steady orders.</p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>₹{activePricingTab === 'monthly' ? '7,999' : '6,399'}</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>/ month</span>
            </div>

            <button onClick={onGetStarted} className="btn btn-primary" style={{ width: '100%' }}>Start 14-day Trial</button>

            <div style={{ borderBottom: '1px solid var(--border-color)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              {[
                "Unlimited connected Marketplaces",
                "Up to 2,000 orders / month",
                "Unlimited AI Product research",
                "Full Supplier dashboard & MOQ tools",
                "Realtime dynamic inventory sync",
                "AI Dynamic Pricing Engine",
                "Advanced Sales forecasting reports",
                "24/7 Priority support"
              ].map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} style={{ color: 'var(--color-success)' }} />
                  <strong>{feat.startsWith("AI") || feat.includes("Unlimited") ? <span style={{ color: 'var(--color-ai)' }}>{feat}</span> : feat}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px', backgroundColor: 'var(--bg-card)' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Enterprise</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Custom plan for manufacturers & multi-brand setups.</p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>Custom</span>
            </div>

            <button onClick={onGetStarted} className="btn btn-secondary" style={{ width: '100%' }}>Contact Sales</button>

            <div style={{ borderBottom: '1px solid var(--border-color)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              {[
                "Unlimited everything",
                "Custom logistics API integrations",
                "Multi-warehouse control",
                "Dedicated key account manager",
                "SLA-backed uptime guarantees",
                "Custom reports & invoice exports",
                "On-premise integrations possible"
              ].map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} style={{ color: 'var(--color-success)' }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={{
        padding: '60px 5% 30px 5%', backgroundColor: 'var(--bg-sidebar)',
        borderTop: '1px solid var(--border-color)', fontSize: '0.875rem'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-ai))',
                width: '28px', height: '28px', borderRadius: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.85rem'
              }}>
                M
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'Manrope' }}>
                MARGINN
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
              Investor-grade B2B SaaS platform automating catalog management, supplier connections, and dynamic pricing for dropshippers globally.
            </p>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '16px' }}>Platform</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)' }}>
              <a href="#features">Features</a>
              <a href="#benefits">Benefits</a>
              <a href="#pricing">Pricing</a>
              <a href="#testimonials">Testimonials</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '16px' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)' }}>
              <a href="#">Guides</a>
              <a href="#">SaaS API Docs</a>
              <a href="#">Supplier FAQ</a>
              <a href="#">Dropship Manual</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '16px' }}>Get Updates</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Subscribe to get AI dropship recommendation tips weekly.</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="email" placeholder="you@example.com" className="input-field" style={{ padding: '8px 12px' }} />
              <button className="btn btn-primary" style={{ padding: '8px 14px' }}>Join</button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          <span>© {new Date().getFullYear()} MARGINN Inc. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
