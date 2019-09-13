import React, { Component, ButtonHTMLAttributes, DetailedHTMLProps, PureComponent } from 'react';

export class AppButton extends PureComponent<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> {
  render() {
    return <button {...this.props} />;
  }
}
