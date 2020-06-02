import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActionCreatorsMapObject,
  AnyAction,
  bindActionCreators,
  Dispatch,
} from 'redux';
import { getProjectKanbanDetailRequest } from '../../../redux/actions/kanban.action';
import { RootState } from '../../../redux/reducer';
import { selectKanbanColumns } from '../../../redux/reducer/selector/kanban.selector';
import { SelectOption } from '../../../typings/select.typing';
import { AppSelect } from '../../../widget/AppSelect';
import { List } from 'immutable';
import { KanbanColumnRecord } from '../../../typings/kanban-column.typing';

import './ColumnSelect.scss';

interface InputProps {
  kanbanID?: string;
  onChange: any;
  customSelect?: any;
  selectedColumnID?: string;
}

interface InjectProps {
  actions: ActionCreatorsMapObject;
  options: SelectOption[];
}

const noOptionTip = () => '暂无列表';

function generateColumnOptions(
  columns: List<KanbanColumnRecord>
): SelectOption[] {
  return columns
    .map((column) => {
      return {
        value: column.get('id'),
        label: column.get('name'),
      };
    })
    .toArray();
}

class ColumnSelectComponent extends Component<InputProps & InjectProps> {
  componentDidMount() {
    this.fetchColumns();
  }

  fetchColumns() {
    if (!this.props.kanbanID) {
      return;
    }
    this.props.actions.getProjectKanbanDetailRequest({
      kanbanId: this.props.kanbanID,
    });
  }

  render() {
    const Select = this.props.customSelect
      ? this.props.customSelect
      : AppSelect;

    const selectedOption = this.props.options.find(
      (o) => o.value === this.props.selectedColumnID
    );
    return (
      <Select
        value={selectedOption}
        placeholder="选择价值列"
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
        getProjectKanbanDetailRequest: getProjectKanbanDetailRequest,
      },
      dispatch
    ),
  };
};

const mapStateToProps = (state: RootState, props: InputProps) => {
  let columnOptions: SelectOption[] = [];
  if (props.kanbanID) {
    const columns = selectKanbanColumns(state, props.kanbanID);
    columnOptions = columns ? generateColumnOptions(columns) : [];
  }

  return {
    options: columnOptions,
  };
};

export const ColumnSelect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnSelectComponent);
