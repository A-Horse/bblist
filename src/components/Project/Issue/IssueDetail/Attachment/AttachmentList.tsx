import React from 'react';
import axios from 'axios';
import {AppIcon} from "../../../../../widget/Icon";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

export function AttachmentList({ issue }) {
  const attachments = issue.attachments;

  if (!attachments || !attachments.length) {
    return null;
  }

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
    <div>
      <div>
        {attachments.map((attachment) => (
          <div

            key={attachment.id}
          >
            {attachment.fileName}

            <span style={{
                marginLeft: 8,
                display: 'inline-block',
                cursor: 'pointer',
            }} onClick={() => onDownload(attachment)}>
              <AppIcon size="sm" icon={faDownload}/>
            </span>

          </div>
        ))}
      </div>
    </div>
  );
}
