
export interface CreateCommentRequest {
    issueId: string;
    content: string;
}

export function createCommentRequest(
    createCommentRequest: CreateCommentRequest
) {
  return {
    type: 'CREATE_COMMENT',
    payload: {
      request: {
        url: `/issue/${createCommentRequest.issueId}`,
        data: createCommentRequest,
        method: 'POST',
      },
    },
  };
}
