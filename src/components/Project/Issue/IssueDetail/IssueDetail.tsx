import './IssueDetail.scss';

import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormField } from '../../../../widget/FormField/FormField';
import { Input } from '../../../../widget/Input/Input';
import { AppTextArea } from '../../../../widget/TextArea/TextArea';
import { IssueDetailRight } from './IssueDetailRight/IssueDetailRight';
import { Deadline } from '../../../Deadline/Deadline';
import { DetailSection } from './DetailSection/DetailSection';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ProjectIssueFiled } from '../../../../typings/project-issue.typing';
import { RootState } from '../../../../redux/reducer';
import { selectIssue } from '../../../../redux/reducer/selector/issue.selector';
import { updateIssueDetailRequest } from '../../../../redux/actions/project-issue-detail.action';

export interface InputProps {
  issueId: string;
  kanbanId?: string;
  projectId: string;
}

export function IssueDetail({ issueId, kanbanId, projectId }: InputProps) {
  const issue = useSelector((state: RootState) => selectIssue(state, issueId));
  const dispatch = useDispatch();
  const onFieldChange = (key: ProjectIssueFiled, value: string) => {
    dispatch(updateIssueDetailRequest({ id: issueId, [key]: value }));
  };

  if (!issue) {
    return <div className="IssueDetail">loading</div>;
  }

  return (
    <div className="IssueDetail">
      <DetailSection icon={faCreditCard}>
        <FormField className="IssueDetail--title-field">
          <Input
            className="IssueDetail--title"
            size="large"
            borderLess={true}
            value={issue.title}
            onChange={(value) => onFieldChange('title', value)}
            onBlur={(value) => onFieldChange('title', value)}
          />
        </FormField>
      </DetailSection>

      <div className="IssueDetail--content">
        <div className="IssueDetail--left">
          {issue.deadline && (
            <FormField name="到期日" className="IssueDetail--deadline-field">
              <Deadline
                deadline={issue.deadline!}
                done={!!issue.deadlineDone}
                onChange={(checked) => onFieldChange('deadlineDone', checked)}
              />
            </FormField>
          )}

          <DetailSection icon={faBars}>
            <FormField name="描述：" type="major">
              <AppTextArea
                className="IssueDetail--content-textarea"
                value={issue.desc || ''}
                onChange={(value) => onFieldChange('desc', value)}
                onBlur={(value) => onFieldChange('desc', value)}
              />
            </FormField>
          </DetailSection>
        </div>

        <IssueDetailRight
          projectId={projectId}
          kanbanId={kanbanId}
          issue={issue}
          onFieldChange={onFieldChange}
        />
      </div>
    </div>
  );
}
