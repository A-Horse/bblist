import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
//TODO fixme
import {postTaskCard, getTaskCards } from '../actions/task-card'

import {DropMenu} from './widget/DropMenu';
import {ConfirmModal} from './widget/ConfirmModal';

const styles = {
  main: {
    position: 'relative',
    margin: 'auto',
    width: '700px'
  },
  settingContainer: {
    display: 'block',
    position: 'absolute',
    right: '0',
    top: '0'
  },
  settingDropMenu: {
    display: 'block',
    position: 'absolute',
    top: '30px',
    left: '0',
    padding: '0',
    listStyle: 'none'
  }
};

class TaskWall extends Component {
  constructor() {
    super();

    this.state = {
      settingToggle: false
    }
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
    let {dispatch} = this.props;    
    return dispatch(getTaskCards(id));
  }
  
  render() {
    let cards = this.props.cards.map(cjson => {
      return (
        <div key={cjson.id}>
          <h2>{cjson.title}</h2>
          <p>{cjson.content}</p>
        </div>
      )
    });
    
    return (
      <div style={styles.main}>
        <div style={styles.settingContainer} onClick={() => {}}>
          <img src="/static/svg/ic_settings_black_24px.svg" onClick={() => {this.setState({settingToggle: !this.state.settingToggle})}}/>
          <DropMenu toggle={this.state.settingToggle}>
            <ul style={styles.settingDropMenu}>
              <li onClick={() => {this.refs.delConfirm.open()}}>Delete This Wall</li>
              <li>2</li>
            </ul>
          </DropMenu>
        <ConfirmModal confirmFn={() => {this.deleteWall()}} ref='delConfirm'></ConfirmModal>
        </div>
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

  deleteWall() {
    
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
      self.getTasks(self.props.params.id);
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
