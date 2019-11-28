import './SectionField.scss';

import React, { ReactNode } from 'react';

interface InputProps {
  name: string;
  className?: string;
  children: ReactNode;
}

export const SectionField = ({ name, children, className }: InputProps) => {
  const classNameStr = `SectionField ${className || ''}`;

  return (
    <div className={classNameStr}>
      <div className="SectionField--name">{name}</div>

      <div className="SectionField--content">{children}</div>
    </div>
  );
};
