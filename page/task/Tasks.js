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
        <div style={Object.assign({}, styles.wall, styles.projectCard)} key={wjson.id} onClick={() => browserHistory.push(`/task-wall/${wjson.id}`)}>
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
