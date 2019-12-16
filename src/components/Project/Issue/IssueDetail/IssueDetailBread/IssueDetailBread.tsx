import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../../reducers';
import { getProjectFromState } from '../../../../../reducers/selector/project.selector';
import { ColumnSelect } from '../../../ColumnSelect/ColumnSelect';

interface InputProp {
  projectID: string;
  kanbanID?: string;
  issueID: string;
}

export function IssueDetailBread(props: InputProp) {
  const project = useSelector((state: RootState) => {
    return getProjectFromState(state, props.projectID);
  });

  if (!project) {
    return null;
  }

  return (
    <div>
      {project.get('name')}
      <ColumnSelect kanbanID={props.kanbanID} />
    </div>
  );
}
