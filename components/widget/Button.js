import React, {Component} from 'react';
import {ThemeConst} from '../../style/theme';

const styles = {
  button: {
    borderRadius: '3px',
    cursor: 'pointer'
  },
  small: {
    
  },
  midde: {
    
  },
  large: {
    
  },
  default: {
    border: `1px solid ${ThemeConst.border.color.default}`,
    backgroundColor: '#fff'
  },
  primary: {
    backgroundColor: ThemeConst.color.primary
  },
  disable: {
    backgroundColor: ThemeConst.color.disable
  }
};

export class Button extends Component {
  static propTypes = {
    size: React.PropTypes.oneOf(['small', 'middle', 'large']),
    styleType: React.PropTypes.oneOf(['default', 'primary', 'disable'])
  };
  
  render() {
    const {style, size = 'middle', styleType = 'default'} = this.props;
    return (
      <button style={Object.assign(styles.button, style, styles[size], styles[styleType])}
              onClick={this.props.onClick} type={this.props.type}>
          {this.props.children}
      </button>
    );
  }
}
