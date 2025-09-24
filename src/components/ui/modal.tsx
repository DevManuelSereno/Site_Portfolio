'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore body overflow
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-full flex items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label="Fechar modal"
              >
                <X size={24} />
              </button>
            </div>
          )}
          
          {!title && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-slate-400 hover:text-slate-600 transition-colors p-1 bg-white rounded-full shadow-lg"
              aria-label="Fechar modal"
            >
              <X size={20} />
            </button>
          )}
          
          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;