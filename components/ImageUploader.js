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
  
  componentWillMount() {
    
  }
  
  componentDidMount() {
    
  }

  componentDidUpdate() {

  }

  renderModal() {
    return (
      <Modal toggle={this.state.modalOpen} close={this.closeModal.bind(this)}>
        <div>
          <p>Upload</p>
          <ReactCrop onComplete={this.onCropComplete.bind(this)} src={this.state.imageDataURL}/>
          <img src={this.state.cropedimageDataUrl} />
        </div>
      </Modal>
    );
  }

  async onCropComplete(crop, pixelCrop) {
    console.log(crop, pixelCrop);
    const cropedimageDataUrl = await imageCrop(this.state.imageDataURL,
                                               pixelCrop.width, pixelCrop.height, pixelCrop.x, pixelCrop.y);
    console.log("cropedimageDataUrl = ", cropedimageDataUrl);
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
    reader.onload = (e) => {
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

