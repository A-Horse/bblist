import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {createTaskWall, getAllTaskWall} from '../actions/task-wall';

import {Modal} from './util/Modal';

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

class Tasks extends Component {
  constructor() {
    super()

    this.state ={
      modalOpen: false
    }
  }

  getWalls() {
    let { dispatch } = this.props
    
    return dispatch(getAllTaskWall())
  }

  componentWillMount() {
    let self = this;
    
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
            <div style={wallStyle}>
              <h2>New Task Wall</h2>
            </div>
          </div>
          
        </div>
        
        <div>
          <p>{String(this.state.modalOpen)}</p>
          <input type='text' ref='name'/>
          <button onClick={(event) => this.handleClick()} >Post</button>
          <Modal isOpen={this.state.modalOpen}>
            <p>This is Modal!</p>
          </Modal>
        </div>
      </div>
    )
  }

  handleClick(event) {
    this.setState({modalOpen: true})
    return
    let { dispatch } = this.props;
    
    const name = this.refs.name;
    
    dispatch(createTaskWall({name: name.value.trim()})).then(this.getWalls.bind(this))
  }
}

const mapStateToProps = (state) => {
  return {
    walls: state.taskWall.walls || []
  }
}

export default connect(mapStateToProps)(Tasks)
