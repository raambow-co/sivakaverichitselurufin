import React, { useState } from 'react';
import { 
  History, 
  Landmark, 
  MapPin, 
  Scale, 
  CheckCircle2, 
  Lock,
  MessageCircle,
  Phone
} from 'lucide-react';

interface ContactSectionProps {
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [chitAmount, setChitAmount] = useState('₹5,00,000 Group (₹10,000/mo)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      onShowToast('⚠️ Please enter a valid 10-digit mobile number.');
      return;
    }
    onShowToast(`Thank you ${name || 'Subscriber'}! Your callback request for ${chitAmount} has been registered. Our manager will call you.`);
    setName('');
    setPhone('');
  };

  return (
    <section className="legacy-trust-section" id="contact">
      <div className="container">
        
        {/* Top Header: Built on 15+ Years of Institutional Trust */}
        <div className="legacy-top-header">
          <div className="legacy-kicker-badge">
            <History size={14} />
            <span>INSTITUTIONAL CHIT LEGACY</span>
          </div>

          <h2 className="legacy-main-title">
            BUILT ON 15+ YEARS OF
            <span className="legacy-title-gold">INSTITUTIONAL TRUST</span>
          </h2>
        </div>

        {/* Top Two Cards Grid: Head Office & Leadership Profile */}
        <div className="legacy-cards-grid">
          
          {/* Left Card: Head Office Building (Real Photo) */}
          <div className="legacy-building-card">
            <img 
              src="/assets/head_office_building.jpg" 
              alt="Siva Kaveri Chits Central Registered Office Building in Eluru" 
              className="legacy-building-img"
              loading="lazy"
            />

            <div className="legacy-office-badge-wrapper">
              <span className="legacy-office-badge">
                <Landmark size={14} />
                <span>Central Registered Office</span>
              </span>
            </div>

            <div className="legacy-building-overlay">
              <div className="legacy-location-chip">
                <MapPin size={12} />
                <span>ELURU, ANDHRA PRADESH</span>
              </div>

              <h3 className="legacy-building-title">
                HEADQUARTERED IN ELURU
              </h3>

              <p className="legacy-building-address">
                D.No. 28-8-25/1, Eluru Properties Road, Opp. SR Studio, Vuppu Rama Rao Area, Narasimharao Pet, Eluru, Andhra Pradesh - 534006
              </p>
            </div>
          </div>

          {/* Right Card: Leadership & Direction (Narendra Varma) */}
          <div className="legacy-founder-card">
            <div>
              <div className="legacy-founder-top-row">
                <span className="legacy-direction-badge">
                  <Scale size={13} />
                  <span>LEADERSHIP & DIRECTION</span>
                </span>
                <span className="legacy-est-tag">Est. 1998</span>
              </div>

              <div className="legacy-profile-row">
                <div className="legacy-portrait-wrapper">
                  <img 
                    src="/assets/founder_narendra_varma.png" 
                    alt="Narendra Varma, Managing Director of Siva Kaveri Chits" 
                    className="legacy-portrait-img"
                    loading="lazy"
                  />
                </div>

                <div className="legacy-profile-details">
                  <h3 className="legacy-founder-name">
                    NARENDRA VARMA
                  </h3>
                  <div className="legacy-founder-role">
                    Managing Director
                  </div>
                  <div className="legacy-founder-company">
                    Siva Kaveri Chits Private Limited
                  </div>
                </div>
              </div>

              <div className="legacy-quote-box">
                <span className="legacy-quote-icon">❝</span>
                <p className="legacy-quote-text">
                  "Our guiding principle is unwavering integrity — every subscriber is family, and every single rupee is protected by 100% statutory bank guarantees."
                </p>
              </div>
            </div>

            <div className="legacy-stats-row">
              <div className="legacy-stat-item">
                <CheckCircle2 size={15} />
                <span>15+ Years Experience</span>
              </div>

              <div className="legacy-stat-item">
                <CheckCircle2 size={15} />
                <span>15,000+ Happy Families</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Two Cards Grid: Registered Office Info & Callback Request Form */}
        <div className="legacy-bottom-grid">
          
          {/* Left: Office Information */}
          <div className="legacy-info-card">
            <h3 className="legacy-card-heading">
              Registered Head Office
            </h3>

            <div className="legacy-details-list">
              <div>
                <strong>Siva Kaveri Chits Pvt. Ltd.</strong><br />
                Corporate Towers, 2nd Floor, Main Commercial Road,<br />
                Near Collectorate Office, Andhra Pradesh / Telangana, India
              </div>

              <div>
                <strong>Direct Phone / Helpdesk:</strong><br />
                +91 98765 43210 / 0866-2456789
              </div>

              <div>
                <strong>Email Address:</strong><br />
                contact@sivakaverichits.com | compliance@sivakaverichits.com
              </div>

              <div>
                <strong>Working Hours:</strong><br />
                Monday – Saturday: 9:30 AM to 6:30 PM (Sunday Closed)
              </div>
            </div>

            <div className="legacy-banking-callout">
              🏛️ <strong>Authorized Banking Channels:</strong><br />
              All subscriptions must be remitted directly to our designated State Bank of India / HDFC Bank Current Escrow Accounts. Never remit cash to unauthorized persons.
            </div>
          </div>

          {/* Right: Request Official Callback */}
          <div className="legacy-callback-card">
            <h3 className="legacy-card-heading">
              Request Official Callback
            </h3>

            <form onSubmit={handleSubmit} className="legacy-callback-form">
              <div className="legacy-form-group">
                <label className="legacy-form-label">Full Name</label>
                <input 
                  type="text" 
                  className="legacy-form-input" 
                  placeholder="Enter your full name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>

              <div className="legacy-form-group">
                <label className="legacy-form-label">10-Digit Mobile Number</label>
                <input 
                  type="tel" 
                  className="legacy-form-input" 
                  placeholder="Mobile number for WhatsApp & Call" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required 
                  pattern="[0-9]{10}" 
                />
              </div>

              <div className="legacy-form-group">
                <label className="legacy-form-label">Interested Chit Amount</label>
                <select 
                  className="legacy-form-select" 
                  value={chitAmount}
                  onChange={(e) => setChitAmount(e.target.value)}
                >
                  <option value="₹5,00,000 Group (₹10,000/mo)">₹5,00,000 Group (₹10,000/mo)</option>
                  <option value="₹1,00,000 Group (₹2,000/mo)">₹1,00,000 Group (₹2,000/mo)</option>
                  <option value="₹2,00,000 Group (₹4,000/mo)">₹2,00,000 Group (₹4,000/mo)</option>
                  <option value="₹10,00,000 Group (₹20,000/mo)">₹10,00,000 Group (₹20,000/mo)</option>
                  <option value="₹25,00,000 Group (₹50,000/mo)">₹25,00,000 Group (₹50,000/mo)</option>
                </select>
              </div>

              <button type="submit" className="legacy-submit-btn">
                Submit Callback Request
              </button>

              <div className="legacy-privacy-note">
                <Lock size={12} />
                <span>Strictly direct bank-to-bank communication. Zero agent solicitation.</span>
              </div>
            </form>
          </div>

        </div>

      </div>

      {/* Floating Action Corner Widgets from Mockup */}
      <div className="floating-widgets-dock">
        <a 
          href="https://wa.me/919928922488?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20Siva%20Kaveri%20Chits."
          target="_blank" 
          rel="noopener noreferrer" 
          className="floating-whatsapp-action"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={26} />
        </a>

        <div className="floating-call-group">
          <a 
            href="tel:+919928922488" 
            className="floating-branches-action"
            aria-label="Call Branches"
          >
            <span className="floating-branches-dot" />
            <span>Call Branches</span>
          </a>

          <a 
            href="tel:+919928922488" 
            className="floating-phone-action"
            aria-label="Call Directly"
          >
            <Phone size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
