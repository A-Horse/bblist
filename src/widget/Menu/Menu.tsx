import React, { ReactNode, MouseEvent } from 'react';
import './Menu.scss';

export function AppMenuItem(props: { children: ReactNode, onClick?: (event: MouseEvent<HTMLLIElement>) => void }) {
  return <li className="AppMenuItem" onClick={props.onClick}>{props.children}</li>;
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
