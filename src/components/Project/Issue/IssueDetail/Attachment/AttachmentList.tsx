import React from 'react';
import { Attachment } from './Attachment';

export function AttachmentList({ issue }) {
  const attachments = issue.attachments;

  if (!attachments || !attachments.length) {
    return null;
  }

  return (
    <div>
      {attachments.map((attachment) => (
        <Attachment key={attachment.id} issue={issue} attachment={attachment} />
      ))}
    </div>
  );
}
