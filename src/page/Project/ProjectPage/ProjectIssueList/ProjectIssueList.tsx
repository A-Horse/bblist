import './ProjectIssueList.scss';

import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { IProjectIssue } from '../../../../typings/project-issue.typing';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectIssuesRequest, rankIssue } from "../../../../redux/actions/issue.action";
import { RootState } from '../../../../redux/reducer';
import { selectProjectIssues } from '../../../../redux/reducer/selector/issue.selector';
import { useHistory } from 'react-router-dom';
import { SortableFlatIssue } from "./SortableFlatIssue";

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

  const onDragEnd= (result) => {
    if (!result.destination) {
      return;
    }
    console.log(result);

    dispatch(rankIssue(issues[result.source.index], issues[result.destination.index], result.source.index > result.destination.index));

    // const items = reorder(
    //   this.state.items,
    //   result.source.index,
    //   result.destination.index
    // );
  }

  return (
    <div className="Issues">
      <div className="Issues--list">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <ul>
                  {issues.map((issue: IProjectIssue, index: number) => {
                    return (
                     <SortableFlatIssue key={issue.id} issue={issue} index={index} />
                    );
                  })}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        </DragDropContext>

      </div>
    </div>
  );
}
