import React, { ReactNode } from 'react';

import './SectionHeading.scss';

interface InputProps {
  size: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function SectionHeading({ size, children }: InputProps) {
  const fontSize: number = {
    sm: 13,
    md: 16,
    lg: 28,
  }[size];
  return (
    <div className="SessionHeading" style={{ fontSize }}>
      {children}
    </div>
  );
}
