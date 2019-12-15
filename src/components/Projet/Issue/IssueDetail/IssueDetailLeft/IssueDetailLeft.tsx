
import React, { Component } from 'react';
import { AppButton } from '../../../../widget/AppButton';

export interface InputProps {}

export class IssueDetailLeft extends Component<
  InputProps
> {
  state = {
  
  };

  componentDidMount() {
   
  }


  render() {
   
    return (
      <div className="IssueDetailLeft">
        <AppButton>到期时间</AppButton>
      </div>
    );
  }
}
