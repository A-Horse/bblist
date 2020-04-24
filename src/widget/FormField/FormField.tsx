import './FormField.scss';

import React, { ReactNode, CSSProperties } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ErrorMsg } from '../../components/ErrorMsg/ErrorMsg';

interface InputProps {
  name?: string;
  icon?: IconProp;
  children: ReactNode;
  type?: 'major';
  className?: string;
  errorMessage?: any;
  require?: boolean;
  style?: CSSProperties
}

export const FormField = ({
  name,
  icon,
  children,
  className = '',
  type,
  errorMessage,
  require = false,
  style
}: InputProps) => {
  return (
    <div className={`FormField ${type ? type : ''} ${className}`} style={{
      ...style
    }}>
      {name ? (
        <div className={`FormField--name`}>
          {name}
          {require && <span className="require-flag">*</span>}
        </div>
      ) : null}
      <div>{children}</div>
      <ErrorMsg message={errorMessage || ''} />
    </div>
  );
};
