import React, {Component} from 'react';
import Nav from 'containers/Nav';

export default class App extends Component {
  componentWillMount() {
    // TODO props.actions
    this.props.authUser();
  }

  render() {
    return (
      <div>
        <Nav/>
        {this.props.children}
      </div>
    );
  }
}
