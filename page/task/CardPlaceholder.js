import React, { Component } from 'react';

import 'style/page/task/card-placeholder.scss';

class CardPlaceholder extends Component {
  buildStyle() {
    const { height, width } = this.props;
    return {
      height: height + 'px',
      width: width + 'px'
    };
  }

  render() {
    return <div className="task-card-placeholder" style={this.buildStyle()} />;
  }
}

export default CardPlaceholder;
