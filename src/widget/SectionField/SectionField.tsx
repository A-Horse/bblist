import './SectionField.scss';

import React, { ReactNode } from 'react';

interface InputProps {
  name: string;
  nameRight?: ReactNode;
  className?: string;
  transform?: boolean;
  children: ReactNode;
}

export const SectionField = ({
  name,
  children,
  className,
  transform,
  nameRight,
}: InputProps) => {
  const classNameStr = `SectionField ${className || ''}${
    transform ? ' transform' : ''
  }`;

  return (
    <div className={classNameStr}>
      <div className="SectionField--name">
        <span>{name}</span>
        {nameRight}
      </div>

      <div className="SectionField--content">{children}</div>
    </div>
  );
};
