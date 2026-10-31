import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  schemeTitle: string;
  onShowToast: (msg: string) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  schemeTitle,
  onShowToast,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      onShowToast('⚠️ Please enter a valid 10-digit mobile number.');
      return;
    }
    onShowToast(`Slot reservation requested for ${schemeTitle || 'Selected Chit'}! Our officer will connect with ${phone}.`);
    onClose();
    setName('');
    setPhone('');
    setCity('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#F1F5F9',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B'
          }}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
            Reserve Your Slot
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#2563EB', fontWeight: 700 }}>
            {schemeTitle || 'Select your preferred chit group'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Full Name (as per Bank A/c)
            </label>
            <input 
              type="text" 
              className="input-control" 
              placeholder="Enter full name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              10-Digit Mobile Number
            </label>
            <input 
              type="tel" 
              className="input-control" 
              placeholder="Phone number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required 
              pattern="[0-9]{10}" 
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              City / District
            </label>
            <input 
              type="text" 
              className="input-control" 
              placeholder="e.g. Vijayawada, Guntur, Hyderabad, Visakhapatnam" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            style={{
              width: '100%',
              background: '#2563EB',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '1rem',
              padding: '14px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Confirm Slot Reservation
          </button>

          <p style={{ fontSize: '0.75rem', color: '#94A3B8', textAlign: 'center', marginTop: '12px' }}>
            🔒 Strictly direct bank-to-bank transactions. No cash collection.
          </p>
        </form>
      </div>
    </div>
  );
};
