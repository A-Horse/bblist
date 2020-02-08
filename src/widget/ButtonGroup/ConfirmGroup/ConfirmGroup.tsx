import React from 'react';
import { AppButton } from '../../Button';

import './ConfirmButtonGroup.scss';

export function ConfirmButtonGroup({
  onConfirm,
  onCancel,
  confirmText = '确认'
}) {
  return (
    <div className="ConfirmButtonGroup">
      <AppButton type="primary" onClick={onConfirm}>
        {confirmText}
      </AppButton>
      <AppButton type="dashed" onClick={onCancel}>
        取消
      </AppButton>
    </div>
  );
}
