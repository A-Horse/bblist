export function uploadIssueAttachmentRequest(payload: { issueId; file }) {
  const formData = new FormData();
  formData.append('issueId', payload.issueId);
  formData.append('file', payload.file);
  return {
    type: 'UPLOAD_ISSUE_ATTACHMENT',
    payload: {
      request: {
        url: `/issue/${payload.issueId}/attachment`,
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    },
  };
}
