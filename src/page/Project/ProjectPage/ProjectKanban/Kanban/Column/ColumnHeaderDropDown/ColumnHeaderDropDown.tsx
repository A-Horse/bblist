import React from 'react';

import { AppDropDown } from '../../../../../../../widget/DropDown/AppDropDown';
import { AppIcon } from '../../../../../../../widget/Icon';
import { AppButton } from '../../../../../../../widget/Button';

import './ColumnHeaderDropDown.scss';
import { AppMenu, AppMenuItem } from '../../../../../../../widget/Menu/Menu';

interface InputProps {
  columnID: string;
}

export function ColumnHeaderDropDown({ columnID }: InputProps) {
  return (
    <AppDropDown
      position="right"
      className="ColumnHeaderDropDown"
      overlay={
        <div className="ColumnHeaderDropDown--overlay">
          <div className="ColumnHeaderDropDown--overlay-header">
            <span className="ColumnHeaderDropDown--overlay-header-name">
              列表菜单
            </span>
          </div>
          <AppMenu className="ColumnHeaderDropDown--overlay-menu-list">
            <AppMenuItem>
              <AppIcon icon="pen" />
              编辑列表
            </AppMenuItem>
            <AppMenuItem>
              <AppIcon icon="trash" />
              删除列表
            </AppMenuItem>
          </AppMenu>
        </div>
      }
      toggle={() => (
        <AppButton>
          <AppIcon icon="ellipsis-h" />
        </AppButton>
      )}
    />
  );
}
