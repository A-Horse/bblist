import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {deleteTaskWall, getTaskAllCards} from '../actions/task-wall';
import {postTaskCard} from '../actions/task-card';
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
  },
  dimensions: {
    
  }
};

class TaskWall extends Component {
  constructor() {
    super();
    this.state = {
      settingToggle: false
    };
  }
  
  componentWillMount() {
    const {id} = this.props.params;
    this.getTasks(id).then(() => {
    }).catch(error => {
      // TODO 404
    });
  }
  
  getTasks(id) {
    const {dispatch} = this.props;    
    return dispatch(getTaskAllCards(id));
  }

  renderCreateCardDom() {
    return (
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
    );
  }
  
  render() {
    const {wallData} = this.props;
    const cardDoms = wallData.cards.map(cjson => {
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

          <div style={styles.dimensions}>
            {wallData.info.defaultDimensions}
          </div>
          
          {cardDoms}

          {this.renderCreateCardDom()}
        </div>
        
        
      </div>
    )
  }

  deleteWall() {
    const {dispatch} = this.props,
          params = {id: this.props.params.id};
    
    dispatch(deleteTaskWall(params))
      .then(() => {
        browserHistory.push('/task-wall')
      }).catch(error => {
        console.log('error', error);
      });
  }

  handleClick() {
    const {dispatch} = this.props,
          title = this.refs.title,
          content = this.refs.content;
    const data = {
      taskWallId: this.props.params.id,
      title: title.value.trim(),
      content: content.value.trim()
    };
    dispatch(postTaskCard(data)).then(() => {
      self.getTasks(this.props.params.id);
      title.value = content.value = '';
    });
  }
}

const mapStateToProps = (state) => {
  return {
    wallData: state.taskCard.wallData || {info: {}, cards: []},
    status: state.taskCard.status
  };
}

export default connect(mapStateToProps)(TaskWall);
