import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PageContainer} from 'components/widget/PageContainer';
import {SeaWaves} from 'effect/SeaWaves';
import {Button} from '../components/widget/Button';
import {Link} from 'react-router';
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
          <Button className='signin-button' styleType='primary' size='middle'>Sign In</Button>
        </Link>
        
        <Link to="/signup">
          <Button className='signup-button' styleType='default' size='middle'>Sign Up</Button>
        </Link>
      </div>
    );
  }

  renderEnterBar() {
    return (
      <div className='enter-bar'>
        
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

  render() {
    return (
      <PageContainer className='index-page'>

        <div className='mask'></div>

        <div className='index-main'>
          
          <div className='logo-container'>
            
          </div>

          {this.renderLinkBar()}
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
