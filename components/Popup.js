import React, {Component} from 'react';
import {Modal} from 'components/widget/Modal';
import {DateIcon, CloseIcon} from 'services/svg-icons';


import 'style/component/popup.scss';



class Popup extends Component {

  constructor() {
    super();
    this.state = {toggle: false};
  }

  getParentOffset() {
    const rect = this.refs.main.parentNode.getBoundingClientRect();
    this.x = rect.left + rect.width / 2;
    this.y = rect.bottom + rect.height / 2;
  }

  componentDidMount() {
    this.getParentOffset();
  }

  buildClassName() {
    let className = 'popup';
    if (this.props.className) {
      className += ` ${this.props.className}`;
    }
    return className;
  }
  
  buildModalStyle() {
    if (!this.x || !this.y) {
      return null;
    }

    return {
      left: this.x + 'px',
      top: this.y + 'px'
    };
  }
  
  render() {
    return (
      <div ref='main' className={this.buildClassName()}>        
        <Modal className={this.buildClassName()} toggle={this.props.toggle}
               overlayStyle={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
               modalStyle={this.buildModalStyle()}
               onOverlayClick={this.props.onOverlayClick} close={this.props.close}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default Popup;
