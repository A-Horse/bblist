import React, {Component} from 'react';
import Nav from 'containers/Nav';
import Loading from 'components/Loading';

export default class App extends Component {
  componentWillMount() {
    // TODO props.actions
    this.props.authUser();
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <div>
          <Nav/>
          {this.props.children}
        </div>
      );
    } else {
      return <Loading/>;
    }
  }
}
