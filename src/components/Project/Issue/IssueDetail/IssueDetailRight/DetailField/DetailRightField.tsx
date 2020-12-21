import React, { CSSProperties } from 'react';

import './DetailRightField.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AppIcon } from '../../../../../../widget/Icon';
import { useHover } from '../../../../../../hook/useHover';

interface InputProps {
  active?: boolean;
  title: string;
  icon: IconProp;
  style?: CSSProperties;
  backgroundColor?: string;
  hoverStyle?: CSSProperties;
  onClick: any;
}

export const DetailRightField = React.forwardRef<HTMLDivElement, InputProps>(
  (
    {
      active,
      title,
      icon,
      onClick,
      style,
      backgroundColor,
      hoverStyle,
    }: InputProps,
    ref
  ) => {
    const [hoverRef, isHover] = useHover(ref);
    return (
      <div
        ref={hoverRef}
        className={`DetailRightField${active ? ' active' : ''}`}
        onClick={onClick}
        style={{
          ...style,
          backgroundColor: backgroundColor,
          ...(isHover ? hoverStyle : {}),
        }}
      >
        <AppIcon icon={icon} />
        {title}
      </div>
    );
  }
);
