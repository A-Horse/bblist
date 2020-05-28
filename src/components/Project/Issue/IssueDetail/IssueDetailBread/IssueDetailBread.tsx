import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../../redux/reducers';
import { getProjectFromState } from '../../../../../redux/reducers/selector/project.selector';
import { ColumnSelect } from '../../../ColumnSelect/ColumnSelect';
import { BorderLessSelector } from '../../../../../widget/BorderlessSelect/BorderlessSelect';
import { IssueType } from '../../../IssueType/IssueType';
import { AppIcon } from '../../../../../widget/Icon';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useToasts } from 'react-toast-notifications';
import './IssueDetailBread.scss';
import { updateProjectIssueDetailRequest } from '../../../../../redux/actions/project/project-issue-detail.action';

interface InputProps {
  projectID: string;
  kanbanID?: string;
  issueID: string;
}

export function IssueDetailBread(props: InputProps) {
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => {
    return getProjectFromState(state, props.projectID);
  });

  const issue = useSelector((state: RootState) => {
    return state.project.get('issueMap').get(props.issueID);
  });

  const { addToast } = useToasts();

  const updateIssue = partialIssue => {
    dispatch(
      updateProjectIssueDetailRequest(
        {
          issueId: props.issueID,
          partialIssue: partialIssue
        },
        {
          callback: (error: Error) => {
            if (!error) {
              return;
            }
            addToast('更新失败', {
              appearance: 'error',
              autoDismiss: true
            });
          }
        }
      )
    );
  };

  if (!project || !issue) {
    return null;
  }

  return (
    <div className="IssueDetailBread">
      <IssueType />

      <div className="IssueDetailBread--project-name">
        {project.get('name')}
      </div>

      <AppIcon className="IssueDetailBread--right-icon" icon={faChevronRight} />

      <ColumnSelect
        selectedColumnID={issue.get('columnID')}
        onChange={option => {
          updateIssue({ columnID: option.value });
        }}
        customSelect={props => <BorderLessSelector width={100} {...props} />}
        kanbanID={props.kanbanID}
      />
    </div>
  );
}
