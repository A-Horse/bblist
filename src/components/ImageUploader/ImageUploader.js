// @flow
import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import { imageCrop } from '../../services/image-crop';
import { Button, Modal } from 'antd';

import './ImageUploader.less';

const crop = { width: 30, aspect: 2 / 1 };

export class ImageUploader extends Component<
  {
    uploadFn: any,
    children: any
  },
  {
    modalVisible: boolean,
    imageDataURL: string,
    cropedimageDataUrl: string,
    crop: any
  }
> {
  state = { modalVisible: false, imageDataURL: '', cropedimageDataUrl: '', crop };
  fileInput: any;

  handleCancelModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  upload = () => {
    this.props.uploadFn(this.state.cropedimageDataUrl);
    this.closeModal();
  };

  cropImage = async (crop, pixelCrop) => {
    console.log(crop, pixelCrop);
    if (!pixelCrop) {
      return;
    }
    const cropedimageDataUrl = await imageCrop(
      this.state.imageDataURL,
      pixelCrop.width,
      pixelCrop.height,
      pixelCrop.x,
      pixelCrop.y
    );
    this.setState({ cropedimageDataUrl });
    this.setState({ crop });
  };

  onCropChange = (crop, pixelCrop) => {
    this.cropImage(crop, pixelCrop);
  };

  onCropComplete = (crop, pixelCrop) => {
    this.cropImage(crop, pixelCrop);
  };

  onImageLoaded = (crop, image, pixelCrop) => {
    this.cropImage(crop, pixelCrop);
  };

  openFilePicker = () => {
    this.fileInput.click();
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  openModal = () => {
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({ imageDataURL: e.target.result });
    };
    reader.readAsDataURL(this.fileInput.files[0]);
    this.setState({ modalVisible: true });
  };

  render() {
    return (
      <div className="image-uploader">
        <Button className="image-uploader--button" onClick={this.openFilePicker}>
          {this.props.children || 'Upload'}
        </Button>
        <input
          ref={ref => (this.fileInput = ref)}
          type="file"
          accept="image/*"
          onChange={this.openModal}
        />
        <Modal
          className="image-uploader-modal"
          onCancel={this.handleCancelModal}
          visible={this.state.modalVisible}
          footer={[<Button onClick={this.upload}>Upload</Button>]}
        >
          <div>
            <div>
              <h2>Upload Image</h2>
            </div>

            <div>
              <div className="crop-image-container">
                <ReactCrop
                  crop={this.state.crop}
                  onChange={this.onCropChange}
                  onComplete={this.onCropComplete}
                  onImageLoaded={this.onImageLoaded}
                  src={this.state.imageDataURL}
                />
              </div>

              <div className="upload-link" onClick={this.openFilePicker}>
                <i className="fa fa-picture-o" aria-hidden="true" />
                <a>Choose Image:</a>
              </div>
            </div>

            <img className="upload--preview-image" src={this.state.cropedimageDataUrl} />
          </div>
        </Modal>
      </div>
    );
  }
}
