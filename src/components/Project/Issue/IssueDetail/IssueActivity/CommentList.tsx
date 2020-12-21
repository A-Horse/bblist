import React from 'react';
import { IComment } from '../../../../../typings/project-issue.typing';
import { Comment } from './Comment';

export function CommentList({ issue, comments }) {
  if (!comments || !comments.length) {
    return null;
  }
  return (
    <div style={{ marginLeft: -36 }}>
      {comments.map((comment: IComment) => (
        <Comment key={comment.id} comment={comment} issueId={issue.id} />
      ))}
    </div>
  );
}
