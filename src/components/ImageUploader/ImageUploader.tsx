import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import { imageCrop } from './ImageUploader.helper';
import { AppModal } from '../../widget/Modal/AppModal';
import { ModalHeader } from '../../widget/Modal/ModalHeader/ModalHeader';

import { ModalFooter } from '../../widget/Modal/ModalFooter/ModalFooter';
import { ConfirmButtonGroup } from '../../widget/ButtonGroup/ConfirmGroup/ConfirmGroup';
import './ImageUploader.scss';
import 'react-image-crop/dist/ReactCrop.css';

export class ImageUploader extends Component<{
  style: any;
  upload: Function;
  source: any;
  modalTitle: string;
}> {
  private fileInput: any;
  state = {
    modalVisible: false,
    imageDataURL: '',
    cropedImageDataUrl: '',
    crop: {
      x: 0,
      y: 0,
      aspect: 16 / 9,
      width: 80,
      height: 45,
    },
  };

  handleCancelModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  upload = () => {
    this.props.upload(this.state.cropedImageDataUrl);
    this.closeModal();
  };

  private cropImage = async (crop, pixelCrop) => {
    if (!pixelCrop) {
      return;
    }
    const cropedImageDataUrl = await imageCrop(
      this.state.imageDataURL,
      pixelCrop.width,
      pixelCrop.height,
      pixelCrop.x,
      pixelCrop.y
    );
    this.setState({ cropedImageDataUrl });
    this.setState({ crop });
  };

  private onCropChange = (crop, pixelCrop) => {
    this.setState({ crop });
  };

  private onCropComplete = (crop, pixelCrop) => {
    this.cropImage(crop, pixelCrop);
  };

  private onImageLoaded = (target: HTMLImageElement) => {};

  openFilePicker = () => {
    this.fileInput.click();
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  openModal = () => {
    if (!this.fileInput.files) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.setState({ imageDataURL: e.target.result });
    };
    reader.readAsDataURL(this.fileInput.files[0]);
    this.setState({ modalVisible: true });
    this.fileInput.value = '';
  };

  render() {
    return (
      <div className="image-upload">
        <img
          style={{
            backgroundColor: '#f8f8f8',
            ...this.props.style,
          }}
          alt=""
          src={this.props.source}
          onClick={this.openFilePicker}
        />
        <input
          ref={(ref) => (this.fileInput = ref)}
          type="file"
          accept="image/*"
          onChange={this.openModal}
        />

        <AppModal
          className="ImageUploaderModal"
          onRequestClose={this.handleCancelModal}
          isOpen={this.state.modalVisible}
        >
          <ModalHeader
            title={this.props.modalTitle}
            onClose={this.handleCancelModal}
          ></ModalHeader>
          <div className="crop-image-container">
            <ReactCrop
              style={{ maxHeight: '60vh' }}
              crop={this.state.crop}
              onChange={this.onCropChange}
              onComplete={this.onCropComplete}
              onImageLoaded={this.onImageLoaded}
              src={this.state.imageDataURL}
            />
          </div>
          <ModalFooter>
            <ConfirmButtonGroup
              confirmText="上传"
              onCancel={this.handleCancelModal}
              onConfirm={this.upload}
            />
          </ModalFooter>
        </AppModal>
      </div>
    );
  }
}
