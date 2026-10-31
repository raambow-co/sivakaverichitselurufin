import React from 'react';
import { Shield, Building2, TrendingUp, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenModal: (scheme?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section className="hero-vibrant">
      <div className="container">
        <div className="hero-layout-grid">
          {/* Left Hero Content */}
          <div className="hero-left-content">
            <div className="hero-pill-badge">
              <span>🏛️ Govt. Registered Chit Fund · Central Chit Funds Act, 1982</span>
              <span>✨</span>
            </div>

            <h1 className="hero-main-title">
              Disciplined Savings.<br />
              <span className="word-wealth">Guaranteed Capital.</span>
            </h1>

            <div className="hero-actions-row">
              <button 
                type="button"
                className="hero-cta-btn" 
                onClick={() => onOpenModal('Explore Chit Groups')}
              >
                <span>Explore Chit Groups</span>
                <ArrowRight size={18} />
              </button>

              <a 
                href="#calculator" 
                className="hero-secondary-btn"
              >
                Calculate Monthly Dividends
              </a>
            </div>

            {/* 3 Chit-Specific Trust Points */}
            <div className="hero-trust-row">
              <div className="trust-item">
                <div className="trust-icon-wrap">
                  <Shield size={20} />
                </div>
                <div className="trust-text-wrap">
                  <div className="trust-label">Govt. Registered</div>
                  <div className="trust-sub">Chit Funds Act, 1982</div>
                </div>
              </div>

              <div className="trust-item">
                <div className="trust-icon-wrap">
                  <Building2 size={20} />
                </div>
                <div className="trust-text-wrap">
                  <div className="trust-label">100% Bank Disbursals</div>
                  <div className="trust-sub">Strict Zero Cash Policy</div>
                </div>
              </div>

              <div className="trust-item">
                <div className="trust-icon-wrap">
                  <TrendingUp size={20} />
                </div>
                <div className="trust-text-wrap">
                  <div className="trust-label">8% - 12% Dividends</div>
                  <div className="trust-sub">Monthly Auction Gains</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero: Hand Holding Smartphone Visual */}
          <div className="hero-right-visual">
            <img 
              src="/assets/hero_phone_hand.png" 
              alt="Siva Kaveri Chits mobile application interface showing active chit schemes and portfolio" 
              className="hand-mockup-img"
              width="480"
              height="580"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
