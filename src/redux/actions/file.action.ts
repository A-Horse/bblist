

export function uploadIssueAttachmentRequest(payload: {
  issueId,
  files
}) {
  const formData = new FormData();
  formData.append('issueId', payload.issueId);
  formData.append('files', payload.files);
  return {
    type: 'UPLOAD_ISSUE_ATTACHMENT',
    payload: {
      request: {
        url: `/issue/${payload.issueId}/attachment`,
        method: 'post',
        data: formData,
      },
    },
  };
}
