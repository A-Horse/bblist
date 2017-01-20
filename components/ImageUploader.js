import React, {Component} from 'react';
import {Button} from 'components/widget/Button';
import {Modal} from 'components/widget/Modal';
import ReactCrop from 'react-image-crop';

import 'style/image-uploader.scss';

export class ImageUploader extends Component {
  componentWillMount() {
    
  }
  
  componentDidMount() {
    
  }

  componentDidUpdate() {

  }

  renderModal() {
    return (
      <Modal>
        <ReactCrop src={this.state.coverDataURL}/>
      </Modal>
    );
  }

  render() {
    return (
      <div>
        <input type='file' className='' />
      </div>
    );
  }
}

