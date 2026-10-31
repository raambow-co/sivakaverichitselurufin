import React, { useState, useEffect, useRef } from 'react';

interface PillarSlide {
  num: string;
  tag: string;
  oneWordTitle: string;
  fullTitle: string;
  desc: string;
  points: string[];
  imageSrc: string;
  imageAlt: string;
}

export const Pillars: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const pillars: PillarSlide[] = [
    {
      num: '01',
      tag: 'Statutory Clout',
      oneWordTitle: 'Statutory.',
      fullTitle: 'Government Registered & Governed',
      desc: 'Siva Kaveri Chits operates with strict licensure under the Central Chit Funds Act, 1982 (Act No. 40 of 1982) and State Chit Rules.',
      points: [
        'Registered with the State Registrar of Chits',
        'Official Statutory Approval for each group',
        'Regular statutory audits & financial transparency',
      ],
      imageSrc: '/assets/pillar_gold_seal.png',
      imageAlt: '3D Golden Statutory Legal Crest',
    },
    {
      num: '02',
      tag: 'Capital Protection',
      oneWordTitle: 'Guaranteed.',
      fullTitle: '100% Statutory Bank Guarantee',
      desc: 'Your principal is legally shielded. By law, before a single member is enrolled, the company pledges equivalent funds with the Government.',
      points: [
        '100% gross chit amount placed in Scheduled Bank Fixed Deposits',
        'Pledged directly in the name of the Registrar of Chits',
        'Unconditional subscriber protection against default',
      ],
      imageSrc: '/assets/pillar_gold_shield.png',
      imageAlt: '3D Golden 100% Security Guarantee Shield',
    },
    {
      num: '03',
      tag: 'Banking Integrity',
      oneWordTitle: 'Direct.',
      fullTitle: '100% Direct Banking Transactions',
      desc: 'Zero cash handling. All transactions flow strictly between your verified bank account and the company’s designated chit accounts.',
      points: [
        'UPI, NEFT, RTGS, IMPS, and Account Payee Cheques only',
        'Direct bank-to-bank prize money credits within 48 hours',
        'Instant electronic receipts & digital ledger audit trail',
      ],
      imageSrc: '/assets/pillar_gold_bank.png',
      imageAlt: '3D Golden Bank Vault Door and Direct Transfer Emblem',
    },
    {
      num: '04',
      tag: 'Auction Transparency',
      oneWordTitle: 'Open.',
      fullTitle: 'Open & Documented Auctions',
      desc: 'Monthly auctions are conducted with absolute transparency where every subscriber has equal rights to bid or simply earn dividends.',
      points: [
        'Live in-person or verified digital auction attendance',
        'Immediate publishing of auction bid minutes to all members',
        'Equal dividend distribution credited directly to your monthly dues',
      ],
      imageSrc: '/assets/pillar_gold_auction.png',
      imageAlt: '3D Golden Auction Gavel and Scales of Justice Medallion',
    },
  ];

  // Total slides = 1 (Intro) + 4 (Pillars) = 5 slides
  const totalSlides = 5;

  useEffect(() => {
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
            const p = Math.max(0, Math.min(1, scrolled / totalDistance));
            setProgress(p);

            const currentIdx = Math.min(Math.max(0, Math.round(p * (totalSlides - 1))), totalSlides - 1);
            setActiveSlide(currentIdx);
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
  }, [totalSlides]);

  const scrollToSlide = (index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalDistance = rect.height - windowH;
    const sectionTopAbs = window.scrollY + rect.top;

    const targetProgress = index / (totalSlides - 1);
    const targetScrollY = sectionTopAbs + targetProgress * totalDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  // Touch Swipe on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeSlide < totalSlides - 1) {
        scrollToSlide(activeSlide + 1);
      } else if (diff < 0 && activeSlide > 0) {
        scrollToSlide(activeSlide - 1);
      }
    }
    touchStartX.current = null;
  };

  // Horizontal translation percentage (from 0% to -(totalSlides - 1) * 100%)
  const continuousProgress = progress * (totalSlides - 1);
  const translateXPercent = -progress * ((totalSlides - 1) * 100);

  // Helper calculating continuous 3D scale, rotation, and perspective transforms
  const getSlideTransforms = (slideIdx: number) => {
    const diff = slideIdx - continuousProgress; // 0 = centered, >0 = entering right, <0 = exiting left
    const absDiff = Math.abs(diff);

    // 1. 3D GOLD IMAGE DYNAMICS (Matches Stable Money Reference):
    // Entering (diff > 0): starts significantly BIGGER (~1.44x), forward in Z (+80px), tilted in 3D (-26deg Y)
    // Resting (diff ~ 0): smoothly settles down to normal size (1.0x) and straightens in position
    // Exiting (diff < 0): DOES NOT VANISH! Stays 100% visible and VISIBLY SHRINKS down to ~0.50x, tilts away (+30deg Y)
    let imgScale = 1;
    let imgRotateY = 0;
    let imgRotateX = 0;
    let imgTranslateZ = 0;
    let imgTranslateX = 0;
    let imgOpacity = 1;
    let imgFilter = 'drop-shadow(0 20px 30px rgba(180, 140, 60, 0.22))';

    if (diff > 0) {
      // ENTERING FROM RIGHT
      const enterProgress = Math.min(diff, 1.25);
      const eased = enterProgress <= 0.05 ? 0 : Math.sin(((enterProgress - 0.05) / 1.2) * (Math.PI / 2));
      
      imgScale = 1 + eased * 0.44; // Big in initial state (~1.44x)
      imgRotateY = -eased * 26; // Tilted towards viewer
      imgRotateX = eased * 4;
      imgTranslateZ = eased * 80; // Elevated towards viewer
      imgTranslateX = eased * 40;
      // Stays visible, only hidden if way offscreen (>1.4 screens away)
      imgOpacity = enterProgress > 1.35 ? 0 : 1;
      imgFilter = `drop-shadow(0 ${20 + eased * 18}px ${30 + eased * 18}px rgba(180, 140, 60, ${0.22 + eased * 0.16}))`;
    } else if (diff < 0) {
      // LEAVING TOWARDS LEFT (WHEN THE NEXT SLIDE ENTERS)
      // Must NOT vanish! Must visibly decrease in size as seen in Stable Money reference
      const exitProgress = Math.min(absDiff, 1.25);
      const eased = exitProgress <= 0.05 ? 0 : Math.sin(((exitProgress - 0.05) / 1.2) * (Math.PI / 2));

      imgScale = Math.max(0.48, 1 - eased * 0.52); // Visibly shrinks down to ~0.48x!
      imgRotateY = eased * 30; // Tilts away
      imgRotateX = -eased * 3;
      imgTranslateZ = 0; // Avoid negative Z clipping behind background planes!
      imgTranslateX = -eased * 70; // Glides smoothly to the left
      // 100% OPAQUE and VISIBLE while on screen! Only fades out once fully off-screen (absDiff > 1.15)
      imgOpacity = exitProgress > 1.15 ? Math.max(0, 1 - (exitProgress - 1.15) * 5) : 1;
      imgFilter = `drop-shadow(0 ${Math.max(6, 20 - eased * 12)}px ${Math.max(10, 30 - eased * 16)}px rgba(180, 140, 60, ${Math.max(0.1, 0.22 - eased * 0.1)}))`;
    }

    // 2. TEXT COLUMN DYNAMICS:
    // Entering (diff > 0): starts visibly larger (~1.22x) and settles to 1.0 at center
    // Exiting (diff < 0): DOES NOT VANISH! Visibly shrinks in size down to ~0.60x as it slides to the left
    let textScale = 1;
    let textTranslateX = 0;
    let textOpacity = 1;

    if (diff > 0) {
      const enterProgress = Math.min(diff, 1.25);
      const eased = enterProgress <= 0.05 ? 0 : Math.sin(((enterProgress - 0.05) / 1.2) * (Math.PI / 2));

      textScale = 1 + eased * 0.22; // Big entering
      textTranslateX = eased * 60;
      textOpacity = enterProgress > 1.35 ? 0 : 1;
    } else if (diff < 0) {
      const exitProgress = Math.min(absDiff, 1.25);
      const eased = exitProgress <= 0.05 ? 0 : Math.sin(((exitProgress - 0.05) / 1.2) * (Math.PI / 2));

      textScale = Math.max(0.58, 1 - eased * 0.42); // Visibly shrinks down to ~0.58x!
      textTranslateX = -eased * 90;
      // Stays 100% opaque across viewport, only fades as it passes the left edge
      textOpacity = exitProgress > 1.1 ? Math.max(0, 1 - (exitProgress - 1.1) * 5) : 1;
    }

    // 3. WATERMARK NUMBER (01, 02, etc.):
    const watermarkTranslateX = diff * 90;
    const watermarkScale = diff > 0 
      ? 1 + Math.min(diff, 1) * 0.25 
      : Math.max(0.58, 1 - Math.min(absDiff, 1) * 0.42);
    const watermarkOpacity = Math.max(0, 0.45 - absDiff * 0.32);

    return {
      imageTransform: `translate3d(${imgTranslateX}px, 0, ${imgTranslateZ}px) rotateY(${imgRotateY}deg) rotateX(${imgRotateX}deg) scale3d(${imgScale}, ${imgScale}, 1)`,
      imageFilter: imgFilter,
      imageOpacity: imgOpacity,
      textTransform: `translate3d(${textTranslateX}px, 0, 0) scale3d(${textScale}, ${textScale}, 1)`,
      textOpacity: textOpacity,
      watermarkTransform: `translate3d(${watermarkTranslateX}px, -50%, 0) scale3d(${watermarkScale}, ${watermarkScale}, 1)`,
      watermarkOpacity: watermarkOpacity,
    };
  };

  // Intro Slide transforms
  const introDiff = 0 - continuousProgress;
  const introExit = Math.min(Math.abs(introDiff), 1.25);
  const introEased = introExit <= 0.05 ? 0 : Math.sin(((introExit - 0.05) / 1.2) * (Math.PI / 2));
  const introScale = Math.max(0.65, 1 - introEased * 0.35);
  const introTranslateX = introDiff * 80;
  const introOpacity = introExit > 1.1 ? Math.max(0, 1 - (introExit - 1.1) * 5) : 1;

  return (
    <section 
      ref={sectionRef} 
      className="pillars-horizontal-section" 
      id="pillars"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="pillars-sticky-viewport">
        {/* Horizontal Moving Track */}
        <div 
          className="pillars-horizontal-track"
          style={{
            transform: `translate3d(${translateXPercent / totalSlides}%, 0, 0)`,
          }}
        >
          {/* SLIDE 0: INTRO SLIDE (Stable Money Style) */}
          <div className="pillar-slide-item intro-slide">
            <div 
              className="pillar-intro-content"
              style={{
                transform: `translate3d(${introTranslateX}px, 0, 0) scale3d(${introScale}, ${introScale}, 1)`,
                opacity: introOpacity,
              }}
            >
              <span className="pillar-kicker-tag">[ WHY SIVA KAVERI CHITS ]</span>
              <h2 className="pillar-intro-title">
                The 4 promises.
              </h2>
              <p className="pillar-intro-subtitle">
                For generations, disciplined savers have relied on regulated chits for systematic wealth creation and timely liquidity. Siva Kaveri Chits was built on strict statutory bank protection and transparent governance. Here is how we honour that trust.
              </p>

              {/* Sub-nav Category Strip */}
              <div className="pillar-subnav-strip">
                <button type="button" onClick={() => scrollToSlide(1)}>STATUTORY</button>
                <span>·</span>
                <button type="button" onClick={() => scrollToSlide(2)}>GUARANTEED</button>
                <span>·</span>
                <button type="button" onClick={() => scrollToSlide(3)}>DIRECT</button>
                <span>·</span>
                <button type="button" onClick={() => scrollToSlide(4)}>TRANSPARENT</button>
              </div>
            </div>
          </div>

          {/* SLIDES 1 to 4: THE 4 INSTITUTIONAL PILLARS */}
          {pillars.map((p, idx) => {
            const slideIdx = idx + 1; // Slide indices 1 to 4
            const t = getSlideTransforms(slideIdx);

            return (
              <div key={p.num} className="pillar-slide-item detail-slide">
                {/* Huge Background Watermark Number (01, 02, 03, 04) with Depth Parallax */}
                <div 
                  className="pillar-watermark-number"
                  style={{
                    transform: t.watermarkTransform,
                    opacity: t.watermarkOpacity,
                  }}
                >
                  {p.num}
                </div>

                <div className="pillar-slide-inner-grid">
                  {/* Left Editorial Content with Dynamic Scale Transition */}
                  <div 
                    className="pillar-slide-text-col"
                    style={{
                      transform: t.textTransform,
                      opacity: t.textOpacity,
                    }}
                  >
                    <h3 className="pillar-one-word-title">
                      {p.oneWordTitle}
                    </h3>

                    <div className="pillar-accent-line" />

                    <h4 className="pillar-full-subtitle">
                      {p.fullTitle}
                    </h4>

                    <p className="pillar-desc-paragraph">
                      {p.desc}
                    </p>

                    <ul className="pillar-bullet-points">
                      {p.points.map((pt, pIdx) => (
                        <li key={pIdx}>
                          <span className="pillar-bullet-dot">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right 3D Gold Luxury Emblem: Big entering (~1.48x) -> Normal resting (1.0x) -> Shrinks exiting (~0.54x) */}
                  <div className="pillar-slide-visual-col">
                    <div className="pillar-image-wrapper">
                      <img 
                        src={p.imageSrc} 
                        alt={p.imageAlt}
                        className="pillar-3d-gold-image"
                        loading="lazy"
                        style={{
                          transform: t.imageTransform,
                          filter: t.imageFilter,
                          opacity: t.imageOpacity,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pinned Controls Bar */}
        <div className="pillars-bottom-control-bar">
          <div className="pillars-nav-dots">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`pillar-dot ${idx === activeSlide ? 'active' : ''}`}
                onClick={() => scrollToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pillars;
