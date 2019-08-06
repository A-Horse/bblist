import React, { Component } from 'react';


export class Side extends Component<{
    width?: number
}> {

  render() {
    return (
        <div style={{
            width: this.props.width || 200
        }}>
            {this.props.children}
        </div>
    )
  }
}
