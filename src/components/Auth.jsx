import React, { useState } from 'react';
import { Shield, Lock, Mail, User, ArrowRight, ArrowLeft, RefreshCw, Key, Sparkles } from 'lucide-react';

export default function Auth({ onLoginSuccess, onBackToLanding }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  
  // 2FA simulation
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [code2FA, setCode2FA] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [tempUserPayload, setTempUserPayload] = useState(null);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    if (!isLogin && !name) return;

    // Simulate login progress and trigger 2FA check
    const payload = {
      name: isLogin ? email.split('@')[0] : name,
      email: email
    };
    setTempUserPayload(payload);
    setShow2FAModal(true);
  };

  const handle2FAVerify = (e) => {
    e.preventDefault();
    if (code2FA === '123456' || code2FA.length === 6) {
      setVerificationError('');
      onLoginSuccess(tempUserPayload);
    } else {
      setVerificationError('Invalid 2FA code. Please enter any 6-digit code (e.g. 123456)');
    }
  };

  const handleOAuthLogin = (platform) => {
    // Mocking OAuth connection
    const payload = {
      name: `${platform} Seller`,
      email: `seller@${platform.toLowerCase()}-store.com`,
      connectedMarketplace: platform
    };
    onLoginSuccess(payload);
  };

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'minmax(350px, 480px) 1fr', minHeight: '100vh',
      backgroundColor: 'var(--bg-app)', color: 'var(--text-main)', fontFamily: 'var(--font-sans)'
    }}>
      {/* Left side: Auth Form */}
      <div style={{
        padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        borderRight: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div onClick={onBackToLanding} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-ai))',
              width: '28px', height: '28px', borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.85rem'
            }}>
              M
            </div>
            <span style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'Manrope' }}>
              MARGINN
            </span>
          </div>

          <button onClick={onBackToLanding} style={{
            background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px',
            fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer'
          }}>
            <ArrowLeft size={14} /> Back to Home
          </button>
        </div>

        {/* Form Body */}
        <div style={{ margin: '40px 0' }} className="animate-fade">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.01em' }}>
            {isLogin ? 'Sign in to MARGINN' : 'Create your account'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
            {isLogin ? 'Welcome back! Please enter your details.' : 'Start your 14-day free trial. No credit card required.'}
          </p>

          {/* Social OAuth Integration Connectors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <button onClick={() => handleOAuthLogin('Amazon')} className="btn btn-secondary" style={{
              fontSize: '0.75rem', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}>
              <span style={{ color: '#ff9900', fontWeight: 800 }}>a</span> Amazon Seller
            </button>
            <button onClick={() => handleOAuthLogin('Flipkart')} className="btn btn-secondary" style={{
              fontSize: '0.75rem', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}>
              <span style={{ color: '#2874f0', fontWeight: 800 }}>F</span> Flipkart Seller
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', gap: '10px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Or continue with email</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
          </div>

          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {!isLogin && (
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="input-field" 
                    style={{ paddingLeft: '36px' }}
                    required 
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="input-field" 
                  style={{ paddingLeft: '36px' }}
                  required 
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="input-field" 
                  style={{ paddingLeft: '36px' }}
                  required 
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={e => setRememberMe(e.target.checked)} 
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                Remember me
              </label>
              <button 
                type="button" 
                onClick={() => setShowForgotModal(true)} 
                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer' }}
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '8px' }}>
              {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* Footer */}
        <div style={{ fontSize: '0.8rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer' }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>

      {/* Right side: Modern Product Graphic Panel */}
      <div style={{
        background: 'linear-gradient(135deg, #0d1527, #1e1b4b)',
        padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        color: 'white', position: 'relative', overflow: 'hidden'
      }}>
        {/* Background glow graphics */}
        <div style={{
          position: 'absolute', top: '30%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%)', filter: 'blur(30px)'
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '10%', width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 60%)', filter: 'blur(20px)'
        }} />

        {/* Platform Stat Tag */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '99px', alignSelf: 'flex-start' }}>
          <Sparkles size={14} style={{ color: '#818cf8' }} />
          <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em' }}>TRUSTED BY 4,000+ MERCHANTS</span>
        </div>

        {/* Feature Illustration Card */}
        <div className="glass-panel animate-float" style={{
          padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: 'rgba(15, 23, 42, 0.65)', maxWidth: '440px', margin: '40px auto'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            AI Pricing Engine
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Supplier Cost:</span>
              <span style={{ fontWeight: 600 }}>₹450.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Marketplace Fees:</span>
              <span style={{ fontWeight: 600 }}>₹112.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>Competitor Price:</span>
              <span style={{ fontWeight: 600 }}>₹1,299.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: 'rgba(99, 102, 241, 0.12)', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <div>
                <div style={{ fontSize: '0.65rem', color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.02em', fontWeight: 600 }}>AI Recommended Price</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#c7d2fe' }}>₹1,199.00</div>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600, backgroundColor: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                +8.2% Profit
              </span>
            </div>
          </div>
        </div>

        {/* Footer Quote */}
        <div style={{ maxWidth: '440px' }}>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.5, opacity: 0.85, fontStyle: 'italic', marginBottom: '12px' }}>
            "MARGINN has saved our team hundreds of hours. Order routing is instant, and the dashboard provides exact profitability numbers at any given second."
          </p>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#818cf8' }}>— Rahul Mehta, Founder, Organic Goods Co.</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1200,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px',
            padding: '30px', width: '90%', maxWidth: '400px', boxShadow: 'var(--shadow-lg)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Reset your password</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '20px' }}>
              Enter the email address associated with your account, and we will send you a recovery link.
            </p>

            {forgotSubmitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }} className="animate-fade">
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-success-light)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                  <Mail size={24} />
                </div>
                <h4 style={{ fontWeight: 600, marginBottom: '6px' }}>Check your email</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  We have sent instructions to <strong>{forgotEmail}</strong>.
                </p>
                <button onClick={() => { setShowForgotModal(false); setForgotSubmitted(false); }} className="btn btn-primary" style={{ width: '100%' }}>Done</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setForgotSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    value={forgotEmail} 
                    onChange={e => setForgotEmail(e.target.value)} 
                    className="input-field" 
                    required 
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <button type="button" onClick={() => setShowForgotModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Send Link</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Two-Factor Authentication Modal */}
      {show2FAModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1200,
          backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px',
            padding: '30px', width: '90%', maxWidth: '400px', boxShadow: 'var(--shadow-lg)', textAlign: 'center'
          }} className="animate-fade">
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <Shield size={24} />
            </div>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Two-Factor Security</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '20px' }}>
              We have sent a 6-digit confirmation code to your registered mobile number and authenticator app.
            </p>

            <form onSubmit={handle2FAVerify} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <input 
                  type="text" 
                  placeholder="Enter 6-digit code" 
                  value={code2FA} 
                  onChange={e => setCode2FA(e.target.value.replace(/\D/g, '').substring(0, 6))}
                  className="input-field" 
                  style={{ textAlign: 'center', fontSize: '1.25rem', letterSpacing: '0.2em', fontWeight: 700 }}
                  required 
                />
                {verificationError && <p style={{ color: 'var(--color-error)', fontSize: '0.75rem', marginTop: '6px', textAlign: 'left' }}>{verificationError}</p>}
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'left' }}>
                  💡 Tip: Enter any 6-digit code (e.g. <strong>123456</strong>) to simulate verification.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShow2FAModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Verify Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
