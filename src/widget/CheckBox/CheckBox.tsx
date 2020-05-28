import React, { ChangeEvent, Component } from 'react';

import './Checkbox.scss';
import { AppIcon } from '../Icon';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';

export class Checkbox extends Component<{
  defaultChecked: boolean;
  onChange?: (checked: boolean) => void;
}> {
  onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!this.props.onChange) {
      return;
    }
    this.props.onChange(event.target.checked);
    event.stopPropagation();
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
        <AppIcon className="check-square" icon={faCheckSquare} />
        <AppIcon className="square" icon={faSquare} />
      </label>
    );
  }
}
