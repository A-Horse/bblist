import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {PageContainer} from '../../components/widget/PageContainer';
import {makeGravatarUrl} from '../../services/gravatar';
import Loading from '../../components/widget/loading';

class Profile extends Component {
  componentWillMount() {
    this.state = {
      showChangePassword: false
    };
  }

  render() {
    return (
      <section>
      </section>
    );
  }
}

