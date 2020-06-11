import './ProjectIssueList.scss';

import React, { useEffect } from 'react';
import { Route, RouteComponentProps, useRouteMatch } from 'react-router-dom';

import { FlatIssue } from '../../../../components/Project/Issue/FlatIssue/FlatIssue';
import { IssueDetail } from '../../../../components/Project/Issue/IssueDetail/IssueDetail';
import { IProjectIssue } from '../../../../typings/project-issue.typing';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectIssuesRequest } from '../../../../redux/actions/project-issue.action';
import { RootState } from '../../../../redux/reducer';
import { selectProjectIssues } from '../../../../redux/reducer/selector/issue.selector';
import { useHistory } from 'react-router-dom';

interface InputProps {}

export function ProjectIssueList(props: InputProps) {
  const dispatch = useDispatch();
  const match = useRouteMatch<{ projectId: string }>();
  const history = useHistory();
  const projectId = match.params.projectId;
  useEffect(() => {
    dispatch(getProjectIssuesRequest({ projectId }));
  }, [dispatch, projectId]);

  const issues = useSelector((state: RootState) =>
    selectProjectIssues(state, projectId)
  );

  const onIssueClick = (issue: IProjectIssue) => {
    history.push(`/project/${projectId}/issues/${issue.id}`);
  };

  return (
    <div className="Issues">
      <div className="Issues--list">
        <ul>
          {issues.map((issue: IProjectIssue) => {
            return (
              <li key={issue.id}>
                <FlatIssue issue={issue} onClick={() => onIssueClick(issue)} />
              </li>
            );
          })}
        </ul>
      </div>

      <Route
        path="/project/:projectId/issues/:issueId"
        render={(
          props: RouteComponentProps<{ issueId: string; projectID: string }>
        ) => (
          <div className={`Issues--detail-container`}>
            <IssueDetail
              issueId={props.match.params.issueId}
              projectId={props.match.params.projectID}
            />
          </div>
        )}
      />
    </div>
  );
}
