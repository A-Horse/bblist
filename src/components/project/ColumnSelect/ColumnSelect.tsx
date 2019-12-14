import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject, AnyAction, bindActionCreators, Dispatch } from 'redux';

import { getProjectKanbanDetailRequest, getProjectKanbansRequest } from '../../../actions/project/kanban.action';
import { RootState } from '../../../reducers';
import { getKanbanOptions, selectKanbanColumns } from '../../../reducers/selector/kanban.selector';
import { KanbanRecord } from '../../../typings/kanban.typing';
import { SelectOption } from '../../../typings/select.typing';
import { generateColumnOptions } from '../../../utils/option';
import { AppSelect } from '../../widget/AppSelect';

interface InputProps {
  kanbanId?: string;
  onChange: any;
}

interface InjectProps {
  actions: ActionCreatorsMapObject;
  options: SelectOption[];
}

const noOptionTip = () => '暂无列表';

class ColumnSelectComponent extends Component<InputProps & InjectProps> {
  componentWillMount() {
    this.fetchColumns();
  }

  fetchColumns() {
    if (!this.props.kanbanId) {
      return;
    }
    this.props.actions.getProjectKanbanDetailRequest({
      kanbanId: this.props.kanbanId
    });
  }

  render() {
    return (
      <AppSelect
        placeholder="选择列表"
        noOptionsMessage={noOptionTip}
        options={this.props.options}
        onChange={this.props.onChange}
      />
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

const mapStateToProps = (state: RootState, props: InputProps) => {
  let columnOptions: SelectOption[] = [];
  if (props.kanbanId) {
    const columns = selectKanbanColumns(state, props.kanbanId);
    columnOptions = columns ? generateColumnOptions(columns) : [];
  }

  return {
    options: columnOptions
  };
};

export const ColumnSelect = connect(mapStateToProps, mapDispatchToProps)(ColumnSelectComponent);
