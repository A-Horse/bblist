import React, { useEffect } from 'react';
import { IKanban } from '../../typings/kanban.typing';
import { useDispatch, useSelector } from 'react-redux';
import { queryKanbanRecentlyIssues } from '../../redux/actions/kanban.action';
import { RootState } from '../../redux/reducer';
import { selectKanbanRecentlyIssues } from '../../redux/reducer/selector/kanban.selector';
import { KanbanIssue } from '../Project/Issue/ProjectIssue/KanbanIssue';
import { Panel } from '../../widget/Panel/Panel';

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
    <Panel>
      <div>{kanban.name}</div>
      <div>最近卡片</div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {recentlyIssues.map((issue) => (
          <KanbanIssue
            key={issue.id}
            issue={issue}
            kanbanId={kanban.id}
            showBorder
            onClick={() => {}}
            style={{
              marginLeft: 0,
            }}
          />
        ))}
      </div>
    </Panel>
  );
}
