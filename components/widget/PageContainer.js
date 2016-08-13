import React, {Component} from 'react';

const styles = {
  container: {
    width: '80%',
    margin: 'auto'
  }
}

export class PageContainer extends Component {
  propTypes: {
    children: PropTypes.isRequired
  }
  render() {
    return (
      <div style={styles.container} className='page-container'>
        {this.props.children}
      </div>
    );
  }
}
