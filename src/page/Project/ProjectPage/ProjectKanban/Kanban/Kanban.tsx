import { List } from 'immutable';
import React, { Component } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import {
  ActionCreatorsMapObject,
  AnyAction,
  bindActionCreators,
  Dispatch,
} from 'redux';

import { getProjectKanbanDetailRequest } from '../../../../../redux/actions/project/kanban.action';
import { IssueDetailModal } from '../../../../../components/Project/Issue/IssueDetail/IssueDetailModal';
import { RootState } from '../../../../../redux/reducers';
import { selectKanbanColumns } from '../../../../../redux/reducers/selector/kanban.selector';
import { KanbanColumnRecord } from '../../../../../typings/kanban-column.typing';
import { KanbanRecord } from '../../../../../typings/kanban.typing';
import { ProjectRecord } from '../../../../../typings/project.typing';
import { parseQueryParams } from '../../../../../utils/url.util';
import { KanbanColumn } from './Column/KanbanColumn';

import './Kanban.scss';
import { NoColumnGuide } from './NoColumnGuide';
import { Loading } from '../../../../../components/Loading';
import { KanbanSettingModal } from '../../../KanbanSettingModal/KanbanSettingModal';

interface InputProps {
  kanbanId: string;
  projectId: string;
}

interface ComponentProps extends RouteComponentProps, InputProps {}

class KanbanComponent extends Component<
  {
    actions: ActionCreatorsMapObject;
    project: ProjectRecord;
    kanban?: KanbanRecord;
    columns: List<KanbanColumnRecord> | null;
  } & ComponentProps,
  {
    modalVisible: boolean;
  }
> {
  state = {
    modalVisible: false,
  };

  componentWillMount() {
    this.props.actions.getProjectKanbanDetailRequest({
      kanbanId: this.props.kanbanId,
    });
  }

  onIssueClick = (issueId: string) => {
    this.props.history.push(this.props.match.url + `?issueId=${issueId}`);
  };

  render() {
    if (!this.props.kanban) {
      return <Loading />;
    }

    if (!this.props.kanban!.get('columns')) {
      return <Loading />;
    }

    const columns: List<KanbanColumnRecord> = this.props.columns!;

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
            kanbanId={this.props.kanbanId}
            toggle={this.state.modalVisible}
            onClose={() => this.setState({ modalVisible: false })}
          />

          {!columns.size && (
            <NoColumnGuide
              openSetting={() => this.setState({ modalVisible: true })}
            />
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
                    kanbanID={this.props.kanbanId}
                    projectID={this.props.projectId}
                    onIssueClick={this.onIssueClick}
                  />
                ))}
            </div>
          )}
        </DndProvider>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        getProjectKanbanDetailRequest: getProjectKanbanDetailRequest,
      },
      dispatch
    ),
  };
};

const mapStateToProps = (state: RootState, props: ComponentProps) => {
  const { projectId } = props;

  const project = state.project
    .get('projectMap')
    .get(projectId) as ProjectRecord;

  const kanban = state.project.get('kanbanMap').get(props.kanbanId);

  let columns: List<KanbanColumnRecord> | null = null;
  if (!!kanban && !!kanban.get('columns')) {
    columns = selectKanbanColumns(state, kanban.get('id'));
  }

  return {
    project,
    kanban,
    columns,
  };
};

export const Kanban = withRouter<ComponentProps, any>(
  connect(mapStateToProps, mapDispatchToProps)(KanbanComponent)
);
