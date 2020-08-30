import React, { CSSProperties, forwardRef } from 'react';

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

export const DetailRightField = React.forwardRef<HTMLDivElement, InputProps>(
  (
    { active, title, icon, onClick, style, backgroundColor }: InputProps,
    ref
  ) => {
    return (
      <div
          ref={ref}
        className={`DetailRightField${active ? ' active' : ''}`}
        onClick={onClick}
        style={{
          ...style,
          backgroundColor: backgroundColor,
        }}
      >
        <AppIcon icon={icon} />
        {title}
      </div>
    );
  }
);
