import React, { Component, DetailedHTMLProps, InputHTMLAttributes } from 'react';

export class AppInput extends Component<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> {
  render() {
    return <input {...this.props} />;
  }
}
