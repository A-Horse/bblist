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
    if (!newProps.isFetching && !newProps.isAuthenticated) {
      return browserHistory.push('/signin');
    }
  }

  render() {
    if (this.props.isFetching) {
      return <Loading/>;
    } else if (!this.props.isFetching && !this.props.isAuthenticated) {
      return null;
    } else {
      console.log(this.props);
      return (<div><Nav/>{this.props.children}</div>)
    }
  }
}
