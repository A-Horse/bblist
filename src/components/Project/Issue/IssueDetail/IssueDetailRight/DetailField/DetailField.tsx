import React from 'react';

import './DetailField.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AppIcon } from '../../../../../widget/Icon';

interface InputProps {
  title: string;
  icon: IconProp;
  onClick: any;
  bgColor: string;
}

export function DetailRightField({
  title,
  icon,
  onClick,
  bgColor
}: InputProps) {
  return (
    <div
      className="DetailRightField"
      onClick={onClick}
      style={{
        background: bgColor
      }}
    >
      <AppIcon icon={icon} />
      {title}
    </div>
  );
}
