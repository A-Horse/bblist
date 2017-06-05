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
        <div>
          <img className='building--illustration' src='/assets/images/octopus-building.png'/>
        </div>

        <div className="text">
          This page is under building
        </div>
      </div>
    );
  }
}
