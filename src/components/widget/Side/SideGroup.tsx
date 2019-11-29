import React, { ReactNode } from 'react';

interface InputProps {
  children: ReactNode;
}

export function SideGroup({ children }: InputProps) {
  return <div className="SideGroup">{children}</div>;
}
