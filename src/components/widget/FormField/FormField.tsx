import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ReactNode } from 'react';

interface InputProps {
  name: string;
  icon: IconProp;
  children: ReactNode;
}

export const FormField = ({ name, icon, children }: InputProps) => {
  return (
    <div>
      <div>{name}</div>
      <div>{children}</div>
    </div>
  );
};
