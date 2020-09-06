import React from 'react';
import { AppModal } from '../../widget/Modal/AppModal';

export function Popup({ isOpen, children, position, onClose }) {
  return (
    <AppModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'transparent',
        },
        content: {
          position: 'absolute',
          top: position.y,
          left: position.x,
          right: 'initial',
          bottom: 'initial',
          transform: 'translate(0, 0)',
        },
      }}
    >
      {children}
    </AppModal>
  );
}
