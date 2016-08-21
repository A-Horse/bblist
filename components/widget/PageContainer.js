import React, {Component, PropTypes} from 'react';

const styles = {
  container: {
    position: 'relative',
    width: '80%',
    margin: 'auto',
    height: '100%'
  }
}

export class PageContainer extends Component {
  propTypes: {
    children: PropTypes.isRequired
  }
  render() {
    return (
        <div style={Object.assign({}, styles.container, this.props.style)} className='page-container'>
        {this.props.children}
      </div>
    );
  }
}

