export interface CreateCommentRequest {
  issueId: string;
  content: string;
}

export function createCommentRequest(createCommentRequest: CreateCommentRequest) {
  return {
    type: 'CREATE_COMMENT',
    payload: {
      request: {
        url: `/issue/${createCommentRequest.issueId}/comment`,
        data: createCommentRequest,
        method: 'POST',
      },
    },
  };
}

export function deleteCommentRequest({ issueId, commentId }) {
  return {
    type: 'DELETE_COMMENT',
    payload: {
      request: {
        url: `/issue/${issueId}/comment/${commentId}`,
        method: 'DELETE',
      },
    },
  };
}
