export function removeIssueAttachmentRequest({ issueId, attachmentId }) {
  return {
    type: 'REMOVE_ISSUE_ATTACHMENT',
    payload: {
      request: {
        url: `/issue/${issueId}/attachment/${attachmentId}`,
        method: 'DELETE',
      },
    },
  };
}
