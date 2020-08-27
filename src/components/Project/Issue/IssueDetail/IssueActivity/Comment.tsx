import React from 'react';
import { IComment } from '../../../../../typings/project-issue.typing';
import {UserAvatar} from "../../../../UserAvatar/UserAvatar";

interface Props {
  comment: IComment;
}

export function Comment({ comment }: Props) {


  return (
    <div
      style={{
          margin: '6px 0',
          display: 'flex'
      }}
    >
        <UserAvatar />
      <span
        style={{
          backgroundColor: 'white',
            padding: 8,
            display: 'inline-block',
            borderRadius: 3
        }}
      >
        {comment.content}
      </span>
    </div>
  );
}
