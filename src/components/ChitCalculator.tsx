import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ChitCalculatorProps {
  onOpenModal: (schemeTitle: string) => void;
}

export const ChitCalculator: React.FC<ChitCalculatorProps> = ({ onOpenModal }) => {
  const [chitAmount, setChitAmount] = useState<number>(500000);
  const [tenure, setTenure] = useState<number>(50);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const grossInstallment = Math.round(chitAmount / tenure);
  const avgDividend = Math.round(grossInstallment * 0.21);
  const netInstallment = grossInstallment - avgDividend;
  const totalDividendSavings = avgDividend * (tenure - 1);
  const typicalPrizeMoney = Math.round(chitAmount * 0.78);

  const presets = [
    { label: '₹1 Lakh', value: 100000 },
    { label: '₹2 Lakhs', value: 200000 },
    { label: '₹5 Lakhs', value: 500000 },
    { label: '₹10 Lakhs', value: 1000000 },
    { label: '₹25 Lakhs', value: 2500000 },
  ];

  return (
    <section className="calc-section" id="calculator">
      <div className="container">
        <div className="section-header" style={{ marginBottom: '36px' }}>
          <span className="section-kicker">Interactive Financial Planner</span>
          <h2 className="section-title">Calculate Your Returns & Liquidity</h2>
        </div>

        <div className="calc-card-container">
          {/* Controls Column */}
          <div className="calc-controls-col">
            <div>
              <div className="control-block-header">
                <span className="control-label">Total Chit Value</span>
                <span className="control-display-value">{formatINR(chitAmount)}</span>
              </div>
              <input 
                type="range"
                className="custom-range"
                min={100000}
                max={2500000}
                step={50000}
                value={chitAmount}
                onChange={(e) => setChitAmount(Number(e.target.value))}
              />
              <div className="slider-quick-buttons">
                {presets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    className={`btn-chip ${chitAmount === preset.value ? 'active' : ''}`}
                    onClick={() => setChitAmount(preset.value)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="control-block-header">
                <span className="control-label">Tenure Duration</span>
              </div>
              <div className="duration-toggle">
                <button
                  type="button"
                  className={`duration-btn ${tenure === 25 ? 'active' : ''}`}
                  onClick={() => setTenure(25)}
                >
                  25 Months (Fast-Track)
                </button>
                <button
                  type="button"
                  className={`duration-btn ${tenure === 50 ? 'active' : ''}`}
                  onClick={() => setTenure(50)}
                >
                  50 Months (Wealth Builder)
                </button>
              </div>
            </div>

            <div style={{ background: '#F1F5F9', padding: '16px', borderRadius: '12px', fontSize: '0.85rem', color: '#475569', display: 'flex', gap: '10px' }}>
              <Sparkles size={20} style={{ color: '#2563EB', flexShrink: 0 }} />
              <div>
                <strong>Smart Saver Advantage:</strong> Non-prized subscribers receive monthly auction dividend deductions directly from their gross installment, resulting in an effective 8%–12% annual gain.
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="calc-results-col">
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
              Effective Monthly Outflow
            </div>
            <div className="result-main-val" style={{ margin: '6px 0 2px' }}>
              {formatINR(netInstallment)}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '24px' }}>
              Gross Installment: {formatINR(grossInstallment)} / mo
            </div>

            <div className="result-grid-breakdown">
              <div className="breakdown-box">
                <div className="breakdown-title">Avg. Monthly Dividend</div>
                <div className="breakdown-amount" style={{ color: '#4ADE80' }}>
                  - {formatINR(avgDividend)} / mo
                </div>
              </div>
              <div className="breakdown-box">
                <div className="breakdown-title">Total Est. Dividend Savings</div>
                <div className="breakdown-amount">
                  {formatINR(totalDividendSavings)}
                </div>
              </div>
              <div className="breakdown-box" style={{ gridColumn: 'span 2' }}>
                <div className="breakdown-title">Accessible Emergency/Business Liquidity (Prize Bid)</div>
                <div className="breakdown-amount" style={{ color: '#FDE047' }}>
                  {formatINR(typicalPrizeMoney)}
                </div>
              </div>
            </div>

            <button 
              className="btn-join-calc"
              onClick={() => onOpenModal(`Chit Value ${formatINR(chitAmount)} (${tenure} Months)`)}
            >
              Join This Chit Group
              <ArrowRight size={18} style={{ display: 'inline', marginLeft: '8px', verticalAlign: 'middle' }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
