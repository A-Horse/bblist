import React, {Component} from 'react';
import {connect} from 'react-redux';

import 'style/component/image-upload.scss';

class ImageUpload extends Component {

  onClick(event) {
    
  }

  render() {
    return (
      <div className='image-upload'
           onClick={this.onClick.bind(this)}>
        <image />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    
  };
};

export default connect(mapStateToProps)(ImageUpload);
