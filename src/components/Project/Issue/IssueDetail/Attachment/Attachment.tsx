import React from 'react';
import { AttachmentPrevious } from './AttachmentPrevious';
import { AppIcon } from '../../../../../widget/Icon';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useHover } from '../../../../../hook/useHover';
import { AppButton } from '../../../../../widget/Button';

export function Attachment({ attachment, issue }) {
  const [hoverRef, isHover] = useHover();

  const onDownload = (attachment) => {
    axios
      .get(`/api/issue/${issue.id}/attachment/${attachment.id}`, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        const blob = new Blob([res.data], { type: attachment.contentType });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = attachment.fileName;
        link.click();
      });
  };
  return (
    <div
      ref={hoverRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        ...(isHover ? { backgroundColor: 'rgba(9,30,66,.04)' } : {}),
      }}
    >
      <AttachmentPrevious attachment={attachment} />

      <div
        style={{
            marginLeft: 12,

        }}
      >
        <div
          style={{
            color: '#172b4d',
            fontWeight: 700,

          }}
        >
          {attachment.fileName}
          <div
            style={{
              display: 'inline-block',
              cursor: 'pointer',
            }}
            onClick={() => onDownload(attachment)}
          >
            <AppIcon size="sm" icon={faDownload} />
          </div>
        </div>

        <div>
          <AppButton type="link" size="sm" >删除</AppButton>
        </div>
      </div>
    </div>
  );
}
