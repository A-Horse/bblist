import { useSelector } from 'react-redux';
import React, { useState } from 'react';

import { AppMenu } from '../../../../../../../components/widget/Menu/Menu';
import { AppDropdown } from '../../../../../../../components/widget/Dropdown';
import { AppIcon } from '../../../../../../../components/widget/Icon';

import './ColumnHeaderDropDown.scss';

interface InputProps {
  columnId: string;
}

export function ColumnHeaderDropDown({ columnId }: InputProps) {
  const menu = (
    <div className="ColumnHeaderDropDown--overlay">
      <div className="ColumnHeaderDropDown--overlay-header">
        <span className="ColumnHeaderDropDown--overlay-header-name">列表菜单</span>
      </div>
      <ul className="">
        <li>
          <AppIcon icon="pen" />
          编辑列表
        </li>
        <li>
          <AppIcon icon="trash" />
          删除列表
        </li>
      </ul>
    </div>
  );
  return (
    <AppDropdown className="ColumnHeaderDropDown" overlay={menu} placement="bottomCenter" trigger={['click']}>
      <AppIcon icon="ellipsis-h" />
    </AppDropdown>
  );
}
