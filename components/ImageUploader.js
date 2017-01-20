import React, {Component} from 'react';
import {Button} from 'components/widget/Button';
import {Modal} from 'components/widget/Modal';
import ReactCrop from 'react-image-crop';


import 'style/image-uploader.scss';

export class ImageUploader extends Component {
  constructor() {
    super();
    this.state = {modalOpen: false};
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
        <p>sdsd</p>
      </Modal>
    );
  }

  onClickButton(event) {
    this.refs['input-file'].click();
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  openModal() {
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

