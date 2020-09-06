import React, { useState } from 'react';
import { IComment } from '../../../../../typings/project-issue.typing';
import { UserAvatar } from '../../../../UserAvatar/UserAvatar';
import { selectUser } from '../../../../../redux/reducer/selector/user.selector';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reducer';
import { AppDate } from '../../../../../widget/AppDate/AppDate';
import { AppButton } from '../../../../../widget/Button';
import { ConfirmModal } from '../../../../Modal/ConfirmModal';
import { deleteCommentRequest } from '../../../../../redux/actions/comment.action';
import { AxiosDispatch } from '../../../../../typings/util.typing';
import { queryProjectIssueDetailRequest } from '../../../../../redux/actions/project-issue-detail.action';

interface Props {
  comment: IComment;
  issueId: string;
}

export function Comment({ comment, issueId }: Props) {
  const user = useSelector((state: RootState) =>
    selectUser(state, comment.creatorId)
  );

  const dispatch = useDispatch<AxiosDispatch>();
  const [deleteModal, setDeleteModal] = useState(false);

  const deleteComment = () =>
    dispatch(deleteCommentRequest({ issueId, commentId: comment.id })).then(
      () => {
        dispatch(queryProjectIssueDetailRequest({ issueId }));
        setDeleteModal(false);
      }
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
          paddingLeft: 7,
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
          <span style={{ marginLeft: 6, fontSize: 12, color: '#5e6c84' }}>
            创建于
            <AppDate
              style={{}}
              format="YYYY年M月DD日 HH:mm"
              value={comment.createdAt}
            />
          </span>
        </div>
        <div
          style={{
            backgroundColor: 'white',
            padding: 8,
            display: 'inline-block',
            borderRadius: 3,
          }}
        >
          {comment.content}
        </div>

        <div>
          <AppButton type="link" size="sm" disabled style={{ marginRight: 8 }}>
            编辑
          </AppButton>
          <AppButton type="link" size="sm" onClick={() => setDeleteModal(true)}>
            删除
          </AppButton>
        </div>
      </div>

      <ConfirmModal
        visible={deleteModal}
        onConfirm={deleteComment}
        onCancel={() => setDeleteModal(false)}
        confirmTextTip={'确定要删除评论吗？(' + comment.content + ')'}
        confirmButtonText="删除"
      />
    </div>
  );
}
