import React, { useEffect } from 'react';
import { IKanban } from '../../../../../typings/kanban.typing';
import { useDispatch, useSelector } from 'react-redux';
import { queryKanbanRecentlyIssues } from '../../../../../redux/actions/kanban.action';
import { RootState } from '../../../../../redux/reducer';
import { selectKanbanRecentlyIssues } from '../../../../../redux/reducer/selector/kanban.selector';
import { KanbanIssue } from '../../../../../components/Project/Issue/KanbanIssue/KanbanIssue';
import { Panel } from '../../../../../widget/Panel/Panel';
import {SectionHeading} from "../../../../../widget/Heading/SectionHeading/SectionHeading";

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
  }, [kanban, dispatch]);

  return (
    <Panel style={{marginBottom: 12}}>
      <SectionHeading>{kanban.name}</SectionHeading>
      <div>最近卡片</div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
            width: '100%',
            overflowX: 'auto'
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
                flexShrink: 0
            }}
          />
        ))}
      </div>
    </Panel>
  );
}
