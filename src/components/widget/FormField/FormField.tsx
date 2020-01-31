import './FormField.scss';

import React, { ReactNode } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface InputProps {
  name?: string;
  icon?: IconProp;
  children: ReactNode;
  theme?: 'dark' | 'light';
}

export const FormField = ({
  name,
  icon,
  children,
  theme = 'light'
}: InputProps) => {
  return (
    <div className="FormField">
      {name ? (
        <div
          style={{
            color: theme === 'light' ? '#888' : '#fff'
          }}
          className="FormField--name"
        >
          {name}
        </div>
      ) : null}
      <div>{children}</div>
    </div>
  );
};
