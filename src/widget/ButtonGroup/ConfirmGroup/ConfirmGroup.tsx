import React, { CSSProperties } from 'react';
import { AppButton, ButtonType } from '../../Button';

import './ConfirmButtonGroup.scss';

interface InputProps {
  onConfirm: any;
  onCancel: any;
  confirmText?: string;
  confirmButtonHtmlType?: 'submit' | 'reset' | 'button';
  confirmButtonType?: ButtonType;
  center?: boolean;
  style?: CSSProperties;
}

export function ConfirmButtonGroup({
  onConfirm,
  onCancel,
  confirmText = '确认',
  confirmButtonHtmlType = 'button',
  confirmButtonType,
  center,
  style
}: InputProps) {
  return (
    <div className="ConfirmButtonGroup" style={{
      textAlign: center ? 'center' : 'inherit',
      ...style
    }}>
      <AppButton
        htmlType={confirmButtonHtmlType}
        type={confirmButtonType || 'primary'}
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
