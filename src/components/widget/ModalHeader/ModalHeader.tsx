import './ModalHeader.scss';

import React from 'react';

import { AppButton } from '../Button';
import { AppIcon } from '../Icon';

interface InputProps {
  title?: string;
  onClose?: any;
  cover?: boolean;
}

export const ModalHeader = ({ title, onClose, cover }: InputProps) => {
  return (
    <div className={`ModalHeader${cover ? ' cover' : ''}`}>
      {title}
      <div className="ModalHeader--buttons">
        <AppButton onClick={onClose}>
          <AppIcon icon="times" size="lg" />
        </AppButton>
      </div>
    </div>
  );
};
