import React, {Component, PropTypes} from 'react';

export class DropList extends Component {
  defaultProps: {
    toggle: PropTypes.required
  }
  
  constructor() {
    super();
    
  }
  
  init() {
    
  }

  componentDidMount() {
    
  }

  componentDidUpdate() {
    
  }

  openSelect() {
    
  }
  
  render() {
    if (this.props.toggle) {
      return this.props.children;
    } else {
      return null;
    }
  }
}
