import './FormField.scss';

import React, { ReactNode } from 'react';

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
}

export const FormField = ({
  name,
  icon,
  children,
  className = '',
  type,
  errorMessage,
  require = false
}: InputProps) => {
  return (
    <div className={`FormField ${type ? type : ''} ${className}`}>
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
