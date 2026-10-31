import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeroDock } from './components/HeroDock';
import { LiveAuctionTicker } from './components/LiveAuctionTicker';
import { ChitCalculator } from './components/ChitCalculator';
import { ChitSchemes } from './components/ChitSchemes';
import { BankingMandate } from './components/BankingMandate';
import { Pillars } from './components/Pillars';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalScheme, setModalScheme] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [toastMsg, setToastMsg] = useState('');

  const handleOpenModal = (schemeTitle: string = 'General Inquiry') => {
    setModalScheme(schemeTitle);
    setModalOpen(true);
  };

  const handleShowToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 4500);
  };

  const handleSelectDockCategory = (cat: string) => {
    if (cat === 'mandate') {
      const el = document.getElementById('mandate');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setSelectedCategory(cat);
      const el = document.getElementById('schemes');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-root">
      {/* Navbar with 5paisa search pill and top announcement */}
      <Navbar onOpenModal={handleOpenModal} />


      {/* Hero with exact 5paisa vibrant royal blue theme & hand smartphone mockup */}
      <Hero onOpenModal={handleOpenModal} />

      {/* 5paisa Floating Bottom Product Dock */}
      <HeroDock onSelectCategory={handleSelectDockCategory} />

      {/* Live Rolling Auction Ticker */}
      <LiveAuctionTicker />

      {/* Interactive Chit Calculator */}
      <ChitCalculator onOpenModal={handleOpenModal} />

      {/* Active Schemes Catalog */}
      <ChitSchemes onOpenModal={handleOpenModal} activeCategory={selectedCategory} />

      {/* Banking Mandate (Zero Cash Policy Banner) */}
      <BankingMandate />

      {/* The 4 Institutional Pillars */}
      <Pillars />

      {/* FAQ Accordion */}
      <FAQSection />

      {/* Contact & Branch Network */}
      <ContactSection onShowToast={handleShowToast} />

      {/* Institutional Legal Footer */}
      <Footer />

      {/* Reservation & Quick Search Modal */}
      <ReservationModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        schemeTitle={modalScheme}
        onShowToast={handleShowToast}
      />

      {/* Global Toast Notification */}
      {toastMsg && (
        <div 
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#0B1320',
            color: '#FFFFFF',
            padding: '14px 22px',
            borderRadius: '12px',
            border: '1.5px solid #4ADE80',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
            fontSize: '0.875rem',
            fontWeight: 700,
            zIndex: 9999,
            animation: 'fadeIn 0.3s ease'
          }}
        >
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default App;
