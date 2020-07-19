import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reducer';
import { selectProject } from '../../../../../redux/reducer/selector/project.selector';
import { ColumnSelect } from '../../../ColumnSelect/ColumnSelect';
import { BorderLessSelector } from '../../../../../widget/BorderlessSelect/BorderlessSelect';
import { IssueType } from '../../../IssueType/IssueType';
import { AppIcon } from '../../../../../widget/Icon';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useToasts } from 'react-toast-notifications';
import './IssueDetailBread.scss';
import { IProjectIssue } from '../../../../../typings/project-issue.typing';
import {updateIssueDetailRequest} from "../../../../../redux/actions/project-issue-detail.action";

interface InputProps {
  projectId: string;
  kanbanId?: string;
  issueId: string;
}

export function IssueDetailBread(props: InputProps) {
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => {
    return selectProject(state, props.projectId);
  });

  const issue: IProjectIssue = useSelector((state: RootState) => {
    return state.project.issueMap[props.issueId];
  });

  const updateIssue = (partialIssue) => {
      dispatch(updateIssueDetailRequest({ id: issue.id,...partialIssue }));
  };
  if (!project || !issue) {
    return null;
  }
  return (
    <div className="IssueDetailBread">
      <IssueType />

      <div className="IssueDetailBread--project-name">{project.name}</div>

      <AppIcon className="IssueDetailBread--right-icon" icon={faChevronRight} />

      <ColumnSelect
        selectedColumnId={issue.columnId}
        onChange={(option) => {
          updateIssue({ columnId: option.value });
        }}
        customSelect={(props) => <BorderLessSelector width={100} {...props} />}
        kanbanId={props.kanbanId}
      />
    </div>
  );
}
