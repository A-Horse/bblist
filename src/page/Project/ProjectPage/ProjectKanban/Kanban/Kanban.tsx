import './Kanban.scss';

import { List } from 'immutable';
import React, { Component } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { Route, RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { ActionCreatorsMapObject, AnyAction, bindActionCreators, Dispatch } from 'redux';

import { getProjectKanbanDetailRequest } from '../../../../../actions/project/kanban.action';
import Loading from '../../../../../components/Loading';
import { IssueDetailModal } from '../../../../../components/Project/Issue/IssueDetail/IssueDetailModal';
import { RootState } from '../../../../../reducers';
import { selectKanbanColumns } from '../../../../../reducers/selector/kanban.selector';
import { KanbanColumnRecord } from '../../../../../typings/kanban-column.typing';
import { KanbanRecord } from '../../../../../typings/kanban.typing';
import { ProjectRecord } from '../../../../../typings/project.typing';
import { parseQueryParams } from '../../../../../utils/url.util';
import { KanbanColumn } from './Column/KanbanColumn';

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
  } & ComponentProps
> {
  componentWillMount() {
    this.props.actions.getProjectKanbanDetailRequest({ kanbanId: this.props.kanbanId });
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
            path="/project/:projectID/kanban/:kanbanId"
            render={(props: RouteComponentProps<{ projectID: string; kanbanID: string; issueId: string }>) => {
              const query = parseQueryParams(props.location.search);
              if (query.issueId) {
                return <IssueDetailModal kanbanID={query.kanbanID} issueId={query.issueId} projectID={props.match.params.projectID} />;
              }
              return null;
            }}
          />

          <div className="Kanban-ColumnContainer">
            {columns
              .sort((a: KanbanColumnRecord, b: KanbanColumnRecord) => a.get('order') - b.get('order'))
              .valueSeq()
              .toArray()
              .map((column: KanbanColumnRecord) => (
                <KanbanColumn key={column.get('id')} column={column} onIssueClick={this.onIssueClick} />
              ))}
          </div>
        </DndProvider>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        getProjectKanbanDetailRequest: getProjectKanbanDetailRequest
      },
      dispatch
    )
  };
};

const mapStateToProps = (state: RootState, props: ComponentProps) => {
  const { projectId } = props;

  const project = state.project.get('projectMap').get(projectId) as ProjectRecord;

  const kanban = state.project.get('kanbanMap').get(props.kanbanId);

  let columns: List<KanbanColumnRecord> | null = null;
  if (!!kanban && !!kanban.get('columns')) {
    columns = selectKanbanColumns(state, kanban.get('id'));
  }

  return {
    project,
    kanban,
    columns
  };
};

export const Kanban = withRouter<ComponentProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(KanbanComponent)
);
