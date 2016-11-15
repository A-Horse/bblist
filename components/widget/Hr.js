import React, {Component, PropTypes} from 'react';

const mainStyle = {
  height: '1px',
  width: '100%',
  backgroundColor: '#E5E5E5'
};

export class Hr extends Component {
  buildClassName() {
    return this.props.className ? 'hr ' + this.props.className : 'hr';
  }
  render() {
    const {style} = this.props;
    return (
        <div style={Object.assign(mainStyle, style)} className={this.buildClassName()}></div>
    );
  }
}
