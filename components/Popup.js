import React, {Component} from 'react';
import {Modal} from 'components/widget/Modal';
import {DateIcon, CloseIcon} from 'services/svg-icons';
import {getWindowScrollPosition} from 'services/scroll';
import ClickOutSide from 'components/utils/ClickOutSide';
import 'style/component/popup.scss';

class Popup extends Component {
  constructor() {
    super();
    this.state = {toggle: false};
  }

  // getParentOffset() {
  //   const rect = this.refs.main.parentNode.getBoundingClientRect();
  //   this.x = rect.left + rect.width / 2;
  //   this.y = rect.bottom + rect.height / 2;
  // }

  checkUpDown() {
    const rect = this.props.parent.getBoundingClientRect();
    const body = document.body,
          html = document.documentElement;
    const docHeight = Math.max( body.scrollHeight, body.offsetHeight,
                                window.screen.height,
                                html.clientHeight, html.scrollHeight, html.offsetHeight);
    return rect.top + (rect.top - rect.bottom) / 2 > docHeight / 2 ? 'top' : 'bottom';
    
  }

  buildClassName() {
    let className = 'popup';
    if (this.props.className) {
      className += ` ${this.props.className} ${this.checkUpDown()}`;
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
    if (this.props.toggle) {
      return (
        <ClickOutSide onClickOutside={this.props.close ? this.props.close : null}>
          <div ref='main' className={this.buildClassName()}>
            {this.props.children}
          </div>
        </ClickOutSide>
      );
    }
    return React.DOM.noscript();
  }
}

export default Popup;
