import React from 'react';
import { Popup } from '../../../../Popup/Popup';
import { AppList } from '../../../../List/List';
import { AppButton } from '../../../../../widget/Button';
import { ListItem } from '../../../../List/ListItem';

export function AttachmentPopup({ isOpen, position, onClose }) {
  return (
    <Popup isOpen={isOpen} position={position} onClose={onClose}>
      <AppList>
        <ListItem>
          <AppButton>上传</AppButton>
        </ListItem>
      </AppList>
    </Popup>
  );
}
