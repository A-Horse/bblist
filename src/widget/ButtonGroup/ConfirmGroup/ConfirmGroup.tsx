import React from 'react';
import { AppButton } from '../../Button';

import './ConfirmButtonGroup.scss';

interface InputProps {
  onConfirm: any;
  onCancel: any;
  confirmText?: string;
  confirmButtonType?: 'submit' | 'reset' | 'button';
}

export function ConfirmButtonGroup({
  onConfirm,
  onCancel,
  confirmText = '确认',
  confirmButtonType = 'button'
}: InputProps) {
  return (
    <div className="ConfirmButtonGroup">
      <AppButton
        htmlType={confirmButtonType}
        type="primary"
        onClick={onConfirm}
      >
        {confirmText}
      </AppButton>
      <AppButton type="dashed" onClick={onCancel}>
        取消
      </AppButton>
    </div>
  );
}
