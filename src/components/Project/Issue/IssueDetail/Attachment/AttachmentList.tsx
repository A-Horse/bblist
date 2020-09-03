import React from 'react';
import axios from 'axios';

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
            style={{
              cursor: 'pointer',
            }}
            key={attachment.id}
            onClick={() => onDownload(attachment)}
          >
            {attachment.fileName}
          </div>
        ))}
      </div>
    </div>
  );
}
