import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  Route,
  RouteComponentProps,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { IssueDetailModal } from '../../../../../components/Project/Issue/IssueDetail/IssueDetailModal';
import { RootState } from '../../../../../redux/reducer';
import { selectKanbanColumns } from '../../../../../redux/reducer/selector/kanban.selector';
import { parseQueryParams } from '../../../../../utils/url.util';
import { KanbanColumn } from './Column/KanbanColumn';
import { NoColumnGuide } from './NoColumnGuide';
import { KanbanSettingModal } from '../../../KanbanSettingModal/KanbanSettingModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectProject } from '../../../../../redux/reducer/selector/project.selector';
import { getProjectKanbanDetailRequest } from '../../../../../redux/actions/kanban.action';

import './Kanban.scss';
import { queryKanbanColumns } from '../../../../../redux/actions/column.action';
import { IColumn } from '../../../../../typings/kanban-column.typing';

interface InputProps {
  kanbanId: string;
  projectId: string;
}

export function Kanban({ kanbanId, projectId }: InputProps) {
  const [settingModalVisible, setSettingModalVisible] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const onIssueClick = (issueId: string) => {
    history.push(match.url + `?issueId=${issueId}`);
  };

  const project = useSelector((state: RootState) =>
    selectProject(state, projectId)
  );
  const columns = useSelector((state: RootState) =>
    selectKanbanColumns(state, kanbanId)
  );

  useEffect(() => {
    dispatch(
      getProjectKanbanDetailRequest({
        kanbanId: kanbanId,
      })
    );
    dispatch(queryKanbanColumns(kanbanId));
  }, [dispatch, kanbanId]);

  return (
    <div className="Kanban">
      <DndProvider backend={HTML5Backend}>
        <Route
          path="/project/:projectID/kanban/:kanbanID"
          render={(props: RouteComponentProps<any>) => {
            const query = parseQueryParams(props.location.search);
            if (!query.issueId) {
              return null;
            }
            return (
              <IssueDetailModal
                kanbanID={props.match.params.kanbanID}
                projectID={props.match.params.projectID}
                issueID={query.issueId}
              />
            );
          }}
        />

        <KanbanSettingModal
          kanbanId={kanbanId}
          toggle={settingModalVisible}
          onClose={() => setSettingModalVisible(false)}
        />

        {!columns.length && (
          <NoColumnGuide openSetting={() => setSettingModalVisible(true)} />
        )}

        {!!columns.length && (
          <div className="Kanban-ColumnContainer">
            {columns
              .sort((a: IColumn, b: IColumn) => a.order - b.order)
              .map((column: IColumn) => (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  kanbanID={kanbanId}
                  projectID={projectId}
                  onIssueClick={onIssueClick}
                />
              ))}
          </div>
        )}
      </DndProvider>
    </div>
  );
}
