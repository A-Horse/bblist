import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { ActionCreatorsMapObject, AnyAction, bindActionCreators, Dispatch } from 'redux';

import { AppModal } from '../../../../../components/widget/AppModal';
import { RootState } from '../../../../../reducers';
import { getKanbans } from '../../../../../reducers/selector/kanban.selector';
import { KanbanRecord } from '../../../../../typings/kanban.typing';

interface InputProps {
  toggle: boolean;
  onClose: Function;
  projectId: string;
  onChange: Function;
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
            return (
              <li
                key={kanban.get('id')}
                onClick={() => {
                  this.props.onChange(kanban.get('id'));
                  this.props.onClose();
                }}
              >
                {kanban.get('name')}
              </li>
            );
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
