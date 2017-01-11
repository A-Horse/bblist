import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PageContainer} from 'components/widget/PageContainer';
import {SeaWaves} from 'effect/SeaWaves';

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

  render() {
    return (
      <PageContainer className='index-page'>
        
        <canvas ref='seaWavesCanvas' className="sea-waves">
          Your browser doesn't support canvas
        </canvas>
        
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  };
};

export default connect(mapStateToProps)(IndexPage);
