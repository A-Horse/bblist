import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';

import {createTaskCard} from '../../actions/task/task-card';
import {getTaskAllCards} from '../../actions/task/task-wall';
import {spawnMixinRender} from '../../style/theme-render';
import {addBodyEventListenerOnce} from '../../actions/event/body';

const styles = {
  container: {
    padding: '10px'
  }
};

const mixinRender = spawnMixinRender(styles);
mixinRender('container', 'lightBackground', 'lightSmallShadow');

@Radium
class TaskCardCreater extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      toggle: false
    };
  }

  createCard() {
    const {dispatch} = this.props;
    const data = {
      taskWallId: +this.props.wallId,
      taskListId: +this.props.listId,
      title: this.refs.taskCardTitle.value.trim()
    };
    return dispatch(createTaskCard(data)).then(() => {
      return dispatch(getTaskAllCards(this.props.wallId));
    });
  }

  toggle(event) {
    const {dispatch} = this.props;
    this.setState({toggle: true});
    dispatch(addBodyEventListenerOnce(() => {
      this.setState({toggle: false});
    }));
    event.stopPropagation();
  }

  render() {
    if (this.state.toggle) return this.renderBody();
    return this.renderToggle();
  }

  renderToggle() {
    return (
      <div onClick={this.toggle.bind(this)}>
        + New Task
      </div>
    );
  }
  
  renderBody() {
    return (
      <div style={styles.container} className='taskcard-creater-body'
           onClick={event => event.stopPropagation()}>
        <div>
          <span>title</span>
          <input type='text' ref='taskCardTitle' />
        </div>
        <button onClick={this.createCard.bind(this)} >Post</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  };
}

export default connect(mapStateToProps)(TaskCardCreater);
