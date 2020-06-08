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

interface InputProps {
  projectID: string;
  kanbanID?: string;
  issueID: string;
}

export function IssueDetailBread(props: InputProps) {
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => {
    return selectProject(state, props.projectID);
  });

  const issue: IProjectIssue = useSelector((state: RootState) => {
    return state.project.issueMap[props.issueID];
  });

  const { addToast } = useToasts();

  const updateIssue = (partialIssue) => {};

  if (!project || !issue) {
    return null;
  }

  return (
    <div className="IssueDetailBread">
      <IssueType />

      <div className="IssueDetailBread--project-name">{project.name}</div>

      <AppIcon className="IssueDetailBread--right-icon" icon={faChevronRight} />

      <ColumnSelect
        selectedColumnID={issue.columnId}
        onChange={(option) => {
          updateIssue({ columnID: option.value });
        }}
        customSelect={(props) => <BorderLessSelector width={100} {...props} />}
        kanbanID={props.kanbanID}
      />
    </div>
  );
}
