import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Layers, 
  Grid3X3
} from 'lucide-react';

export interface Scheme {
  code: string;
  chitValue: string;
  numericValue: number;
  duration: string;
  tenureMonths: number;
  grossDue: string;
  effectiveAvg: string;
  totalSavings: string;
  prizeMoneyEst: string;
  members: number;
  slotsOpen: number;
  category: string[];
  tagline: string;
  badge: string;
  popular?: boolean;
}

interface ChitSchemesProps {
  onOpenModal: (schemeTitle: string) => void;
  activeCategory?: string;
}

export const ChitSchemes: React.FC<ChitSchemesProps> = ({ onOpenModal, activeCategory = 'all' }) => {
  const [filter, setFilter] = useState<string>(activeCategory);
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  const [continuousIndex, setContinuousIndex] = useState<number>(0);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const schemes: Scheme[] = [
    {
      code: 'SK-100R',
      chitValue: '₹1,00,000',
      numericValue: 100000,
      duration: '50 Months',
      tenureMonths: 50,
      grossDue: '₹2,000',
      effectiveAvg: '~₹1,580',
      totalSavings: '₹21,000',
      prizeMoneyEst: '₹78,000',
      members: 50,
      slotsOpen: 8,
      category: ['retail'],
      tagline: 'Disciplined starter monthly savings pool for retail subscribers',
      badge: 'Starter Tier',
    },
    {
      code: 'SK-200FT',
      chitValue: '₹2,00,000',
      numericValue: 200000,
      duration: '25 Months Fast-Track',
      tenureMonths: 25,
      grossDue: '₹8,000',
      effectiveAvg: '~₹6,320',
      totalSavings: '₹42,000',
      prizeMoneyEst: '₹1,56,000',
      members: 25,
      slotsOpen: 4,
      category: ['retail', 'fasttrack'],
      tagline: 'Rapid 25-month liquidity cycle for short-term working capital',
      badge: 'Fast-Track',
    },
    {
      code: 'SK-500B',
      chitValue: '₹5,00,000',
      numericValue: 500000,
      duration: '50 Months',
      tenureMonths: 50,
      grossDue: '₹10,000',
      effectiveAvg: '~₹7,900',
      totalSavings: '₹1,05,000',
      prizeMoneyEst: '₹3,90,000',
      members: 50,
      slotsOpen: 3,
      category: ['business'],
      tagline: 'Most popular scheme for merchants, traders & business owners',
      badge: 'Most Popular',
      popular: true,
    },
    {
      code: 'SK-1000B',
      chitValue: '₹10,00,000',
      numericValue: 1000000,
      duration: '50 Months',
      tenureMonths: 50,
      grossDue: '₹20,000',
      effectiveAvg: '~₹15,800',
      totalSavings: '₹2,10,000',
      prizeMoneyEst: '₹7,80,000',
      members: 50,
      slotsOpen: 6,
      category: ['business'],
      tagline: 'Substantial commercial capital pool for expanding business operations',
      badge: 'Commercial Tier',
    },
    {
      code: 'SK-1000FT',
      chitValue: '₹10,00,000',
      numericValue: 1000000,
      duration: '25 Months Fast-Track',
      tenureMonths: 25,
      grossDue: '₹40,000',
      effectiveAvg: '~₹31,600',
      totalSavings: '₹2,10,000',
      prizeMoneyEst: '₹7,80,000',
      members: 25,
      slotsOpen: 5,
      category: ['business', 'fasttrack'],
      tagline: 'High-velocity 25-month commercial turnover fund',
      badge: 'Fast-Track Business',
    },
    {
      code: 'SK-2500P',
      chitValue: '₹25,00,000',
      numericValue: 2500000,
      duration: '50 Months HNI Group',
      tenureMonths: 50,
      grossDue: '₹50,000',
      effectiveAvg: '~₹39,500',
      totalSavings: '₹5,25,000',
      prizeMoneyEst: '₹19,50,000',
      members: 50,
      slotsOpen: 2,
      category: ['premium'],
      tagline: 'Flagship wealth creation & institutional liquidity buffer for HNIs',
      badge: 'HNI Flagship',
    },
  ];

  useEffect(() => {
    if (activeCategory && activeCategory !== 'all') {
      setFilter(activeCategory);
    }
  }, [activeCategory]);

  const filteredSchemes = schemes.filter((s) => {
    if (filter === 'all') return true;
    return s.category.includes(filter);
  });

  // Scroll listener for the 3D scroll-driven animation
  useEffect(() => {
    if (viewMode !== '3d') return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false;
            return;
          }
          const rect = sectionRef.current.getBoundingClientRect();
          const windowH = window.innerHeight;
          const totalDistance = rect.height - windowH;

          if (totalDistance > 0) {
            const scrolled = -rect.top;
            const progress = Math.max(0, Math.min(1, scrolled / totalDistance));
            const count = filteredSchemes.length;
            const currentContinuous = progress * (count - 1);

            setContinuousIndex(currentContinuous);
            const rounded = Math.min(Math.max(0, Math.round(currentContinuous)), count - 1);
            setActiveIdx(rounded);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [filteredSchemes.length, viewMode]);

  // Smooth scroll to a target card index in the runway
  const scrollToCard = (targetIndex: number) => {
    if (!sectionRef.current || viewMode !== '3d') {
      setActiveIdx(targetIndex);
      return;
    }
    const rect = sectionRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalDistance = rect.height - windowH;
    const sectionTopAbs = window.scrollY + rect.top;

    const count = filteredSchemes.length;
    const targetProgress = count > 1 ? targetIndex / (count - 1) : 0;
    const targetScrollY = sectionTopAbs + targetProgress * totalDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  // 3D Parallax Mouse Movement on active card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 12;

    setMouseTilt({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  // Touch Swipe for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIdx < filteredSchemes.length - 1) {
        scrollToCard(activeIdx + 1);
      } else if (diff < 0 && activeIdx > 0) {
        scrollToCard(activeIdx - 1);
      }
    }
    touchStartX.current = null;
  };

  return (
    <section 
      ref={sectionRef} 
      className={`schemes-showcase-section ${viewMode === '3d' ? 'view-3d-runway' : 'view-grid-mode'}`}
      id="schemes"
    >
      {viewMode === '3d' ? (
        /* ================= FULL-WIDTH 3D SPATIAL STAGE ================= */
        <div className="schemes-3d-sticky-wrapper">
          <div className="full-width-stage-container">
            {/* Header: Centered & Minimal */}
            <div className="schemes-top-bar">
              <div className="schemes-top-title-wrap">
                <span className="section-kicker">
                  🏛️ Approved Groups · Central Chit Funds Act, 1982
                </span>
                <h2 className="section-title" style={{ marginBottom: '4px' }}>
                  Active & Upcoming Chit Schemes
                </h2>
              </div>

              {/* View Switcher: 3D Deck vs 6-Card Grid */}
              <div className="view-mode-toggle">
                <button
                  type="button"
                  className="view-toggle-btn active"
                  onClick={() => setViewMode('3d')}
                  title="3D Scroll Deck"
                >
                  <Layers size={16} />
                  <span>3D Deck</span>
                </button>
                <button
                  type="button"
                  className="view-toggle-btn"
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <Grid3X3 size={16} />
                  <span>All Plans</span>
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="scheme-filter-tabs">
              <button 
                className={`tab-pill ${filter === 'all' ? 'active' : ''}`}
                onClick={() => { setFilter('all'); scrollToCard(0); }}
              >
                All Groups ({schemes.length})
              </button>
              <button 
                className={`tab-pill ${filter === 'retail' ? 'active' : ''}`}
                onClick={() => { setFilter('retail'); scrollToCard(0); }}
              >
                Retail (₹1L - ₹3L)
              </button>
              <button 
                className={`tab-pill ${filter === 'business' ? 'active' : ''}`}
                onClick={() => { setFilter('business'); scrollToCard(0); }}
              >
                Business (₹5L - ₹10L)
              </button>
              <button 
                className={`tab-pill ${filter === 'premium' ? 'active' : ''}`}
                onClick={() => { setFilter('premium'); scrollToCard(0); }}
              >
                High Net-Worth (₹25L)
              </button>
              <button 
                className={`tab-pill ${filter === 'fasttrack' ? 'active' : ''}`}
                onClick={() => { setFilter('fasttrack'); scrollToCard(0); }}
              >
                25-Month Fast Track
              </button>
            </div>

            {/* FULL-WIDTH 3D SPATIAL DECK (Cards float across entire screen) */}
            <div 
              className="schemes-fullwidth-3d-deck"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {filteredSchemes.map((scheme, index) => {
                const offset = index - continuousIndex;
                const absOffset = Math.abs(offset);
                const isActive = index === activeIdx;

                // 3D Spatial Calculation spanning the full width
                // Negative offset = to the left, Positive offset = to the right
                const stepX = 490;
                const translateX = offset * stepX;
                const translateZ = -Math.min(absOffset * 220, 550);
                const rotateY = Math.max(-34, Math.min(34, -offset * 28));
                const translateY = absOffset * 10;
                const scale = Math.max(0.74, 1 - absOffset * 0.08);
                const opacity = Math.max(0, 1 - Math.max(0, absOffset - 1.2) * 0.65);
                const blurAmount = absOffset < 0.25 ? 0 : Math.min(5, (absOffset - 0.2) * 2.5);
                const zIndex = Math.round(100 - absOffset * 15);

                // Mouse parallax tilt on active card
                let tiltX = 0;
                let tiltY = 0;
                if (isActive) {
                  tiltX = mouseTilt.y;
                  tiltY = mouseTilt.x;
                }

                const transformStyle = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY + tiltY}deg) rotateX(${tiltX}deg) scale3d(${scale}, ${scale}, 1)`;

                return (
                  <article
                    key={scheme.code}
                    className={`card-3d-instrument ${isActive ? 'active-card' : 'side-card'}`}
                    style={{
                      transform: transformStyle,
                      opacity: opacity,
                      filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
                      zIndex: zIndex,
                      cursor: isActive ? 'default' : 'pointer',
                    }}
                    onMouseMove={isActive ? handleMouseMove : undefined}
                    onMouseLeave={isActive ? handleMouseLeave : undefined}
                    onClick={() => {
                      if (!isActive) scrollToCard(index);
                    }}
                  >
                    {/* Card Header */}
                    <div className="card-instrument-header">
                      <div className="card-chip-container">
                        <span className="card-code-tag">{scheme.code}</span>
                        <span className="card-govt-seal">🏛️ Govt. Approved</span>
                      </div>

                      <div className="card-badge-pill">
                        {scheme.badge}
                      </div>
                    </div>

                    {/* Main Value Banner */}
                    <div className="card-center-banner">
                      <div className="card-chit-label">Aggregate Chit Value</div>
                      <div className="card-huge-value">{scheme.chitValue}</div>
                      <div className="card-duration-badge">
                        <Clock size={14} />
                        <span>{scheme.duration}</span>
                      </div>
                    </div>

                    <p className="card-tagline-text">
                      {scheme.tagline}
                    </p>

                    {/* Financial Metrics Matrix */}
                    <div className="card-metrics-matrix">
                      <div className="matrix-cell">
                        <span className="matrix-label">Gross Monthly Due</span>
                        <span className="matrix-val">{scheme.grossDue}</span>
                      </div>
                      <div className="matrix-cell highlight-cell">
                        <span className="matrix-label">Effective Monthly (Avg)</span>
                        <span className="matrix-val emerald-text">{scheme.effectiveAvg}</span>
                      </div>
                      <div className="matrix-cell">
                        <span className="matrix-label">Est. Dividend Gain</span>
                        <span className="matrix-val">{scheme.totalSavings}</span>
                      </div>
                      <div className="matrix-cell">
                        <span className="matrix-label">Prize Bid Liquidity</span>
                        <span className="matrix-val">{scheme.prizeMoneyEst}</span>
                      </div>
                    </div>

                    {/* Slot Availability Progress */}
                    <div className="card-slots-indicator">
                      <div className="slots-header-row">
                        <span className="live-status-dot-wrap">
                          <span className="live-pulsing-dot" />
                          <strong>{scheme.slotsOpen} of {scheme.members} slots open</strong>
                        </span>
                        <span className="subscribed-percent">
                          {Math.round(((scheme.members - scheme.slotsOpen) / scheme.members) * 100)}% Subscribed
                        </span>
                      </div>
                      <div className="slots-progress-track">
                        <div 
                          className="slots-progress-fill" 
                          style={{ 
                            width: `${Math.round(((scheme.members - scheme.slotsOpen) / scheme.members) * 100)}%`
                          }} 
                        />
                      </div>
                    </div>

                    {/* Primary Reservation CTA Button */}
                    <button 
                      type="button" 
                      className="btn-card-reserve"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal(`${scheme.code} (${scheme.chitValue})`);
                      }}
                    >
                      Reserve Slot in {scheme.code}
                      <ArrowRight size={18} />
                    </button>

                    <div className="card-footer-guarantee">
                      <ShieldCheck size={14} style={{ color: '#16A34A' }} />
                      <span>100% Bank Deposited under Section 12 · Strict Zero Cash Policy</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ================= 6-CARD GRID VIEW MODE ================= */
        <div className="container" style={{ padding: '40px 0 80px' }}>
          <div className="schemes-top-bar" style={{ marginBottom: '32px' }}>
            <div className="schemes-top-title-wrap">
              <span className="section-kicker">Approved Groups · Central Chit Funds Act, 1982</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '4px' }}>
                All Active Chit Schemes
              </h2>
            </div>

            <div className="view-mode-toggle">
              <button
                type="button"
                className="view-toggle-btn"
                onClick={() => setViewMode('3d')}
                title="3D Scroll Deck"
              >
                <Layers size={16} />
                <span>3D Deck</span>
              </button>
              <button
                type="button"
                className="view-toggle-btn active"
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <Grid3X3 size={16} />
                <span>All Plans</span>
              </button>
            </div>
          </div>

          <div className="scheme-filter-tabs">
            <button 
              className={`tab-pill ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Groups
            </button>
            <button 
              className={`tab-pill ${filter === 'retail' ? 'active' : ''}`}
              onClick={() => setFilter('retail')}
            >
              Retail (₹1L - ₹3L)
            </button>
            <button 
              className={`tab-pill ${filter === 'business' ? 'active' : ''}`}
              onClick={() => setFilter('business')}
            >
              Business (₹5L - ₹10L)
            </button>
            <button 
              className={`tab-pill ${filter === 'premium' ? 'active' : ''}`}
              onClick={() => setFilter('premium')}
            >
              High Net-Worth (₹25L)
            </button>
            <button 
              className={`tab-pill ${filter === 'fasttrack' ? 'active' : ''}`}
              onClick={() => setFilter('fasttrack')}
            >
              25-Month Fast Track
            </button>
          </div>

          <div className="schemes-grid">
            {filteredSchemes.map((scheme) => (
              <article key={scheme.code} className="scheme-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="scheme-code">{scheme.code}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>{scheme.duration}</span>
                </div>

                <div className="scheme-val-amount">{scheme.chitValue}</div>

                <div style={{ flex: 1 }}>
                  <div className="scheme-detail-row">
                    <span style={{ color: '#64748B' }}>Gross Monthly Due:</span>
                    <span style={{ fontWeight: 700 }}>{scheme.grossDue}</span>
                  </div>
                  <div className="scheme-detail-row">
                    <span style={{ color: '#64748B' }}>Effective Monthly (Avg):</span>
                    <span style={{ fontWeight: 700, color: '#16A34A' }}>{scheme.effectiveAvg}</span>
                  </div>
                  <div className="scheme-detail-row">
                    <span style={{ color: '#64748B' }}>Total Members:</span>
                    <span style={{ fontWeight: 700 }}>{scheme.members} Subscribers</span>
                  </div>
                  <div className="scheme-detail-row">
                    <span style={{ color: '#64748B' }}>Govt. Registration:</span>
                    <span style={{ fontWeight: 700, color: '#2563EB' }}>Approved</span>
                  </div>
                </div>

                <div style={{ margin: '18px 0 6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Slots Remaining:</span>
                    <strong>{scheme.slotsOpen} of {scheme.members} open</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div 
                      className="slot-progress-fill" 
                      style={{ width: `${Math.round(((scheme.members - scheme.slotsOpen) / scheme.members) * 100)}%` }}
                    />
                  </div>
                </div>

                <button 
                  className="btn-reserve-slot"
                  onClick={() => onOpenModal(`${scheme.code} (${scheme.chitValue})`)}
                >
                  Reserve Slot
                </button>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ChitSchemes;
