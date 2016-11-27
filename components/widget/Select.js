import React, {Component, PropTypes} from 'react';
import {ArrowDown} from 'services/svg-icons';
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
      value: null,
      name: 'please select'
    };
  }

  componentDidMount() {
    this.props.defaultItem && this.setState(this.props.defaultItem);  
  }

  componentDidUpdate() {}

  componentWillReceiveProps(newProps) {
    newProps.defaultItem && this.setState(newProps.defaultItem);
  }
  
  openSelect() {
    this.setState({toggle: !this.state.toggle});
  }

  buildBoxClassName() {
    return `select--box ${this.state.toggle ? 'select--box__opening' : 'select-box__closed'}`;
  }

  renderItems() {
    return this.props.items.map(item => (<li key={item.value} className='select--item' onClick={() => this.clickItem(item)}>{item.name}</li>));
  }

  clickItem(item) {
    this.setState({value: item.value, name: item.name, toggle: false});
    // TODO delete
    this.props.onClick && this.props.onClick();
    this.props.onSelect && this.props.onSelect();
  }
  
  render() {
    return (
      <div className='select'>
        <div className={this.buildBoxClassName()} onClick={this.openSelect.bind(this)}>
          <p>{this.state.name}</p>
          <ArrowDown/>
        </div>
        <ul className='select--container' style={{display: this.state.toggle ? 'block' : 'none'}}>
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}
