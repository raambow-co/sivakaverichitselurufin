import React from 'react';
import { PiggyBank, TrendingUp, Zap, Building2, Crown, Landmark } from 'lucide-react';

interface HeroDockProps {
  onSelectCategory: (category: string) => void;
}

export const HeroDock: React.FC<HeroDockProps> = ({ onSelectCategory }) => {
  const dockItems = [
    { id: 'retail', name: 'Retail Chits (₹1L-₹3L)', sub: '₹2,000 - ₹6,000 / mo', icon: <PiggyBank size={20} /> },
    { id: 'business', name: 'Wealth Chits (₹5 Lakhs)', sub: '₹10,000 / mo', icon: <TrendingUp size={20} /> },
    { id: 'fasttrack', name: 'Fast-Track (25 Months)', sub: 'Quick Business Liquidity', icon: <Zap size={20} /> },
    { id: 'business', name: 'Commercial Chits (₹10L)', sub: '₹20,000 / mo', icon: <Building2 size={20} /> },
    { id: 'premium', name: 'HNI Groups (₹25 Lakhs)', sub: '₹50,000 / mo', icon: <Crown size={20} /> },
    { id: 'mandate', name: '100% Bank RTGS', sub: 'Zero Cash Transfers', icon: <Landmark size={20} /> },
  ];

  return (
    <div className="hero-dock-wrap">
      <div className="container">
        <div className="hero-dock-container" role="region" aria-label="Chit Scheme Categories">
          {dockItems.map((item, idx) => (
            <button 
              key={idx} 
              type="button"
              className="dock-item"
              onClick={() => onSelectCategory(item.id)}
              aria-label={`${item.name} - ${item.sub}`}
            >
              <div className="dock-icon-circle">
                {item.icon}
              </div>
              <span className="dock-item-name">{item.name}</span>
              <span className="dock-item-sub">{item.sub}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroDock;
