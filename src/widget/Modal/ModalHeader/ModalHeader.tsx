import React, { ReactNode } from 'react';
import { AppButton } from '../../Button';
import { AppIcon } from '../../Icon';

import './ModalHeader.scss';

interface InputProps {
  title?: string;
  onClose?: any;
  children?: ReactNode;
}

export const ModalHeader = ({
  title,
  onClose,
  children
}: InputProps) => {
  return (
    <div className={`ModalHeader`}>
      {children ? children : <div className="ModalHeader--title">{title}</div>}
      <div className="ModalHeader--buttons">
        <AppButton onClick={onClose}>
          <AppIcon icon="times" size="lg" />
        </AppButton>
      </div>
    </div>
  );
};
