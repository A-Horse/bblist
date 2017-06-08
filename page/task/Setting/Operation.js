import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'components/widget/Modal';
import ReactCrop from 'react-image-crop';
import {ImageUploader} from 'components/ImageUploader';
import {makeRemoteUrl} from 'services/remote-storage';
import Button from 'components/widget/Button';

import 'style/page/task/setting/operation.scss';

class Operation extends Component {
  render() {
    return (
      <div className='board-setting-operation'>
        <h3>Operation</h3>

        <div className='board-delete'>
          <div className='board-delete--heading'>Delete this Board:</div>
          <div>
            <Button styleType='dangerous' onClick={() => this.props.deleteBoard(this.props.params.id)}>Delete</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Operation;
