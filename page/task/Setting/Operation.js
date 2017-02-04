import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'components/widget/Modal';
import ReactCrop from 'react-image-crop';
import {ImageUploader} from 'components/ImageUploader';
import {makeRemoteUrl} from 'services/remote-storage';

import 'style/page/task/setting/infomation.scss';

class Operation extends Component {

  static get name() {
    return 'operation';
  }
  
  render() {
    return (
      <div className='board-setting-operation'>
        <h3>Operation</h3>
      </div>
    );
  }
}

export default Operation;
