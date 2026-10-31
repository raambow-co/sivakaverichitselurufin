import React, { useState } from 'react';
import { ShieldCheck, PhoneCall, MessageSquare } from 'lucide-react';

interface FAQItem {
  id: string;
  q: string;
  a: string;
  citation: string;
}

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      id: '01',
      q: 'How can I verify that Siva Kaveri Chits is Government Registered?',
      citation: 'Section 4, Central Chit Funds Act, 1982',
      a: 'Every chit group commenced by Siva Kaveri Chits is registered under the Central Chit Funds Act, 1982. Prior to launching any group, formal statutory approval is obtained from the State Registrar of Chits. The official registration number and branch verification details are available upon request and printed on every subscriber agreement.',
    },
    {
      id: '02',
      q: 'Why do you strictly prohibit cash payments and hand-to-hand collections?',
      citation: '100% Institutional Banking Settlement',
      a: 'Siva Kaveri Chits enforces a 100% Institutional Banking Settlement policy to ensure complete transparency, eliminate fraud risk, and provide an irrefutable legal audit trail for both subscribers and regulators. By utilizing only direct banking channels (NEFT, RTGS, IMPS, UPI, and Account Payee Cheques), your money is immediately accounted for with instant electronic receipts.',
    },
    {
      id: '03',
      q: 'How does a subscriber earn returns if they do not bid early?',
      citation: 'Section 22, Auction Dividend Pool Distribution',
      a: 'If you join as a non-prized saver (you do not bid for the money), you earn an auction dividend every single month. In each auction, the discount surrendered by the winning bidder (after the foreman’s 5% statutory commission) is equally distributed among all members. This dividend is deducted from your next monthly installment, resulting in an effective net return of 8% to 12% per annum.',
    },
    {
      id: '04',
      q: 'What happens if another subscriber defaults on their installments?',
      citation: 'Section 25, Statutory Foreman Underwriting',
      a: 'Under Section 12 and Section 25 of the Chit Funds Act, 1982, the foreman company (Siva Kaveri Chits) bears 100% of the default risk. The company is legally obligated to advance its own funds to ensure the prized subscriber receives their payout on time. Subscribers never suffer a delay or loss due to another member’s default.',
    },
    {
      id: '05',
      q: 'How quickly is the prize money disbursed into my bank account?',
      citation: 'Direct Banking Settlement within 48h',
      a: 'Once your auction bid is confirmed and standard verification/surety documentation is completed, your prize money is disbursed directly to your verified bank account via RTGS/NEFT within 48 business hours. We do not issue cash disbursements under any circumstances.',
    },
  ];

  return (
    <section className="faq-hybrid-section" id="faq">
      <div className="container">
        
        {/* Top Header */}
        <div className="faq-top-header">
          <span className="faq-kicker-badge">[ STATUTORY CLARITY ]</span>
          <h2 className="faq-main-title">
            Frequently Asked Questions
          </h2>
          <p className="faq-sub-desc">
            Everything you need to know about our legal structure, zero-cash banking policy, and auction dynamics.
          </p>
        </div>

        {/* Content Grid */}
        <div className="faq-content-grid">
          
          {/* Left Slim Docket Card */}
          <div className="faq-sticky-docket">
            <div className="faq-docket-card">
              <span className="faq-docket-verified-pill">
                <ShieldCheck size={12} />
                <span>Registrar Approved</span>
              </span>

              <h3 className="faq-docket-title">
                Need Official Verification?
              </h3>
              <p className="faq-docket-desc">
                You are welcome to visit our registered office to inspect our Government Registration certificates and Bank Guarantee deposit receipts.
              </p>

              <a href="tel:+919876543210" className="faq-officer-btn">
                <PhoneCall size={13} />
                <span>Call Grievance Officer: +91 98765 43210</span>
              </a>

              <a 
                href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20verify%20Siva%20Kaveri%20Chits%20official%20government%20registration%20details."
                target="_blank" 
                rel="noopener noreferrer" 
                className="faq-whatsapp-link"
              >
                <MessageSquare size={13} />
                <span>Verify via WhatsApp →</span>
              </a>
            </div>
          </div>

          {/* Right Slim 5 FAQ Items */}
          <div className="faq-items-list">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div 
                  key={faq.id} 
                  className={`faq-instrument-card ${isOpen ? 'open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-instrument-btn"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <div className="faq-q-left-wrapper">
                      <span className="faq-q-index-tag">{faq.id}</span>
                      <h4 className="faq-q-title-text">{faq.q}</h4>
                    </div>

                    <span className="faq-toggle-icon">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-container">
                      <p className="faq-answer-main-text">
                        {faq.a}
                      </p>
                      <span className="faq-statutory-citation">
                        § {faq.citation}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default FAQSection;
