import React, {Component} from 'react';

import 'style/component/loading.scss';

export class Loading extends Component {

  render() {
    return <section className='loading'><span className='loader loader-quart'> </span></section>;
  }
}

export default Loading;
