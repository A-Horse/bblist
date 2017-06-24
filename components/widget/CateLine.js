import React, {Component, PropTypes} from 'react';



export class CateLine extends Component {
  propTypes: {
    children: PropTypes.isRequired
  }
  render() {
    return (
      <div>
        <span>{this.props.children}</span>
        <span></span>
      </div>
    );
  }
}
