import './FormField.scss';

import React, { ReactNode } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface InputProps {
  name?: string;
  icon?: IconProp;
  children: ReactNode;
  theme?: 'dark' | 'light';
  type?: 'major';
  className?: string;
}

export const FormField = ({
  name,
  icon,
  children,
  theme = 'light',
  className = '',
  type
}: InputProps) => {
  return (
    <div className={`FormField ${type ? type : ''} ${className}`}>
      {name ? (
        <div
          style={{
            color: theme === 'light' ? '#555' : '#fff'
          }}
          className={`FormField--name`}
        >
          {name}
        </div>
      ) : null}
      <div>{children}</div>
    </div>
  );
};
