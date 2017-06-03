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
        <div className="text">
          Building
        </div>
        <img className='building--illustration' src='/assets/images/octopus-building.png'/>
      </div>
    );
  }
}
