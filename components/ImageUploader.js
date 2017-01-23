import React, {Component} from 'react';
import {Button} from 'components/widget/Button';
import {Modal} from 'components/widget/Modal';
import ReactCrop from 'react-image-crop';
import {imageCrop} from 'services/image-crop';


import 'style/image-uploader.scss';

export class ImageUploader extends Component {
  constructor() {
    super();
    this.state = {imageDataURL: '', cropedimageDataUrl: ''};
  }

  renderModal() {
    return (
      <Modal toggle={this.state.modalOpen} close={this.closeModal.bind(this)}>
        <div>
          <p>Upload</p>
          <ReactCrop onComplete={this.onCropComplete.bind(this)}
                     onChange={this.onCropChange.bind(this)}
                     src={this.state.imageDataURL}/>
          <img src={this.state.cropedimageDataUrl} />
          <div>
            <Button styleType='primary' onClick={this.upload.bind(this)}>Upload</Button>
          </div>
        </div>
      </Modal>
    );
  }

  upload() {
    
  }

  // TODO 太卡，采用DOM方法
  async onCropChange(crop, pixelCrop) {
    const cropedimageDataUrl = await imageCrop(this.state.imageDataURL, pixelCrop.width, pixelCrop.height, pixelCrop.x, pixelCrop.y);
    this.setState({cropedimageDataUrl});
  }

  async onCropComplete(crop, pixelCrop) {
    const cropedimageDataUrl = await imageCrop(this.state.imageDataURL, pixelCrop.width, pixelCrop.height, pixelCrop.x, pixelCrop.y);
    this.setState({cropedimageDataUrl});
  }

  onClickButton() {
    this.refs['input-file'].click();
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  openModal() {
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({imageDataURL: e.target.result});
    };
    reader.readAsDataURL(this.refs['input-file'].files[0]);
    this.setState({modalOpen: true});
  }

  render() {
    return (
      <div className='image-uploader'>
        <Button className='image-uploader--button' onClick={this.onClickButton.bind(this)}>Upload</Button>
        <input ref='input-file' type='file' onChange={this.openModal.bind(this)}/>
        {this.renderModal()}
      </div>
    );
  }
}

