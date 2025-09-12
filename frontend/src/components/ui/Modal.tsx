import React from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
      )}
      onClick={onClose}
    >
      <div className="bg-white p-6 rounded shadow-lg" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
