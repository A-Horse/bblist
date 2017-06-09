import React, {Component} from 'react';

import 'style/component/nothing.scss';

export class Nothing extends Component {

  render() {
    return (
      <div className="nothing">
        <img src="/assets/images/nothing.png" />
        <div className="nothing--heading">NOTING</div>
        <div className="nothing--text">You do not have some boards yet.</div>
      </div>
    );
  }
}

export default Nothing;
