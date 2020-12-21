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

import './ColumnSelect.scss';
import { IColumn } from '../../../typings/kanban-column.typing';
import { queryKanbanColumns } from '../../../redux/actions/column.action';

interface InputProps {
  kanbanId?: string;
  onChange: any;
  customSelect?: any;
  selectedColumnId?: string;
}

interface InjectProps {
  actions: ActionCreatorsMapObject;
  options: SelectOption[];
}

const noOptionTip = () => '暂无列表';

function generateColumnOptions(columns: IColumn[]): SelectOption[] {
  return columns.map((column) => {
    return {
      value: column.id,
      label: column.name,
    };
  });
}

class ColumnSelectComponent extends Component<InputProps & InjectProps> {
  componentDidMount() {
    this.fetchColumns();
  }

  fetchColumns() {
    if (!this.props.kanbanId) {
      return;
    }
    this.props.actions.queryKanbanColumns(this.props.kanbanId);
  }

  render() {
    const InnerSelect = this.props.customSelect
      ? this.props.customSelect
      : AppSelect;

    const selectedOption = this.props.options.find(
      (o) => o.value === this.props.selectedColumnId
    );
    return (
      <InnerSelect
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
        queryKanbanColumns: queryKanbanColumns,
      },
      dispatch
    ),
  };
};

const mapStateToProps = (state: RootState, props: InputProps) => {
  let columnOptions: SelectOption[] = [];
  if (props.kanbanId) {
    const columns = selectKanbanColumns(state, props.kanbanId);
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
