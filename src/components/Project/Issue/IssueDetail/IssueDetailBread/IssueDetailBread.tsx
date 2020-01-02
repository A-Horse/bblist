import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../../reducers';
import { getProjectFromState } from '../../../../../reducers/selector/project.selector';
import { ColumnSelect } from '../../../ColumnSelect/ColumnSelect';
import { BorderlessSelector } from '../../../../widget/BorderlessSelect/BorderlessSelect';
import { IssueType } from '../../../IssueType/IssueType';

import './IssueDetailBread.scss';

interface InputProps {
  projectID: string;
  kanbanID?: string;
  issueID: string;
}

export function IssueDetailBread(props: InputProps) {
  const project = useSelector((state: RootState) => {
    return getProjectFromState(state, props.projectID);
  });

  if (!project) {
    return null;
  }

  return (
    <div className="IssueDetailBread">
      <IssueType />

      {project.get('name')}

      <ColumnSelect
        onChange={() => {}}
        customSelect={props => <BorderlessSelector width={100} {...props} />}
        kanbanID={props.kanbanID}
      />
    </div>
  );
}
