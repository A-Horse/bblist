import React, {Component, PropTypes} from 'react';
import 'style/component/widget/select.scss';

export class Select extends Component {
  defaultProps: {
    items: PropTypes.array.isRequired,
    value: PropTypes.isRequired
  }
  
  constructor() {
    super();
    this.state = {
      toggle: false,
      value: 'please select',
      name: 'please select'
    };
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
    this.setState({
      toggle: !this.state.toggle
    });
  }

  renderItems() {
    return this.props.items.map(item => (<li key={item.name} className='select--item' onClick={() => this.clickItem(item)}>{item.name}</li>));
  }

  clickItem(item) {
    this.setState({value: item.value, name: item.name, toggle: false});
  }
  
  render() {
    return (
      <div className='select'>
        <div className='select--box' onClick={() => this.openSelect()}>
          <p>{this.state.name}</p>
        </div>
        <ul className='select--container' style={{display: this.state.toggle ? 'block' : 'none'}}>
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}
