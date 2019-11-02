import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { ReactNode } from 'react';
import './FormField.scss';

interface InputProps {
  name?: string;
  icon?: IconProp;
  children: ReactNode;
}

export const FormField = ({ name, icon, children }: InputProps) => {
  return (
    <div className="FormField">
      {name ? <div className="FormField--name">{name}</div> : null}

      <div>{children}</div>
    </div>
  );
};
