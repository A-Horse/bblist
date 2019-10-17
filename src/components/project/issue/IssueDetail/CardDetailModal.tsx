import './CardDetail.scss';

import React, { Component } from 'react';

export class CardDetailModal extends Component<any, any> {
  state = { toggle: true };

  render() {
    const { card } = this.props;

    return <div>detail</div>;
  }
}
