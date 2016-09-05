import React, {Component, PropTypes} from 'react';
import {spawnMixinRender} from '../../style/theme-render';

const styles = {
  container: {
    width: '100%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  name: {
    display: 'inline-block',
    whiteSpace: 'nowrap'
  },
  line: {
    display: 'inline-block',
    verticalAlign: 'middle',
    height: '1px',
    width: '100%',
    marginLeft: '0.5rem',
    marginTop: '3px'
  }
};
const mainThemeRender = spawnMixinRender(styles);
mainThemeRender('line', 'lightDarkBackground');


export class CateLine extends Component {
  propTypes: {
    children: PropTypes.isRequired
  }
  render() {
    return (
      <div style={styles.container}>
        <span style={styles.name}>{this.props.children}</span>
        <span style={styles.line}></span>
      </div>
    );
  }
}
