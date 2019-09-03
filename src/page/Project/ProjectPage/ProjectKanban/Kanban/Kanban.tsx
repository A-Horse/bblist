import './Kanban.scss';

import { List } from 'immutable';
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { Route, RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { CardDetailContainer } from '../../../../Task/CardDetail/CardDetail.container';
import { KanbanColumn } from './Column/KanbanColumn';
import { ProjectRecord } from '../../../../../typings/project.typing';
import { KanbanRecord } from '../../../../../typings/kanban.typing';
import { KanbanColumnRecord } from '../../../../../typings/kanban-column.typing';
import Loading from '../../../../../components/Loading';
import { RootState } from '../../../../../reducers';
import { getProjectKanbanDetailRequest } from '../../../../../actions/project/kanban.action';
import { CreateKanbanCardModalButton } from '../../modals/CreateKanbanCardModal/CreateKanbanCardModalButton';
import { selectKanbanColumns } from '../../../../../reducers/selector/kanban.selector';

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

  render() {
    if (!this.props.kanban) {
      return <Loading />;
    }

    if (!this.props.kanban!.get('columns')) {
      return <Loading />;
    }

    const columns: List<KanbanColumnRecord> = this.props.columns!;

    return (
      <div className="column-board-content-container">
        <CreateKanbanCardModalButton kanban={this.props.kanban} />

        <Route
          path="/project/:projectId/kanban/:kanbanId/card/:cardId"
          render={() => <CardDetailContainer />}
        />

        <div>demo</div>

        <div className="board-track-container">
          {columns
            .sort((a: KanbanColumnRecord, b: KanbanColumnRecord) => a.get('order') - b.get('order'))
            .valueSeq()
            .toArray()
            .map((column: KanbanColumnRecord) => (
              <KanbanColumn key={column.get('id')} column={column} />
            ))}
        </div>
      </div>
    );
  }
}

export const KanbanComponentDDC = DragDropContext(HTML5Backend)(KanbanComponent);

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

export const Kanban = withRouter<ComponentProps>(connect(
  mapStateToProps,
  mapDispatchToProps
)(KanbanComponentDDC) as any);
