import { AppModal } from '../../../../../components/widget/AppModal';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch, AnyAction, ActionCreatorsMapObject } from 'redux';
import React, { Component } from 'react';
import { RootState } from '../../../../../reducers';
import { KanbanRecord } from '../../../../../typings/kanban.typing';
import { getKanbans } from '../../../../../reducers/selector/kanban.selector';

interface InputProps {
  toggle: boolean;
  onClose: Function;
  projectId: string;
}

interface RouterProps extends RouteComponentProps<{ projectId: string }> {}

interface ReduxProps {
  kanbans: KanbanRecord[];
  actions: ActionCreatorsMapObject;
}

type ComponentProps = InputProps & RouterProps & ReduxProps;

class KanbanSelectorModalComponent extends Component<ComponentProps> {
  componentWillMount() {}

  closeModal = () => {
    this.props.onClose();
  };

  render() {
    return (
      <AppModal isOpen={this.props.toggle} onRequestClose={this.closeModal}>
        <ul>
          {this.props.kanbans.map((kanban: KanbanRecord) => {
            return <li key={kanban.get('id')}>{kanban.get('name')}</li>;
          })}
        </ul>
      </AppModal>
    );
  }
}

const mapStateToProps = (state: RootState, props: InputProps & RouterProps) => {
  const project = state.project.get('projectMap').get(props.projectId);

  const kanbans: KanbanRecord[] = getKanbans(project, state.project.get('kanbanMap'));

  return {
    kanbans: kanbans
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

export const KanbanSelectorModal = withRouter<InputProps & RouterProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(KanbanSelectorModalComponent)
);
