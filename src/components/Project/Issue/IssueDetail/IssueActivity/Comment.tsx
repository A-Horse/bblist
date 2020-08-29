import React from 'react';
import { IComment } from '../../../../../typings/project-issue.typing';
import { UserAvatar } from '../../../../UserAvatar/UserAvatar';
import { selectUser } from '../../../../../redux/reducer/selector/user.selector';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reducer';

interface Props {
  comment: IComment;
}

export function Comment({ comment }: Props) {
  const user = useSelector((state: RootState) =>
    selectUser(state, comment.creatorId)
  );

  return (
    <div
      style={{
        margin: '6px 0',
        display: 'flex',
      }}
    >
      <UserAvatar user={user} />
      <div
        style={{
          paddingLeft: 3,
        }}
      >
        <div>
          <span
            style={{
              marginTop: 3,
              marginLeft: 3,
              marginBottom: 3,
              display: 'inline-block',
              color: '#172b4d',
              fontWeight: 700,
            }}
          >
            {user ? user.username : ''}
          </span>
        </div>
        <span
          style={{
            backgroundColor: 'white',
            padding: 8,
            display: 'inline-block',
            borderRadius: 3,
          }}
        >
          {comment.content}
        </span>
      </div>
    </div>
  );
}
