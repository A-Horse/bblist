import './ModalHeader.scss';

import React from 'react';

import { AppButton } from '../Button';
import { AppIcon } from '../Icon';

interface InputProps {
  title?: string;
  onClose?: any;
}

export const ModalHeader = ({ title, onClose }: InputProps) => {
  return (
    <div className="ModalHeader">
      {title}
      <div className="ModalHeader--buttons">
        <AppButton onClick={onClose}>
          <AppIcon icon="times" size="lg" />
        </AppButton>
      </div>
    </div>
  );
};
