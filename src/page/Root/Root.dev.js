import React, { Component } from 'react';
import { Application } from '../../Application';
import { DevTools } from '../../components/DevTools';

export default class Root extends Component {
  render() {
    return (
      <div>
        <Application />
        <DevTools />
      </div>
    );
  }
}
