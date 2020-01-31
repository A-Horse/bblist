import React from 'react';
import { AppSelect } from '../AppSelect';
import { Props as SelectProps } from 'react-select/src/Select';
import { SelectOption } from '../../../typings/select.typing';
import './BorderlessSelect.scss';

function CustomSingleValue({ data, innerProps }) {
  return <div {...innerProps}>{data.label}</div>;
}

function CustomControl({ children, innerProps }) {
  return (
    <div {...innerProps} style={{ position: 'relative', cursor: 'pointer' }}>
      {children}
    </div>
  );
}

function CustomIndicator({}) {
  return null;
}

export function BorderLessSelector(
  props: SelectProps<SelectOption> & { width: number }
) {
  return (
    <div className="BorderLessSelector" style={{ width: props.width }}>
      <AppSelect
        {...props}
        styles={{
          indicatorsContainer: () => ({
            display: 'none'
          })
        }}
        components={{
          SingleValue: CustomSingleValue,
          Control: CustomControl,
          DropdownIndicator: CustomIndicator
        }}
      />
    </div>
  );
}
