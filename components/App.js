import React, {Component} from 'react';
import Nav from 'containers/Nav';
import Loading from 'components/Loading';
import { browserHistory } from 'react-router';

export default class App extends Component {
  componentWillMount() {
    // TODO props.actions
    this.props.authUser();
  }

  render() {
    if (this.props.isFetching) {
      return <Loading/>;
    } else {
      return (<div><Nav/>{this.props.children}</div>)
    }
  }
}
