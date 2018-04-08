import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import { imageCrop } from 'services/image-crop';
import { Button } from 'components/widget/Button/Button';
import { Modal } from 'components/widget/Modal/Modal';

import './ImageUploader.scss';

const crop = { width: 30, aspect: 2 / 1 };

export class ImageUploader extends Component {
  static propTypes = {
    uploadFn: PropTypes.func.isRequired,
    children: PropTypes.any
  };

  state = { imageDataURL: '', cropedimageDataUrl: '', crop };

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.upload = this.upload.bind(this);
    this.openFilePicker = this.openFilePicker.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onCropChange = this.onCropChange.bind(this);
    this.onCropComplete = this.onCropComplete.bind(this);
  }

  upload() {
    this.props.uploadFn(this.state.cropedimageDataUrl);
    this.closeModal();
  }

  async cropImage(crop, pixelCrop) {
    const cropedimageDataUrl = await imageCrop(
      this.state.imageDataURL,
      pixelCrop.width,
      pixelCrop.height,
      pixelCrop.x,
      pixelCrop.y
    );
    this.setState({ cropedimageDataUrl });
    this.setState({ crop });
  }

  onCropChange(crop, pixelCrop) {
    this.cropImage(crop, pixelCrop);
  }

  onCropComplete(crop, pixelCrop) {
    this.cropImage(crop, pixelCrop);
  }

  onImageLoaded(crop, image, pixelCrop) {
    this.cropImage(crop, pixelCrop);
  }

  openFilePicker() {
    this.fileInput.click();
  }

  closeModal() {
    this.setState({ modalToggle: false });
  }

  openModal() {
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({ imageDataURL: e.target.result });
    };
    reader.readAsDataURL(this.fileInput.files[0]);
    this.setState({ modalToggle: true });
  }

  render() {
    return (
      <div className="image-uploader">
        <Button
          borderType="primary"
          className="image-uploader--button"
          onClick={this.openFilePicker.bind(this)}
        >
          {this.props.children || 'Upload'}
        </Button>
        <input
          ref={ref => (this.fileInput = ref)}
          type="file"
          accept="image/*"
          onChange={this.openModal.bind(this)}
        />
        <Modal
          className="image-uploader-modal"
          toggle={this.state.modalToggle}
          close={this.closeModal.bind(this)}
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
            <div>
              <Button styleType="primary" onClick={this.upload}>
                Upload
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
