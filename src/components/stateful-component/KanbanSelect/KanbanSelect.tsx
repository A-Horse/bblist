import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { RootState } from '../../../reducers';
import { getProjectKanbansRequest } from '../../../actions/project/kanban.action';
import { AppSelect } from '../../widget/AppSelect';
import { getKanbanOptions } from '../../../reducers/selector/kanban.selector';
import { SelectOption } from '../../../typings/select.typing';

interface InputProps {
  projectId: string;
  selectedKanbanId?: string;
  onChange: (value: SelectOption) => void;
}

interface InjectProps {
  actions: ActionCreatorsMapObject;
  options: SelectOption[];
}

const noOptionTip = () => '暂无看板';

class KanbanSelectComponent extends Component<InputProps & InjectProps> {
  componentWillMount() {
    this.props.actions.getProjectKanbansRequest({
      projectId: this.props.projectId
    });
  }

  render() {
    const selectedOption = this.props.options.find(option => option.value === this.props.selectedKanbanId);
    return (
      <AppSelect
        noOptionsMessage={noOptionTip}
        placeholder="选择看板"
        options={this.props.options}
        value={selectedOption}
        onChange={this.props.onChange as any}
      />
    );
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
