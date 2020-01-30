import React from 'react';

import './DetailField.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AppIcon } from '../../../../../widget/Icon';

interface InputProps {
  active?: boolean;
  title: string;
  icon: IconProp;
  onClick: any;
}

export function DetailRightField({ active, title, icon, onClick }: InputProps) {
  return (
    <div
      className={`DetailRightField${active ? ' active' : ''}`}
      onClick={onClick}
      style={{}}
    >
      <AppIcon icon={icon} />
      {title}
    </div>
  );
}
