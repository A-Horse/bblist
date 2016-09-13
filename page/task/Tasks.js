import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Radium from 'radium';
import {createTaskWall, getAllTaskWall} from '../../actions/task/task-wall';
import {Modal} from '../../components/widget/Modal';
import {Select} from '../../components/widget/Select';
import {PageContainer} from '../../components/widget/PageContainer';
import {CateLine} from '../../components/widget/CateLine';
import {spawnMixinRender} from '../../style/theme-render';
import {ThemeConst} from '../../style/theme';
import {CloseIcon, AddIcon} from '../../services/svg-icons';

const styles = {
  wall: {
    flex: '1 0 auto',
    borderRadius: '3px',
    margin: '8px 20px',
    width: '200px',
    height: '78px',
    maxWidth: '200px',
    cursor: 'pointer',
    transition: 'box-shadow 218ms ease-in-out,transform 218ms ease-in-out,-webkit-transform 218ms ease-in-out',
    boxShadow: '0 2px 3px 0 rgba(0,0,0,.0470588)',
    // backgroundImage: 'url(/static/image/cover-internet.jpg)',
    ':hover': {
      transform: 'translate3d(0,-5px,0)',
      boxShadow: '0 7px 21px rgba(0,0,0,.15)'
    }
  },
  cardInfo: {
    backgroundImage: 'linear-gradient(180deg,rgba(0,0,0,.3) 0, transparent)',
    height: '50%'
  },
  cardTitle: {
    
  },
  createCardTitle: {
    
  },
  projectCard: {
    
  },
  createCard: {
    textAlign: 'center'
  },
  wallContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '1rem'
  },
  addIcon: {
    height: '1.5rem',
    width: '1.5rem',
    borderRadius: '50%',
    fill: 'white'
  }
};

const mainThemeRender = spawnMixinRender(styles);
mainThemeRender('wall', 'lightBackground');
mainThemeRender('addIcon', 'deepDarkBackground');
mainThemeRender('cardTitle', 'middleFontSize', 'lightText');
mainThemeRender('createCardTitle', 'middleFontSize');

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

const createModalThemeRender = spawnMixinRender(modalStyles);
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

  renderWalls() {
    return this.props.walls.map(wjson => {
      return (
        <div style={Object.assign({}, styles.wall, styles.projectCard)} key={wjson.id} onClick={() => browserHistory.push(`/task-wall/${wjson.id}`)}>
          <div style={styles.cardInfo}>
            <h2 style={styles.cardTitle}>{wjson.name}</h2>
          </div>
        </div>
      )
    })
  }
  
  render() {
    return (
      <PageContainer>
        <CateLine>current walls:</CateLine>
        <div style={styles.wallContainer}>
          
          {this.renderWalls()}
          
          <div style={Object.assign({}, styles.wall, styles.createCard)} onClick={() => this.setState({modalOpen: true})}>
            <AddIcon style={styles.addIcon}/>
            <h2 style={styles.createCardTitle}>New Task Wall</h2>
          </div>
        </div>

        {this.renderCreateModal()}
      </PageContainer>
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
