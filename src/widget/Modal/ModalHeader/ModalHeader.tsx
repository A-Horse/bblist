import React, { ReactNode } from 'react';
import { AppButton } from '../../Button';
import { AppIcon } from '../../Icon';

import './ModalHeader.scss';

interface InputProps {
  title?: string;
  onClose?: any;
  children?: ReactNode;
  hiddenBorder?: boolean;
}

export const ModalHeader = ({
  title,
  onClose,
  children,
  hiddenBorder,
}: InputProps) => {
  return (
    <div
      className={`ModalHeader`}
      style={{
        ...(hiddenBorder
          ? {
              border: 'none',
            }
          : {}),
      }}
    >
      {children ? children : <div className="ModalHeader--title">{title}</div>}
      <div className="ModalHeader--buttons">
        <AppButton onClick={onClose}>
          <AppIcon icon="times" size="lg" />
        </AppButton>
      </div>
    </div>
  );
};
