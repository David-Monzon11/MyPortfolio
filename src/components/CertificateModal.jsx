import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import './CertificateModal.css';

export default function CertificateModal({ src, alt, onClose }) {
  // Lock body scroll on mount and unlock on unmount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="cert-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={onClose}
    >
      <motion.div
        className="cert-modal-container"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="cert-modal-close"
          onClick={onClose}
          aria-label="Close certificate viewer"
        >
          <X size={18} />
        </button>
        <div className="cert-modal-content">
          <img src={src} alt={alt || 'Certificate'} className="cert-modal-image" />
          {alt && <p className="cert-modal-caption">{alt}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
}
