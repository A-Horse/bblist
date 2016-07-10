import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'

import {createTaskWall, getAllTaskWall} from '../actions/task-wall'

class TaskWall extends Component {
  constructor() {
    super()
    console.log('task card page init')
  }

  getWalls() {
    let { dispatch } = this.props
    
    dispatch(getAllTaskWall())
  }
  
  render() {    
    const tasks = this.getWalls();
    
    return (
      <div>
        <div>
          
          <h2>Wall</h2>
          
        </div>
        <div>
          <input type='text' ref='name'/>
          <button onClick={(event) => this.handleClick(event)} >Post</button>
        </div>
      </div>
    )
  }

  handleClick(event) {
    let { dispatch } = this.props
    
    const name = this.refs.name
    
    dispatch(createTaskWall({name: name.value.trim()}))
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(TaskWall)
