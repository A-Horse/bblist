import React, { ReactNode } from 'react';
import './Menu.scss';

export function AppMenuItem({ children }) {
  return <li className="AppMenuItem">{children}</li>;
}

interface AppMenuProps {
  children: ReactNode;
  className?: string;
  style?: any;
}
export function AppMenu({ children, className = '', style }: AppMenuProps) {
  return (
    <ul className={`AppMenu ${className}`} style={{ ...style }}>
      {children}
    </ul>
  );
}
