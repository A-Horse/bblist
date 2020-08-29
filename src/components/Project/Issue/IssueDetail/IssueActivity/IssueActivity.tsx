import React from 'react';
import {faPencilAlt, faRunning} from '@fortawesome/free-solid-svg-icons';
import { FormField } from '../../../../../widget/FormField/FormField';
import { DetailSection } from '../DetailSection/DetailSection';
import { CommentInput } from './CommentInput';
import { useDispatch } from 'react-redux';
import { createCommentRequest } from '../../../../../redux/actions/comment.action';
import { AxiosDispatch } from '../../../../../typings/util.typing';
import { queryProjectIssueDetailRequest } from '../../../../../redux/actions/project-issue-detail.action';
import { CommentList } from './CommentList';

export function IssueActivity({ issue }) {
  const dispatch = useDispatch<AxiosDispatch>();

  const createComment = (content) => {
    return dispatch(
      createCommentRequest({ issueId: issue.id, content })
    ).then(() =>
      dispatch(queryProjectIssueDetailRequest({ issueId: issue.id }))
    );
  };

  return (
    <DetailSection icon={faRunning}>
      <FormField name="活动：" type="major">
        <CommentList comments={issue.comments} />

        <CommentInput createComment={createComment} />
      </FormField>
    </DetailSection>
  );
}
