import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Route, RouteComponentProps } from 'react-router-dom';
import { IssueDetailModal } from '../../../../../components/Project/Issue/IssueDetail/IssueDetailModal';
import { RootState } from '../../../../../redux/reducers';
import { selectKanbanColumns } from '../../../../../redux/reducers/selector/kanban.selector';
import { KanbanColumnRecord } from '../../../../../typings/kanban-column.typing';
import { parseQueryParams } from '../../../../../utils/url.util';
import { KanbanColumn } from './Column/KanbanColumn';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { NoColumnGuide } from './NoColumnGuide';
import { KanbanSettingModal } from '../../../KanbanSettingModal/KanbanSettingModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectProject } from '../../../../../redux/reducers/selector/project.selector';
import { getProjectKanbanDetailRequest } from '../../../../../redux/actions/project/kanban.action';

import './Kanban.scss';

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
  }, [kanbanId]);

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

        {!columns.size && (
          <NoColumnGuide openSetting={() => setSettingModalVisible(true)} />
        )}

        {!!columns.size && (
          <div className="Kanban-ColumnContainer">
            {columns
              .sort(
                (a: KanbanColumnRecord, b: KanbanColumnRecord) =>
                  a.get('order') - b.get('order')
              )
              .valueSeq()
              .toArray()
              .map((column: KanbanColumnRecord) => (
                <KanbanColumn
                  key={column.get('id')}
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
