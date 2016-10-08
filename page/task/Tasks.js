import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Radium from 'radium';
import {createTaskWall, getAllTaskWall} from 'actions/task/task-wall';
import {Modal} from 'components/widget/Modal';
import {Select} from 'components/widget/Select';
import {PageContainer} from 'components/widget/PageContainer';
import {CateLine} from 'components/widget/CateLine';
import {spawnMixinRender} from 'style/theme-render';
import {ThemeConst} from 'style/theme';
import {CloseIcon, AddIcon} from 'services/svg-icons';
import TaskBoardCreater from './TaskBoardCreater';

import 'style/page/task/board.scss';
import 'style/page/task/taskboard-creater-modal.scss';
import 'style/page/task/taskboard-card.scss';

const styles = {
  wall: {
    
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
    const {dispatch} = this.props;
    return dispatch(getAllTaskWall());
  }

  componentWillMount() {
    this.getWalls();
  }

  renderCreateModal() {
    return <TaskBoardCreater toggle={this.state.modalOpen}/>;
  }

  renderWalls() {
    return this.props.walls.map(wjson => {
      return (
        <div className='taskboard-card' style={{backgroundImage: `url(${wjson.cover})`}} key={wjson.id} onClick={() => browserHistory.push(`/task-wall/${wjson.id}`)}>
          <div style={styles.cardInfo}>
            <h2 style={styles.cardTitle}>{wjson.name}</h2>
          </div>
        </div>
      );
    });
  }
  
  render() {
    return (
      <PageContainer>
        <CateLine>current walls:</CateLine>
        <div style={styles.wallContainer}>
          
          {this.renderWalls()}
          
          {this.renderCreateModal()}
        </div>

        
      </PageContainer>
    );
  }

  handleClick() {
    
  }
}

const mapStateToProps = (state) => {
  return {
    walls: state.task.board.walls || []
  };
};

export default connect(mapStateToProps)(Tasks);
