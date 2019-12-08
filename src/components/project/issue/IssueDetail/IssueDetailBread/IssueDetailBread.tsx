import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../reducers';
import { getProject } from '../../../../../reducers/util/project.util';

interface InputProp {
  projectID: string;
  detailID: string;
}

export function IssueDetailBread(props: InputProp) {
  const project = useSelector((state: RootState) => {
    return getProject(state, props.projectID);
  });

  if (!project) {
    return;
  }

  return <div>{project.get('name')}</div>;
}
