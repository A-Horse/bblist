import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import {createTaskWall, getAllTaskWall} from '../actions/task-wall'

let wallStyle = {
  boxShadow: '0 0 10px #999',
  borderRadius: '10px',
  padding: '8px 16px'
};

class Tasks extends Component {
  constructor() {
    super()
    console.log('task card page init')
    
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
        <div key={wjson.id} onClick={() => browserHistory.push(`/task-wall/${wjson.id}`)}>
          <h2>{wjson.name}</h2>
        </div>
      )
    })
    
    return (
      <div>
        <div>
          <h2>Wall</h2>

          <div className="wall-container">
            {walls}
          </div>
          
        </div>
        
        <div>
          <input type='text' ref='name'/>
          <button onClick={(event) => this.handleClick(event)} >Post</button>
        </div>
      </div>
    )
  }

  handleClick(event) {
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
