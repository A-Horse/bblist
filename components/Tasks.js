import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Radium from 'radium';
import {createTaskWall, getAllTaskWall} from '../actions/task-wall';
import {Modal} from './widget/Modal';
import {Select} from './widget/Select';
import {spawnThemeRender} from '../style/theme-render';
import {ThemeConst} from '../style/theme';
import {getAssets} from '../services/assets-manager';
import {CloseIcon} from '../services/svg-icons';

const styles = {
  wallStyle: {
    borderRadius: '3px',
    padding: '8px 16px',
    margin: '8px 20px',
    display: 'inline-block',
    width: '300px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all',

    ':hover': {
      transform: 'scale(1.1, 1.1)'
    }
  },
  wallContainerStyle: {
    width: '80%',
    margin: 'auto'
  }
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(20, 20, 20, 0.75)'
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '320px',
    height: 'auto',
    transform: 'translate(-50%, -60%)',
    border: '1px solid #ccc',
    background: '#fff',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  },
  closeButton: {
    position: 'absolute',
    width: '2rem',
    height: '2rem',
    top: '0.3rem',
    right: '0.5rem',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'transparent'
  },
  clearIcon: {
    verticalAlign: 'middle',
    fill: '#999',
    width: '1rem',
    height: '1rem',
    transition: 'all 80ms ease'
  },
  topbar: {
    textAlign: 'center',
    borderBottom: `1px solid ${ThemeConst.lightDark}`,
    padding: '0 0 10px',
    margin: '-8px 0 0'
  },
  image: {
    maxWidth: '100%',
    display: 'block',
    margin: '0 auto'
  },
  quota: {
    fontSize: ThemeConst.smallFontSize,
    textAlign: 'center'
  },
  nameInput: {
    width: '100%',
    borderRadius: '1px',
    border: `1px solid ${ThemeConst.deepDark}`,
    margin: '10px 0',
    padding: '4px 8px',
    fontSize: ThemeConst.middleFontSize
  },
  createButton: {
    width: '100%',
    border: 'none',
    fontSize: ThemeConst.middleFontSize
  }
};

const mainThemeRender = spawnThemeRender(styles);
mainThemeRender('wallStyle', 'lightSmallShadow');

const createModalThemeRender = spawnThemeRender(modalStyles);
createModalThemeRender('createButton', 'fullButton', 'mainColorBackground', 'lightText');

@Radium
class Tasks extends Component {
  constructor() {
    super();

    this.state = {
      modalOpen: false
    };
    this.backgroundValue = null;
  }

  getWalls() {
    let { dispatch } = this.props;
    return dispatch(getAllTaskWall());
  }

  componentWillMount() {
    this.getWalls();
  }

  renderCreateModal() {
    return (
      <Modal isOpen={this.state.modalOpen} styles={modalStyles}>
        <button key='modal-close' style={modalStyles.closeButton}>
          <CloseIcon style={modalStyles.clearIcon} onClick={() => {this.setState({modalOpen: false})}}/>
        </button>
        
        <div style={modalStyles.topbar}>Create Wall</div>
        <img style={modalStyles.image} src='/static/image/d.png'/>
        <p style={modalStyles.quota}>Establish their own projects for different transactions.</p>
        <input style={modalStyles.nameInput} type='text' ref='name' placeholder="Wall Name"/>
        <button style={modalStyles.createButton} onClick={() => this.handleClick()} >Complete And Create</button>
      </Modal>
    )
  }
  
  render() {
    let walls = this.props.walls.map(wjson => {
      return (
        <div style={styles.wallStyle} key={wjson.id} onClick={() => browserHistory.push(`/task-wall/${wjson.id}`)}>
          <h2>{wjson.name}</h2>
        </div>
      )
    })
    
    return (
      <div>
        <div>
          <div className="wall-container" style={styles.wallContainerStyle}>
            {walls}
            <div style={styles.wallStyle} onClick={() => this.setState({modalOpen: true})}>
              <h2>New Task Wall</h2>
            </div>
          </div>
        </div>

        {this.renderCreateModal()}
      </div>
    )
  }

  handleClick() {
    const {dispatch} = this.props;
    const name = this.refs.name;
    dispatch(createTaskWall({name: name.value.trim()})).then(() => {
      this.getWalls();
      this.setState({modalOpen: false});
    })
  }
}

const mapStateToProps = (state) => {
  return {
    walls: state.taskWall.walls || []
  }
}

export default connect(mapStateToProps)(Tasks)
