import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PageContainer} from 'components/widget/PageContainer';
import {SeaWaves} from 'effect/SeaWaves';
import {Button} from '../components/widget/Button';
import {Link, browserHistory} from 'react-router';
import {isLogin} from 'services/login';
import {LogoBan} from 'components/commons/LogoBan';

import 'style/page/index.scss';

class IndexPage extends Component {
  constructor() {
    super();
  }

  componentWillMount() {

  }

  componentDidMount() {
    setTimeout(() => {
      const windWidth = window.innerWidth;
      const windHeight = window.innerHeight;
      var s = Snap(".svg-main");
      var bigCircle = s.circle(150, 150, 100);
      bigCircle.attr({
        fill: "#7fd5f3"
      });
    }, 1000);
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

  renderCanvas() {
    return (
      <canvas ref='seaWavesCanvas' className="sea-waves">
        Your browser doesn't support canvas
      </canvas>
    );
  }

  renderLinkBar() {
    return isLogin() ? this.renderEnterBar() : this.renderSignBar();
  }

  renderIndex() {
    return (
      <div className='index-main'>

        <div className='logo-container'>
          <LogoBan/>
        </div>

        <div className='octopus'>
          <img className='octopus--svg' src='/static/octopus.svg'/>
        </div>

        {this.renderLinkBar()}
      </div>
    );
  }

  render() {
    return (
      <PageContainer className='index-page'>

        <div ref="svg-main">
          <svg className="svg-main" width="600" height="600"/>
        </div>

      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(IndexPage);
