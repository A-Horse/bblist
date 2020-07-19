import React, {CSSProperties} from 'react';

import './DetailRightField.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AppIcon } from '../../../../../../widget/Icon';

interface InputProps {
  active?: boolean;
  title: string;
  icon: IconProp;
  style?: CSSProperties;
  backgroundColor?: string;
  onClick: any;
}

export function DetailRightField({ active, title, icon, onClick, style, backgroundColor }: InputProps) {
  return (
    <div
      className={`DetailRightField${active ? ' active' : ''}`}
      onClick={onClick}
      style={{
          ...style,
        backgroundColor: backgroundColor
      }}
    >
      <AppIcon icon={icon} />
      {title}
    </div>
  );
}
