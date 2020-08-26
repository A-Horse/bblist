import React from 'react';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FormField } from '../../../../../widget/FormField/FormField';
import { DetailSection } from '../DetailSection/DetailSection';
import { CommentInput } from './CommentInput';
import { useDispatch } from 'react-redux';
import { createCommentRequest } from '../../../../../redux/actions/comment.action';

export function IssueComment({ issue, onFieldChange }) {
  const dispatch = useDispatch();

  const createComment = (content) => {
    dispatch(
      createCommentRequest({
        issueId: issue.id,
        content,
      })
    );
  };

  return (
    <DetailSection icon={faPencilAlt}>
      <FormField name="活动：" type="major">
        <CommentInput createComment={createComment} />
      </FormField>
    </DetailSection>
  );
}
