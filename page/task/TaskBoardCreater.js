import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createTaskWall, getAllTaskWall} from 'actions/task/task-wall';
import {CloseIcon, AddIcon} from 'services/svg-icons';
import {Modal} from 'components/widget/Modal';
import 'style/page/task/taskboard-creater.scss';


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


class TaskBoardCreater extends Component {
  
  constructor() {
    super();
    this.state = {modalOpen: false};
  }

  createBoard() {
    const {dispatch} = this.props;
    const name = this.refs.name;
    dispatch(createTaskWall({name: name.value.trim()})).then(() => {
      dispatch(getAllTaskWall());
      this.setState({modalOpen: false});
    });
  }

  componentWillMount() {
    
  }

  componentDidUpdate(props) {
  
  }
  
  
  renderModal() {
    return (
      <Modal className='taskboard-creater' toggle={this.state.modalOpen}>
        <div className='taskboard-creater'>
          <button key='modal-close' className='close-button'>
            <CloseIcon className='clear-icon' onClick={() => this.setState({modalOpen: false})}/>
          </button>
          
          <div className='taskboard-creater--topbar'>Create Wall</div>
          
          <p className='taskboard-creater--quota'>Establish their own projects for different transactions.</p>
          <input className='taskboard-creater--name-input' type='text' ref='name' placeholder='board Name'/>
          <button className='taskboard-creater--create-button' onClick={() => this.createBoard()} >Complete And Create</button>
        </div>
      </Modal>
    );
  }

  render() {
    return (
      <div style={Object.assign({}, styles.wall, styles.createCard)} onClick={() => this.setState({modalOpen: true})}>
        <AddIcon style={styles.addIcon}/>
        <h2 style={styles.createCardTitle}>New Task Wall</h2>
        {this.renderModal()}
      </div>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(TaskBoardCreater);
