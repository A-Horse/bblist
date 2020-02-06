import React from 'react';
import { AppIcon } from '../../../../../widget/Icon';

import './DetailSection.scss';

export function DetailSection({ icon, children }: any) {
  return (
    <div className="DetailSection">
      <div className="DetailSection--left">
        {icon && <AppIcon icon={icon} />}
      </div>
      <div className="DetailSection--right">{children}</div>
    </div>
  );
}
