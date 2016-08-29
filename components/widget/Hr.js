import React, {Component, PropTypes} from 'react';

const mainStyle = {
  height: '1px',
  width: '100%',
  backgroundColor: '#999'
};

export class Hr extends Component {
  render() {
    const {style} = this.props;
    return (
        <div style={Object.assign(mainStyle, style)}>
        </div>
    );
  }
}
