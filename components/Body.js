import React, {Component} from 'react';
import {connect} from 'react-redux';

const style = {
  
};

class Body extends Component {

  onClick(event) {
    const {bubbleHandles} = this.props;
    bubbleHandles.forEach(handle => handle(event));
  }

  onClickCapture(event) {
    const {captureHandles} = this.props;
    captureHandles.forEach(handle => handle(event));
  }
  
  render() {
    return (
      <div onClick={this.onClick.bind(this)} onClickCapture={this.onClickCapture.bind(this)}>
        {this.props.children}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    bubbleHandles: state.event.body.bubbleHandles,
    captureHandles: state.event.body.captureHandles
  }
};

export default connect(mapStateToProps)(Body);
