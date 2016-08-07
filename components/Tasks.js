import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {createTaskWall, getAllTaskWall} from '../actions/task-wall';

import {Modal} from './widget/Modal';
import {Select} from './widget/Select';

let wallStyle = {
  boxShadow: '0 0 10px #999',
  borderRadius: '3px',
  padding: '8px 16px',
  margin: '8px 20px',
  display: 'inline-block',
  width: '300px',
  textAlign: 'center',
  cursor: 'pointer'
};

let wallContainerStyle = {
  width: '80%',
  margin: 'auto'
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
    top: '140px',
    left: '140px',
    right: '140px',
    bottom: '140px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
};

class Tasks extends Component {
  constructor() {
    super();

    this.state = {
      modalOpen: false
    };

    this.backgroundItems = [
      {name: 'blue', value: 'blue'},
      {name: 'red', value: 'red'},
      {name: 'black', value: 'black'}
    ];
    this.backgroundValue = null;
  }

  getWalls() {
    let { dispatch } = this.props;
    
    return dispatch(getAllTaskWall());
  }

  componentWillMount() {
    this.getWalls();
  }
  
  render() {
    let walls = this.props.walls.map(wjson => {
      return (
        <div style={wallStyle} key={wjson.id} onClick={() => browserHistory.push(`/task-wall/${wjson.id}`)}>
          <h2>{wjson.name}</h2>
        </div>
      )
    })
    
    return (
      <div>
        <div>
          <div className="wall-container" style={wallContainerStyle}>
            {walls}
            <div style={wallStyle} onClick={() => this.setState({modalOpen: true})}>
              <h2>New Task Wall</h2>
            </div>
          </div>
          
        </div>
        
        <div>
          <Modal isOpen={this.state.modalOpen} styles={modalStyles}>
            <p>This is Modal!</p>
            <div>
              <span>Task Wall name:</span>
              <input type='text' ref='name'/>
              <p></p>
            </div>

            <div>
              <span>Description:</span>
              <input type='text' ref='description' />
              <p></p>
            </div>

            <div>
              <span>Peoples:</span>
              <button>+</button>
              <div></div>
            </div>
            
            <Select items={this.backgroundItems} ref='backgroundSelect'></Select>
            <button onClick={() => this.handleClick()} >Post</button>
            <button onClick={() => this.setState({modalOpen: false})}>Close</button>
          </Modal>
        </div>
      </div>
    )
  }

  handleClick(event) {
    let {dispatch} = this.props;
    
    const name = this.refs.name;

    return
    dispatch(createTaskWall({name: name.value.trim()})).then(this.getWalls.bind(this))
  }
}

const mapStateToProps = (state) => {
  return {
    walls: state.taskWall.walls || []
  }
}

export default connect(mapStateToProps)(Tasks)
