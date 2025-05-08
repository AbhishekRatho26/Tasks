import { useEffect, ReactNode } from 'react';
import {styled} from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
// import Button from './Button';
import {Button} from '@mui/material';
import { Box, Typography } from '@mui/material';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-4);
`;

const ModalContainer = styled(motion.div)<{ size: string }>`
  background-color: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-height: calc(100vh - var(--space-8));
  display: flex;
  flex-direction: column;
  
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return 'max-width: 400px;';
      case 'lg':
        return 'max-width: 800px;';
      case 'xl':
        return 'max-width: 1000px;';
      default:
        return 'max-width: 600px;';
    }
  }}
`;

const ModalHeader = styled(Box)`
  padding: var(--space-4) var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-gray-200);
`;

const ModalTitle = styled(Typography)`
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-gray-900);
`;

const CloseButton = styled(Button)`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-500);
  padding: var(--space-1);
  border-radius: var(--radius-full);
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--color-gray-100);
    color: var(--color-gray-700);
  }
`;

const ModalBody = styled(Box)`
  padding: var(--space-6);
  overflow-y: auto;
`;

const Modal = ({ isOpen, onClose, title, children, size = 'md' }: ModalProps) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContainer
            size={size}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              <CloseButton onClick={onClose}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;