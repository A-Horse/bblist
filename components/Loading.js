import React, {Component} from 'react';

import 'style/component/loading.scss';

export class Loading extends Component {

  render() {
    return (
      <div className="octopus-loading">
        <div className="octopus-loading--wave"></div>
        <div className="eye">
          <div className="eyeball"></div>
        </div>
      </div>
    );
  }
}

export default Loading;
