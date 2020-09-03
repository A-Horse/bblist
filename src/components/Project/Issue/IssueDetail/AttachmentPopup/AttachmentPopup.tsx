import React from 'react';
import { Popup } from '../../../../Popup/Popup';
import { AppList } from '../../../../List/List';
import { AppButton } from '../../../../../widget/Button';
import { ListItem } from '../../../../List/ListItem';
import { FileUploader } from '../../../../Upload/FileUploader';
import { useDispatch } from 'react-redux';
import { uploadIssueAttachmentRequest } from '../../../../../redux/actions/file.action';

export function AttachmentPopup({ issueId, isOpen, position, onClose }) {
  const dispatch = useDispatch();

  const upload = (files: FileList) => {
      dispatch(
          uploadIssueAttachmentRequest({
              issueId,
              file: files[0]
          })
      )
  };

  return (
    <Popup isOpen={isOpen} position={position} onClose={onClose}>
      <AppList>
        <ListItem>
          <FileUploader onUpload={upload}>
            <AppButton>上传</AppButton>
          </FileUploader>
        </ListItem>
      </AppList>
    </Popup>
  );
}
