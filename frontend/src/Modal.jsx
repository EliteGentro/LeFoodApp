import React from 'react';
import ReactDOM from 'react-dom'; // Corrected import for ReactDOM

// Styles for the modal
const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34, 34, 34)',
  transform: 'translate(-50%, -50%)', // Corrected transform property
  zIndex: 1000,
  height: '80%', // Adjusted height to prevent clipping
  width: '80%', // Adjusted width to prevent clipping
  overflowY: 'auto', // Added overflowY for vertical scrolling
  overflowX: 'hidden', // Prevent horizontal scrolling
  padding: '20px', // Added padding for better spacing
  borderRadius: '8px' // Added border-radius for better aesthetics
};

// Styles for the overlay
const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000
};

// Modal component to display content in a modal window
export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} /> {/* Overlay to close modal on click */}
      <div style={MODAL_STYLES}>
        <button className='btn bg-danger fs-4' style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  );
}
