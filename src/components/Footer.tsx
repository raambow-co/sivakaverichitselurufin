import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: '#0B1320', color: '#94A3B8', padding: '70px 0 30px', fontSize: '0.875rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <img src="/assets/brand_crest.jpg" alt="Siva Kaveri Chits" style={{ width: '40px', height: '40px', borderRadius: '10px' }} />
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.2rem' }}>Siva Kaveri Chits</div>
                <div style={{ color: '#C5A880', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '1px' }}>Govt. Registered Institution</div>
              </div>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '320px' }}>
              South India’s trusted chit fund institution dedicated to structured monthly savings, guaranteed business liquidity, and 100% digital banking compliance.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
              Chit Schemes
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#schemes" style={{ color: '#94A3B8' }}>₹1 Lakh Retail Scheme</a></li>
              <li><a href="#schemes" style={{ color: '#94A3B8' }}>₹2 Lakhs Fast-Track</a></li>
              <li><a href="#schemes" style={{ color: '#94A3B8' }}>₹5 Lakhs Popular Group</a></li>
              <li><a href="#schemes" style={{ color: '#94A3B8' }}>₹10 Lakhs Business Plan</a></li>
              <li><a href="#schemes" style={{ color: '#94A3B8' }}>₹25 Lakhs HNI Plan</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
              Compliance
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="#mandate" style={{ color: '#94A3B8' }}>Central Chit Funds Act, 1982</a></li>
              <li><a href="#mandate" style={{ color: '#94A3B8' }}>100% Banking Mandate</a></li>
              <li><a href="#pillars" style={{ color: '#94A3B8' }}>Statutory Bank Guarantee</a></li>
              <li><a href="#faq" style={{ color: '#94A3B8' }}>Registrar of Chits Approvals</a></li>
              <li><a href="#faq" style={{ color: '#94A3B8' }}>Grievance Redressal</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
              Direct Helpline
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="tel:+919876543210" style={{ color: '#FFFFFF', fontWeight: 700 }}>Customer Care: +91 98765 43210</a></li>
              <li><a href="mailto:contact@sivakaverichits.com" style={{ color: '#94A3B8' }}>contact@sivakaverichits.com</a></li>
              <li><span style={{ color: '#94A3B8' }}>Mon - Sat: 9:30 AM - 6:30 PM</span></li>
              <li><a href="#contact" style={{ color: '#22C55E' }}>Locate Nearest Branch →</a></li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '20px', fontSize: '0.78rem', lineHeight: 1.7, color: '#64748B', marginBottom: '32px' }}>
          <strong style={{ color: '#CBD5E1' }}>REGULATORY STATUTORY DISCLOSURE:</strong> Siva Kaveri Chits is an authorized chit fund company incorporated and governed under the provisions of the Central Chit Funds Act, 1982 (Act No. 40 of 1982) and applicable State Chit Fund Rules. All chit groups are commenced strictly after obtaining required statutory approvals from the respective Registrar of Chits and placing 100% statutory security deposits in Scheduled Commercial Banks. We operate under a strict <strong style={{ color: '#CBD5E1' }}>Zero-Cash Policy</strong>: no employee, promoter, or agent is authorized to accept cash. All payments must be made directly to the company's designated bank accounts via official banking modes.
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '24px', fontSize: '0.78rem', color: '#64748B' }}>
          <div>© 2026 Siva Kaveri Chits Pvt. Ltd. All Rights Reserved.</div>
          <div>Statutory Regulated Financial Institution · Registered under Central Chit Funds Act, 1982</div>
        </div>
      </div>
    </footer>
  );
};
