import React from 'react';

export const LiveAuctionTicker: React.FC = () => {
  return (
    <div className="live-auction-ticker">
      <div className="container">
        <div className="ticker-wrap">
          <span className="ticker-heading">
            <span className="pulse-dot" style={{ backgroundColor: '#0B1320' }}></span>
            LIVE AUCTIONS
          </span>
          <div className="ticker-items-row">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span>Group <strong style={{ color: '#FFFFFF' }}>SK-500B</strong>: Auction Completed at ₹3,92,000</span>
              <span style={{ color: '#4ADE80', fontWeight: 700 }}>• Dividend: ₹2,160 / member distributed</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span>•</span>
              <span>Group <strong style={{ color: '#FFFFFF' }}>SK-100R</strong>: Prize Disbursed via RTGS within 24 Hours</span>
              <span style={{ color: '#4ADE80', fontWeight: 700 }}>• 100% Bank Verified</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span>•</span>
              <span>Upcoming: <strong style={{ color: '#FFFFFF' }}>SK-1000B</strong> Auction on 01-Nov-2026</span>
              <span style={{ color: '#FDE047' }}>• 3 Slots Remaining</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
