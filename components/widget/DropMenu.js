import React, { Component, PropTypes } from 'react';

let styles = {
  currentItem: {
  },
  itemsContainer: {
    border: '1px solid #999'
  },
  item: {
    cursor: 'default'
  }
}

export class DropMenu extends Component {
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
    if( this.props.toggle ){
      return this.props.children;
    } else {
      return null;
    }
  }
}
