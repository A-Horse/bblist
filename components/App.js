import React, {Component} from 'react';
import Nav from 'containers/Nav';
import Loading from 'components/Loading';
import { browserHistory } from 'react-router';

export default class App extends Component {
  componentWillMount() {
    // TODO props.actions
    this.props.authUser();
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    if (!this.props.isAuthenticated) {
      browserHistory.push('/signin');
    }
  }

  render() {
    if (this.props.isFetching || !this.props.isAuthenticated) {
      return <Loading/>;
    }
    return (
      <div>
        <Nav/>
        {this.props.children}
      </div>
    );
  }
}
