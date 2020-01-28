import React from 'react';
import { AppButton } from '../Button';
import { AppIcon } from '../Icon';

import './ModalHeader.scss';

interface InputProps {
  title?: string;
  onClose?: any;
  cover?: boolean;
}

export const ModalHeader = ({ title, onClose, cover }: InputProps) => {
  return (
    <div className={`ModalHeader${cover ? ' cover' : ''}`}>
      <div className="ModalHeader--title">{title}</div>
      <div className="ModalHeader--buttons">
        <AppButton onClick={onClose}>
          <AppIcon icon="times" size="lg" />
        </AppButton>
      </div>
    </div>
  );
};
