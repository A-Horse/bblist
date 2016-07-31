import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
//TODO fixme
import {postTaskCard, getTaskCards } from '../actions/task-card'

class TaskWall extends Component {
  constructor() {
    super()
    
  }
  
  componentWillMount() {
    var {id} = this.props.params;

    let self = this;
    
    this.getTasks(id).then(function(){
      if( self.props.status === 404 ){
        browserHistory.push('/404');
      }
    });
  }
  
  getTasks(id) {
    let {dispatch} = this.props
    
    return dispatch(getTaskCards(id))
  }
  
  render() {
    
    let cards = this.props.cards.map(cjson => {
      return (
        <div key={cjson.id}>
          <h2>{cjson.title}</h2>
          <p>{cjson.content}</p>
        </div>
      )
    })
    
    
    return (
      <div>
        <div>
          <h2>Task</h2>
          {cards}
        </div>
        
        <div>
          <div>
            <span>title</span>
            <input type='text' ref='title'/>
          </div>

          <div>
            <span>Content</span>
            <input type='text' ref='content'/>
          </div>

          
          
          <button onClick={(event) => this.handleClick(event)} >Post</button>
        </div>
      </div>
    )
  }

  handleClick(event) {
    let {dispatch} = this.props,
        self = this;

    const title = this.refs.title,
          content = this.refs.content;

    const data = {
      taskWallId: this.props.params.id,
      title: title.value.trim(),
      content: content.value.trim()
    }

    dispatch(postTaskCard(data)).then(function(){
      self.getTasks(self.props.params.id)
      title.value = content.value = '';
    });
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.taskCard.cards || [],
    status: state.taskCard.status
  }
}

export default connect(mapStateToProps)(TaskWall)
