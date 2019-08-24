import React, { Component, ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export class AppButton extends Component<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> {

  render() {
    return <button {...this.props} />;
  }
}
