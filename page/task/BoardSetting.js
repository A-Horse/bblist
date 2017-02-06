import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'components/widget/Modal';
import ReactCrop from 'react-image-crop';
import {ImageUploader} from 'components/ImageUploader';
import R from 'ramda';

import Infomation from './Setting/Infomation';
import Operation from './Setting/Operation';
import Preference from './Setting/Preference';
import 'style/page/task/board-setting.scss';
import {Link} from 'react-router';

// TODO remove container because do not need
export class BoardSetting extends Component {
  getCurrentBoard() {
    const {normalizedBoard} = this.props;
    return normalizedBoard.entities[this.props.params.id];
  }

  componentWillMount() {
  }

  componentWillReceiveProps() {
  }
  
  deleteTaskBoard() {
    this.props.deleteBoard(this.props.params.id);
  }

  switchPanel(panel) {
    this.setState({currentPanel: panel});
  }
  
  renderSideBarItems() {
    return (
      <ul>
        <li><Link to='infomation'>Infomation</Link></li>
        <li><Link to='preference'>Preference</Link></li>
        <li><Link to='operation'>Operation</Link></li>
      </ul>
    );
  }
  
  render() {
    return (
      <div className='board-setting-page'>

        <div className='board-setting-side-bar'>
          <ul>
            {this.renderSideBarItems()}
          </ul>
        </div>

        <div className='board-setting-panel'>
          {this.props.children}
        </div>        
      </div>
    );
  }
}

export default BoardSetting;
