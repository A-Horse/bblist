import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { RootState } from '../../../reducers';
import { getProjectKanbansRequest } from '../../../actions/project/kanban.action';
import { AppSelect } from '../../widget/AppSelect';
import { getKanbanOptions } from '../../../reducers/selector/kanban.selector';
import { SelectOption } from '../../../typings/select.typing';
import { ActionMeta } from 'react-select/src/types';

interface InputProps {
  projectId: string;
  onChange: (value: any, actionMeta: ActionMeta) => void;
}

interface InjectProps {
  actions: ActionCreatorsMapObject;
  options: SelectOption[];
}

class KanbanSelectComponent extends Component<InputProps & InjectProps> {
  componentWillMount() {
    this.props.actions.getProjectKanbansRequest({
      projectId: this.props.projectId
    });
  }

  render() {
    return <AppSelect options={this.props.options} onChange={this.props.onChange} />;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        getProjectKanbansRequest: getProjectKanbansRequest
      },
      dispatch
    )
  };
};

const mapStateToProps = (state: RootState, props: InputProps) => {
  let kanbanOptions: SelectOption[] = [];

  const project = state.project.get('projectMap').get(props.projectId);

  if (project) {
    kanbanOptions = getKanbanOptions(project, state.project.get('kanbanMap'));
  }

  return {
    options: kanbanOptions
  };
};

export const KanbanSelect = connect(
  mapStateToProps,
  mapDispatchToProps
)(KanbanSelectComponent);
