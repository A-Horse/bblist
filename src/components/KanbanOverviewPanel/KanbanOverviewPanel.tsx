import React, { useEffect } from 'react';
import { IKanban } from '../../typings/kanban.typing';
import { useDispatch, useSelector } from 'react-redux';
import { queryKanbanRecentlyIssues } from '../../redux/actions/kanban.action';
import { RootState } from '../../redux/reducer';
import { selectKanbanRecentlyIssues } from '../../redux/reducer/selector/kanban.selector';
import { KanbanIssue } from '../Project/Issue/ProjectIssue/KanbanIssue';

interface Props {
  kanban: IKanban;
}

export function KanbanOverviewPanel({ kanban }: Props) {
  const dispatch = useDispatch();
  const recentlyIssues = useSelector((state: RootState) =>
    selectKanbanRecentlyIssues(state, kanban.id)
  );

  useEffect(() => {
    dispatch(queryKanbanRecentlyIssues(kanban.id));
  }, []);

  return (
    <div>
      <div>{kanban.name}</div>
      <div>
        {recentlyIssues.map((issue) => (
          <KanbanIssue
            key={issue.id}
            issue={issue}
            kanbanId={kanban.id}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
