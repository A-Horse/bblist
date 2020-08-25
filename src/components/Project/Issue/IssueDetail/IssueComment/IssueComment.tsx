import React from 'react';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FormField } from '../../../../../widget/FormField/FormField';
import { DetailSection } from '../DetailSection/DetailSection';
import {CommentInput} from "./CommentInput";

export function IssueComment({ issue, onFieldChange }) {
  return (
    <DetailSection icon={faPencilAlt}>
      <FormField name="活动：" type="major">
        <CommentInput />
      </FormField>
    </DetailSection>
  );
}
