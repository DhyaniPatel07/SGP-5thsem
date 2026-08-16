import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageSquare, X, Send, User, Brain } from 'lucide-react';

export default function AIAssistantWidget({ products, orders, activeTab, onNavigateTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: "Hi! I'm your MARGINN AI Assistant. I have read your catalog of 100 products, 25 suppliers, and 300 order records. How can I help optimize your margins today?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  const suggestions = [
    "Recommend profitable products",
    "Do we have low stock items?",
    "Forecast sales trend",
    "Explain Flipkart margin logs"
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add User Message
    const userMsg = { sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking and responsive answers
    setTimeout(() => {
      setIsTyping(false);
      let responseText = '';
      const query = text.toLowerCase();

      if (query.includes('product') || query.includes('recommend')) {
        responseText = "Based on current demand volumes and low supplier competition, I recommend importing: \n1. Portable Neck Fans (Category: Electronics) - Expected Profit: ₹384/unit (58% margin).\n2. Snail Mucin Hydrating Cream (Category: Beauty) - Expected Profit: ₹512/unit (59% margin).\nBoth items are available with wholesale suppliers within 4 days delivery radius. You can import them directly from the 'AI Product Discovery' tab.";
      } else if (query.includes('stock') || query.includes('inventory')) {
        const lowStockCount = products.filter(p => p.status === 'Low Stock').length;
        responseText = `You currently have ${lowStockCount} items flagged with Low Stock. The most critical is 'Apex Pro Wireless ANC Headphones' (SKU: ELE-1000-1) which is projected to run out of stock in 4 days. Lead time is 4 days, so I suggest restocking 50 units immediately via Delhi Wholesale Hub to prevent losing listing ranks.`;
      } else if (query.includes('forecast') || query.includes('sales')) {
        const totalSales = orders.reduce((sum, o) => sum + o.orderValue, 0);
        const profit = orders.reduce((sum, o) => sum + o.profit, 0);
        responseText = `Analyzing your last 300 orders (₹${totalSales.toLocaleString()} sales volume), next week's sales are projected to grow by 14% to approximately ₹1,62,000. Implementing AI pricing suggestions on Amazon and ONDC can capture an extra ₹8,200 in net profit margin.`;
      } else if (query.includes('flipkart') || query.includes('margin')) {
        responseText = "Your current profit margin on Flipkart is 28.5%. We noticed a 6.2% return increase on 'Elite Leather Chelsea Boots' due to sizing mismatches, which has cost you ₹4,500 in reverse logistics shipping. AI suggests uploading updated size tables to Flipkart listings immediately to salvage margin.";
      } else {
        responseText = "I've reviewed your operational metrics. Today's revenue is healthy, but we have 2 low stock alerts and 4 active price adjustments recommendations waiting in the AI Pricing Engine. Let me know if you would like me to navigate to those panels.";
      }

      setMessages(prev => [...prev, { sender: 'assistant', text: responseText }]);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Floating Bubble Icon */}
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="ai-assistant-bubble"
        title="Ask MARGINN AI"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </div>

      {/* Conversational Overlay Box */}
      {isOpen && (
        <div className="ai-chat-window animate-fade">
          
          {/* Header */}
          <div className="ai-chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Brain size={18} style={{ color: 'var(--color-ai)' }} />
              <div>
                <strong style={{ fontSize: '0.85rem', display: 'block' }}>MARGINN AI</strong>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-success)', fontWeight: 600 }}>Active & Hydrated</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages list feed */}
          <div className="ai-chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`ai-message ${msg.sender}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', opacity: 0.65, fontSize: '0.65rem' }}>
                  {msg.sender === 'user' ? <User size={10} /> : <Brain size={10} />}
                  <span>{msg.sender === 'user' ? 'You' : 'MARGINN AI'}</span>
                </div>
                <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message assistant">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Brain size={12} className="animate-pulse" style={{ animation: 'skeleton-loading 1.5s infinite' }} /> MARGINN AI is thinking...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions footer */}
          <div style={{ padding: '8px 16px', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-app)' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Quick Prompts:</span>
            <div className="ai-suggestions-list">
              {suggestions.map((sug, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSuggestionClick(sug)}
                  className="ai-suggestion-btn"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Input text send area */}
          <div className="ai-chat-input-area">
            <input
              type="text"
              placeholder="Ask anything about inventory, profit..."
              className="input-field"
              style={{ height: '36px', fontSize: '0.8rem' }}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(inputText); }}
            />
            <button 
              onClick={() => handleSendMessage(inputText)}
              className="btn btn-primary"
              style={{ width: '36px', height: '36px', padding: 0, borderRadius: '50%' }}
            >
              <Send size={14} />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
