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

export class Select extends Component {
  defaultProps: {
    items: PropTypes.array.isRequired,
    value: PropTypes.isRequired
  }
  
  constructor() {
    super()
    this.state = {
      isOpen: false,
      value: 'please select'
    }
  }
  
  init() {
    
  }

  componentDidMount() {
    
  }

  componentDidUpdate() {
    // if (this.focusAfterRender) {
    //   //this.focusContent();
    //   //this.setFocusAfterRender(false);
    // }
  }

  openSelect() {
    styles.itemsContainer.display = 'block';
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  renderItems() {
    const {items} = this.props;
    return items.map(item => (<li key={item.name} style={styles.item}
                         onClick={() => this.clickItem(item)}>{item.name}</li>));
  }

  clickItem(item) {
    this.setState({value: item.value,
                   isOpen: false})
  }
  
  render() {
    return (
      <div>
        <div style={styles.currentItem} onClick={() => this.openSelect()}>
          <p>{this.state.value}</p>
        </div>
        <ul style={Object.assign({}, styles.itemsContainer,
             {display: this.state.isOpen ? 'block' : 'none'})}>
          {this.renderItems()}
        </ul>
      </div>
    )
  }
}