import React from 'react';
import { IIssueAttachment } from '../../../../../typings/project-issue.typing';

interface Props {
  attachment: IIssueAttachment;
}

export function AttachmentPrevious({ attachment }: Props) {
  let fileSuffix: string;
  try {
    fileSuffix = attachment.fileName.split('.')[1].toUpperCase();
  } catch (e) {
    fileSuffix = 'FILE';
  }
  return <div style={{
      backgroundColor: 'rgba(9,30,66,.04)',
      color: '#5e6c84',
      height: 80,
      lineHeight: '80px',
      width: 120,
      fontWeight: 900,
      textAlign: 'center',
      borderRadius: 1
  }}>{fileSuffix}</div>;
}
