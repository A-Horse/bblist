import React, { Component } from "react";

import "style/component/loading.scss";

export class Loading extends Component {
  render() {
    return (
      <div className="octopus-loading app-loading">
        <div className="octopus-loading--wave" />
        <div className="octopus-loading--wave-b" />
        <div className="eye">
          <div className="eyeball" />
        </div>
      </div>
    );
  }
}

export default Loading;
