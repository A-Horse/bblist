import './Kanban.scss';

import { Record, List } from 'immutable';
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { Route, RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { TaskTrackNormalized } from '../../../../../typings/task/task-track.typing';
import { CardDetailContainer } from '../../../../Task/CardDetail/CardDetail.container';
import TrackCreater from '../../../../Task/TrackCreater/TrackCreater';
import { ProjectRecord } from '../../../../../typings/project.typing';
import { KanbanRecord } from '../../../../../typings/kanban.typing';
import { KanbanColumnRecord } from '../../../../../typings/kanban-column.typing';
import Loading from '../../../../../components/Loading';

interface InputProps {}

interface ComponentProps extends RouteComponentProps<{ projectId: string }>, InputProps {}

class KanbanSettingPanelComponent extends Component<
  {
    actions: ActionCreatorsMapObject;
    project: ProjectRecord;
    kanbans?: List<KanbanRecord>;
  } & ComponentProps
> {

    renderContent() {
        if (!this.props.kanbans) {
            return <div>empty</div>
        }
        return (
            <div>
{
    this.props.kanbans.map()

}
            </div>
        )
    }

  render() {
    return (<div>
        <div>Kanbans</div>
        
        {this.renderContent()}

    </div>)
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

const mapStateToProps = (state: any, props: ComponentProps) => {
  const projectId = props.match.params.projectId;

  const project = state.project.get('projectMap').get(projectId) as ProjectRecord;

  return {
    project,
    kanbans: project.get('kanbans')
  };
};

export const KanbanSettingPanel = withRouter<ComponentProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(KanbanSettingPanelComponent)
);
