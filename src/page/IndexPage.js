import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageContainer } from 'components/widget/PageContainer';
import { SeaWaves } from 'effect/SeaWaves';
import { Button } from '../components/widget/Button/Button';
import { Link } from 'react-router-dom';
import { isLogin } from 'services/login';
import { LogoBan } from 'components/commons/LogoBan/LogoBan';
import { isEnterKey } from 'utils/keyboard';
import { withRouter } from 'react-router-dom';

import 'style/page/index.scss';

class IndexPage extends Component {
  constructor() {
    super();
    this.handlePageKeyPress = this.handlePageKeyPress.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handlePageKeyPress);
  }

  componentDidMount() {}

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handlePageKeyPress);
  }

  handlePageKeyPress(event) {
    if (isLogin() && isEnterKey(event)) {
      this.props.history.push('/home');
    }
  }

  startSeaWaves() {
    const seaWaves = new SeaWaves(this.refs.seaWavesCanvas);

    seaWaves.initializeCircleContainers();
    seaWaves.loop();
  }

  renderSignBar() {
    return (
      <div className="sign-bar">
        <Link to="/signin">
          <Button className="signin-button" styleType="primary" size="middle">
            Sign In
          </Button>
        </Link>

        <Link to="/signup">
          <Button className="signup-button" styleType="default" size="middle">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  renderEnterBar() {
    return (
      <div className="enter-bar">
        <Button
          className="signup-button"
          styleType="primary"
          size="large"
          onClick={() => {
            this.props.history.push('/home');
          }}
        >
          Enter Octopus
        </Button>
      </div>
    );
  }

  renderLinkBar() {
    return isLogin() ? this.renderEnterBar() : this.renderSignBar();
  }

  render() {
    return (
      <PageContainer className="index-page">
        <LogoBan />

        <div className="image-container">
          <div className="octopus" />
        </div>

        {this.renderLinkBar()}
      </PageContainer>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default withRouter(connect(mapStateToProps)(IndexPage));
