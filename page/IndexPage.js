import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PageContainer} from 'components/widget/PageContainer';
import {SeaWaves} from 'effect/SeaWaves';
import {Button} from '../components/widget/Button';
import {Link} from 'react-router';

import 'style/page/index.scss';

class IndexPage extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    const seaWaves = new SeaWaves(this.refs.seaWavesCanvas);

    //Initialize the CircleContainer objects
    seaWaves.initializeCircleContainers();

    //Start the initial loop function for the first time
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
      <div className=''>
        
      </div>
    );
  }

  renderLinkBar() {
    
  }

  render() {
    return (
      <PageContainer className='index-page'>
        
        <canvas ref='seaWavesCanvas' className="sea-waves">
          Your browser doesn't support canvas
        </canvas>

        <div className='mask'></div>

        <div className='index-main'>
          
          

          

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
