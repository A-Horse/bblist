import React from 'react';
import { AppButton } from '../../Button';

import './ConfirmButtonGroup.scss';

export function ConfirmButtonGroup({ onConfirm, onCancel }) {
  return (
    <div className="ConfirmButtonGroup">
      <AppButton type="primary" onClick={onConfirm}>
        确认
      </AppButton>
      <AppButton type="dashed" onClick={onCancel}>
        取消
      </AppButton>
    </div>
  );
}
