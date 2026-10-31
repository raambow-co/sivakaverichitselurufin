import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenModal: (scheme?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Header */}
      <header className="site-header">
        <div className="nav-container">
          <a href="#" className="brand-wrapper">
            <img src="/assets/brand_crest.jpg" alt="Siva Kaveri Chits Logo" className="brand-crest" />
            <div>
              <div className="brand-title">Siva Kaveri Chits</div>
              <div className="brand-subtitle">Govt. Registered Institution</div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-links">
              <li><a href="#schemes" className="nav-link-item">Chit Schemes</a></li>
              <li><a href="#calculator" className="nav-link-item">Calculator</a></li>
              <li><a href="#mandate" className="nav-link-item">Zero Cash</a></li>
              <li><a href="#pillars" className="nav-link-item">Guarantees</a></li>
              <li><a href="#faq" className="nav-link-item">FAQ</a></li>
              <li><a href="#contact" className="nav-link-item">Branches</a></li>
            </ul>
          </nav>

          {/* Right Desktop Actions */}
          <div className="nav-actions">
            <button 
              type="button" 
              className="search-icon-btn" 
              onClick={() => onOpenModal('Search Chit Schemes')}
              aria-label="Search Chit Schemes"
            >
              <Search size={18} />
            </button>

            <button 
              type="button"
              className="btn-open-account" 
              onClick={() => onOpenModal('Join a Chit')}
            >
              Join a Chit
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div 
          id="mobile-nav-drawer"
          className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="mobile-nav-inner">
            <ul className="mobile-nav-links">
              <li><a href="#schemes" className="mobile-nav-link" onClick={handleNavClick}>Chit Schemes</a></li>
              <li><a href="#calculator" className="mobile-nav-link" onClick={handleNavClick}>Calculator</a></li>
              <li><a href="#mandate" className="mobile-nav-link" onClick={handleNavClick}>Zero Cash</a></li>
              <li><a href="#pillars" className="mobile-nav-link" onClick={handleNavClick}>Guarantees</a></li>
              <li><a href="#faq" className="mobile-nav-link" onClick={handleNavClick}>FAQ</a></li>
              <li><a href="#contact" className="mobile-nav-link" onClick={handleNavClick}>Branches</a></li>
            </ul>

            <div className="mobile-nav-actions">
              <button 
                type="button"
                className="mobile-btn-search"
                onClick={() => {
                  handleNavClick();
                  onOpenModal('Search Chit Schemes');
                }}
              >
                <Search size={16} />
                <span>Search Schemes</span>
              </button>

              <button 
                type="button"
                className="mobile-btn-cta"
                onClick={() => {
                  handleNavClick();
                  onOpenModal('Join a Chit');
                }}
              >
                Join a Chit
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
