import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'components/widget/Modal';
import ReactCrop from 'react-image-crop';
import {ImageUploader} from 'components/ImageUploader';
import {makeRemoteUrl} from 'services/remote-storage';

import 'style/page/task/setting/infomation.scss';

class Preference extends Component {

  static get name() {
    return 'preference';
  }


  render() {
    return (
      <div className='board-setting-preference'>
        <h3>Preference</h3>
      </div>
    );
  }
}

export default Preference;
