import React, {Component} from 'react';

import 'style/page/building.scss';

export default class Building extends Component {

  componentWillMount() {
    this.state = {
      errorMessage: {}
    };
  }
  
  render() {
    return (
      <div className='building'>
        <img className='building--illustration' src='/static/image/building-illustration.png'/>
      </div>
    );
  }
}
