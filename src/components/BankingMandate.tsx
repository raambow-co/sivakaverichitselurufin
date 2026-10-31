import React from 'react';
import { ShieldCheck, Landmark, ArrowRightLeft } from 'lucide-react';

export const BankingMandate: React.FC = () => {
  return (
    <section className="mandate-section" id="mandate">
      <div className="container">
        <div className="mandate-card">
          <div className="mandate-header-row">
            <div className="mandate-title-group">
              <span className="mandate-kicker">
                <Landmark size={14} />
                <span>Statutory Banking Mandate</span>
              </span>

              <h2 className="mandate-title">
                100% Direct Banking Settlement. <span>Strict Zero-Cash Policy.</span>
              </h2>

              <p className="mandate-desc">
                To guarantee complete transparency and comply with Reserve Bank of India and Central Chit Funds Act guidelines, all subscriptions and auction disbursements flow strictly between verified bank accounts. No loose paper cash is ever collected.
              </p>
            </div>
          </div>

          <div className="mandate-features-grid">
            <div className="mandate-feature-box">
              <div className="mandate-feature-icon">
                <ArrowRightLeft size={18} />
              </div>
              <h4 className="mandate-feature-title">Verified Bank-to-Bank Channels</h4>
              <p className="mandate-feature-text">
                Subscriptions and auction payouts are executed exclusively via official channels: NEFT, RTGS, IMPS, UPI, and Account Payee Cheques with instant electronic receipts.
              </p>
            </div>

            <div className="mandate-feature-box">
              <div className="mandate-feature-icon">
                <Landmark size={18} />
              </div>
              <h4 className="mandate-feature-title">No Hand-to-Hand Cash Collections</h4>
              <p className="mandate-feature-text">
                No employee or agent is authorized to accept loose paper cash. Funds transfer directly into our designated Scheduled Commercial Bank escrow accounts.
              </p>
            </div>

            <div className="mandate-feature-box">
              <div className="mandate-feature-icon">
                <ShieldCheck size={18} />
              </div>
              <h4 className="mandate-feature-title">100% Statutory Escrow Deposit</h4>
              <p className="mandate-feature-text">
                Under Section 20(1)(a) of the Central Chit Funds Act, 1982, 100% of the aggregate chit value is deposited in a Scheduled Bank FD and pledged with the Registrar of Chits before launch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BankingMandate;
