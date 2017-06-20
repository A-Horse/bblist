import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageContainer } from 'components/widget/PageContainer';
import { SeaWaves } from 'effect/SeaWaves';
import { Button } from '../components/widget/Button';
import { Link, browserHistory } from 'react-router';
import { isLogin } from 'services/login';
import { LogoBan } from 'components/commons/LogoBan';
import { isEnterKey } from 'utils/keyboard';

import 'style/page/index.scss';

class IndexPage extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handlePageKeyPress);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handlePageKeyPress);
  }

  handlePageKeyPress(event) {
    if ( isLogin() && isEnterKey(event) ) {
      browserHistory.push('/home');
    }
  }

  startSeaWaves() {
    const seaWaves = new SeaWaves(this.refs.seaWavesCanvas);

    seaWaves.initializeCircleContainers();
    seaWaves.loop();
  }

  renderSignBar() {
    return (
      <div className='sign-bar'>
        <Link to="/signin">
          <Button className='signin-button' styleType='primary' size='middle' onClick={() => {browserHistory.push('/signin')}}>Sign In</Button>
        </Link>

        <Link to="/signup">
          <Button className='signup-button' styleType='default' size='middle' onClick={() => {browserHistory.push('/signup')}}>Sign Up</Button>
        </Link>
      </div>
    );
  }

  renderEnterBar() {
    return (
      <div className='enter-bar'>
        <Button className='signup-button' styleType='primary' size='large' onClick={() => {browserHistory.push('/home')}}>Enter Octopus</Button>
      </div>
    );
  }


  renderLinkBar() {
    return isLogin() ? this.renderEnterBar() : this.renderSignBar();
  }


  render() {
    return (
      <PageContainer className='index-page'>

        <LogoBan />

        <div className="image-container">
          <div className="octopus"></div>
        </div>

        {this.renderLinkBar()}

      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(IndexPage);
