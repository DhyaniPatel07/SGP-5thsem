import React, { useState } from 'react';
import { 
  FileText, Download, RefreshCw, CheckCircle2, Eye, 
  Calendar, Table, FileSpreadsheet, ShieldAlert 
} from 'lucide-react';

export default function TabReports({ addToast }) {
  const [reportType, setReportType] = useState('Sales');
  const [dateRange, setDateRange] = useState('30d');
  const [fileFormat, setFileFormat] = useState('CSV');
  const [generating, setGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  const handleGenerateReport = (e) => {
    e.preventDefault();
    setGenerating(true);
    setGeneratedReport(null);

    // Simulate database export delay
    setTimeout(() => {
      setGenerating(false);
      const generatedMock = {
        name: `MARGINN_${reportType}_Report_${new Date().toISOString().slice(0, 10)}.${fileFormat.toLowerCase()}`,
        size: '184 KB',
        rowsCount: reportType === 'Sales' ? 300 : reportType === 'Inventory' ? 100 : 25,
        timestamp: new Date().toLocaleString()
      };
      setGeneratedReport(generatedMock);
      addToast(`${reportType} Report generated successfully`, 'success');
    }, 1500);
  };

  const handleDownloadFile = () => {
    if (!generatedReport) return;
    addToast(`File download started: ${generatedReport.name}`, 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade">
      
      {/* Title */}
      <div>
        <h1 className="title-medium" style={{ fontWeight: 800 }}>Report Generator</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Compile and download structured CSV, Excel, or PDF records of your catalog, shipping, and sales history.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '24px' }}>
        
        {/* Left: Configuration Form */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 className="title-small">Configure Export</h3>

          <form onSubmit={handleGenerateReport} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Report Dataset</label>
              <select value={reportType} onChange={e => setReportType(e.target.value)} className="input-field">
                <option value="Sales">Sales & Orders Report</option>
                <option value="Profit">Net Profit & Margins</option>
                <option value="Inventory">Inventory Health Log</option>
                <option value="Supplier">Supplier Performance Log</option>
                <option value="Marketplace">Marketplace Sync Summary</option>
                <option value="Tax">GST Taxation Summary</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Date Range</label>
              <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="input-field">
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="ytd">Year to Date (YTD)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>File Format</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                {['CSV', 'Excel', 'PDF'].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setFileFormat(fmt)}
                    style={{
                      padding: '10px 0', border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                      backgroundColor: fileFormat === fmt ? 'var(--color-primary-light)' : 'var(--bg-app)',
                      color: fileFormat === fmt ? 'var(--color-primary)' : 'var(--text-main)',
                      borderColor: fileFormat === fmt ? 'var(--color-primary)' : 'var(--border-color)',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={generating} className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px', opacity: generating ? 0.6 : 1 }}>
              {generating ? (
                <><RefreshCw size={14} className="animate-spin" style={{ animation: 'skeleton-loading 1.5s infinite linear' }} /> Compiling...</>
              ) : (
                <><FileText size={16} /> Compile Report</>
              )}
            </button>
          </form>
        </div>

        {/* Right: Export Preview & Downloads */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '340px' }}>
          <h3 className="title-small">Generated Outputs</h3>

          {generating && (
            <div style={{ flex: 1, display: 'flex', flexDir: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px solid var(--bg-app)', borderTopColor: 'var(--color-primary)', animation: 'skeleton-loading 1s infinite linear' }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Reading database indices and calculating tax sums...</div>
            </div>
          )}

          {!generating && !generatedReport && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', gap: '12px' }}>
              <FileSpreadsheet size={48} opacity="0.4" />
              <span style={{ fontSize: '0.8rem' }}>No active reports generated. Choose parameters and click compile.</span>
            </div>
          )}

          {!generating && generatedReport && (
            <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
              <div style={{
                padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-app)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', wordBreak: 'break-all' }}>{generatedReport.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Size: {generatedReport.size} • Rows: {generatedReport.rowsCount} • compiled on {generatedReport.timestamp}
                    </div>
                  </div>
                </div>

                <button onClick={handleDownloadFile} className="btn btn-primary" style={{ padding: '8px 12px', fontSize: '0.75rem' }}>
                  <Download size={14} /> Download
                </button>
              </div>

              {/* Mock table preview of the data */}
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>
                  Preview (First 4 rows)
                </span>
                
                <div className="table-container">
                  <table className="data-table" style={{ fontSize: '0.75rem' }}>
                    <thead>
                      <tr>
                        <th>Col 1</th>
                        <th>Col 2</th>
                        <th>Col 3</th>
                        <th>Col 4</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportType === 'Sales' ? (
                        <>
                          <tr><td>ORD-10001</td><td>Amazon India</td><td>Priya Sharma</td><td>₹3,999</td></tr>
                          <tr><td>ORD-10002</td><td>Flipkart</td><td>Aman Gupta</td><td>₹1,299</td></tr>
                          <tr><td>ORD-10003</td><td>Amazon India</td><td>Neha Verma</td><td>₹2,499</td></tr>
                          <tr><td>ORD-10004</td><td>ONDC Network</td><td>Vijay Nair</td><td>₹899</td></tr>
                        </>
                      ) : reportType === 'Inventory' ? (
                        <>
                          <tr><td>ELE-1000-1</td><td>Apex Pro ANC Headphones</td><td>Electronics</td><td>120 units</td></tr>
                          <tr><td>ELE-1001-2</td><td>Aero Charge Hub (65W)</td><td>Electronics</td><td>Low Stock (4)</td></tr>
                          <tr><td>KIT-1002-3</td><td>Zenith Digital Air Fryer</td><td>Kitchen</td><td>15 units</td></tr>
                          <tr><td>APP-1004-1</td><td>Cotton Oversized Tee</td><td>Apparel</td><td>Out of Stock</td></tr>
                        </>
                      ) : (
                        <>
                          <tr><td>sup-1</td><td>Apex Electronics Corp</td><td>Electronics</td><td>MOQ: 50</td></tr>
                          <tr><td>sup-2</td><td>Global Textiles Ltd</td><td>Apparel</td><td>MOQ: 100</td></tr>
                          <tr><td>sup-3</td><td>Zenith Kitchenware</td><td>Kitchen</td><td>MOQ: 20</td></tr>
                          <tr><td>sup-4</td><td>FlexiFit Sports Co</td><td>Fitness</td><td>MOQ: 30</td></tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
