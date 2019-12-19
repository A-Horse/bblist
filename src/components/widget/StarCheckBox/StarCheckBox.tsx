import React, { Component, ChangeEvent } from 'react';

export class StarCheckBox extends Component<{
  defaultChecked: boolean;
  onChange?: (checked: boolean) => void;
}> {
  onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!this.props.onChange) {
      return;
    }
    this.props.onChange(event.target.checked);
  };

  render() {
    return (
      <label className="app-rounded-checkbox app-checkbox">
        <input
          type="checkbox"
          value="None"
          defaultChecked={this.props.defaultChecked}
          onChange={this.onChange}
        />
        <span className="label" />
      </label>
    );
  }
}

export default StarCheckBox;