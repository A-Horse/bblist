import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../../reducers';
import { getProjectFromState } from '../../../../../reducers/selector/project.selector';
import {selectKanbanColumns} from "../../../../../reducers/selector/kanban.selector";

interface InputProp {
  projectID: string;
  kanbanID: string;
  issueID: string;
}

export function IssueDetailBread(props: InputProp) {
  const project = useSelector((state: RootState) => {
    return getProjectFromState(state, props.projectID);
  });

  const columns =  useSelector((state: RootState) => selectKanbanColumns(state, props.kanbanID))

  if (!project) {
    return null;
  }

  return <div>{project.get('name')}</div>;
}
