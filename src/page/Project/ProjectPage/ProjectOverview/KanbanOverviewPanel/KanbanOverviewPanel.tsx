import React, { useEffect } from 'react';
import { IKanban } from '../../../../../typings/kanban.typing';
import { useDispatch, useSelector } from 'react-redux';
import { queryKanbanRecentlyIssues } from '../../../../../redux/actions/kanban.action';
import { RootState } from '../../../../../redux/reducer';
import { selectKanbanRecentlyIssues } from '../../../../../redux/reducer/selector/kanban.selector';
import { KanbanIssue } from '../../../../../components/Project/Issue/KanbanIssue/KanbanIssue';
import { Panel } from '../../../../../widget/Panel/Panel';
import { SectionHeading } from '../../../../../widget/Heading/SectionHeading/SectionHeading';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {AppIcon} from "../../../../../widget/Icon";
import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons";

interface Props {
  kanban: IKanban;
}

export function KanbanOverviewPanel({ kanban }: Props) {
  const dispatch = useDispatch();
  const recentlyIssues = useSelector((state: RootState) =>
    selectKanbanRecentlyIssues(state, kanban.id)
  );
  const history = useHistory();
  const match = useRouteMatch<{ projectId: string }>();

  useEffect(() => {
    dispatch(queryKanbanRecentlyIssues(kanban.id));
  }, [kanban.id, dispatch]);

  const onIssueClick = (issueId: string) => {
    history.push(`${match.url}?selectIssue=${issueId}`);
  };

  return (
    <Panel style={{ marginBottom: 12 }}>
      <SectionHeading>{kanban.name}
        <AppIcon style={{
            marginLeft: 12
        }} icon={faArrowCircleRight}  />
      </SectionHeading>
      <div>最近卡片</div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          width: '100%',
          overflowX: 'auto',
        }}
      >
        {recentlyIssues.map((issue) => (
          <KanbanIssue
            key={issue.id}
            issue={issue}
            kanbanId={kanban.id}
            onClick={onIssueClick}
            style={{
              marginRight: 12,
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </Panel>
  );
}
