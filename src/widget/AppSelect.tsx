import Select from 'react-select';
import React from 'react';
import './AppSelect.scss';

export function AppSelect(props) {
  return (
    <Select
      {...props}
      className={`AppSelect ${props.className || ''}`}
      classNamePrefix="App-select"
    />
  );
}
