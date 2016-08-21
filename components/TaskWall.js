import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {deleteTaskWall, getTaskAllCards} from '../actions/task-wall';
import {postTaskCard} from '../actions/task-card';
import {DropMenu} from './widget/DropMenu';
import {ConfirmModal} from './widget/ConfirmModal';
import {getAssets} from '../services/assets-manager';
import {spawnThemeRender} from '../style/theme-render';
import {PageContainer} from './widget/PageContainer';
import {EditIcon} from '../services/svg-icons';
import R from 'fw-ramda';

const styles = {
  container: {
    position: 'relative'
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
  topBar: {
    textAlign: 'center'
  },
  dimensions: {
    
  },
  categoryContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  category: {
    flex: '1',
    margin: '0 1rem',
    maxWidth: '250px'
  },
  categoryName: {
    textAlign: 'center'
  },
  card: {
    margin: '0.3rem 0.8rem',
    padding: '4px 8px',
    borderRadius: '1px',
    height: '48px'
  }
};

const themeRender = spawnThemeRender(styles);
themeRender('category', 'grayBackground');
themeRender('card', 'lightBackground', 'lightSmallShadow');
themeRender('topBar', 'mainColorBackground');

class TaskWall extends Component {
  constructor() {
    super();
    this.state = {
      settingToggle: false,
      createCardToggle: {},
      editingCategory: {}
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

  classificationCards(cards) {
    return R.compose(
      R.when(R.isEmpty, R.assoc('default', [])),
      R.groupBy(_ => _.category)
    )(cards);
  }

  toggleEditCategoryName(categoryName) {
    const nobj = {};
    nobj[categoryName] = !this.state.editingCategory[categoryName];
    this.setState({
      editingCategory: Object.assign(this.state.editingCategory, nobj)
    })
  }

  changeCategoryName(categoryName) {
    const id = R.find((R.propEq('name', categoryName)))(this.props.wallData.category).id;
  }
  
  renderCreateCardDom(categoryName) {
    return (
      <div>
        <div>
          <span>title</span>
          <input type='text' ref={`${categoryName}CreateTitle`}/>
        </div>
        <button onClick={() => this.handleClick(categoryName)} >Post</button>
      </div>
    );
  }

  renderCards(cards) {
    return cards.map(cjson => {
      return (
        <div key={cjson.id} style={styles.card}>
          <p>{cjson.title}</p>
        </div>
      );
    });
  }

  renderCategory(categoryName, cards) {
    return (
      <div style={styles.category} key={categoryName}>
        {this.state.editingCategory[categoryName]
          ? (<div style={styles.categoryName}><input type='text' ref={`${categoryName}ChangeName`} defaultValue={categoryName} onKeyDown={(e) => {if (e.which === 13) this.changeCategoryName(categoryName)}} onBlur={() => {this.toggleEditCategoryName(categoryName)}}/></div>)
         : (<div style={styles.categoryName}>{categoryName} <EditIcon onClick={() => {this.toggleEditCategoryName(categoryName)}}/></div>)}
      
        {this.renderCards(cards)}  
        {this.renderCreateCardDom(categoryName)}
      </div>
    );
  }

  renderCategorys(cardGroups) {
    return Object.keys(cardGroups)
      .map(categoryName => this.renderCategory(categoryName, cardGroups[categoryName]));
  }

  renderSetttingMenu() {
    return (
      <div style={styles.settingContainer} onClick={() => {}}>
        <img src={getAssets('svg', 'black')} onClick={() => {this.setState({settingToggle: !this.state.settingToggle})}}/>
          <DropMenu toggle={this.state.settingToggle}>
            <ul style={styles.settingDropMenu}>
              <li onClick={() => {this.refs.delConfirm.open()}}>Delete This Wall</li>
              <li>2</li>
            </ul>
          </DropMenu>
          <ConfirmModal confirmFn={() => {this.deleteWall()}} ref='delConfirm'></ConfirmModal>
      </div>
    );
  }

  renderTopBar() {
    const {wallData} = this.props;
    return (
      <div style={styles.topBar}>
        {this.renderSetttingMenu()}
        <h2>Task</h2>
        <div style={styles.dimensions}>
          {wallData.info.defaultDimensions}
        </div>
      </div>
    );
  }
  
  render() {
    const {wallData} = this.props;
    const cardGroups = this.classificationCards(wallData.cards);
    return (
      <div style={styles.container}>
        {this.renderTopBar()}
        <PageContainer>
          <div style={styles.categoryContainer}>
            {this.renderCategorys(cardGroups)}
          </div>
        </PageContainer>
      </div>    
    );
  }
  
  deleteWall() {
    const {dispatch} = this.props;
    const params = {id: this.props.params.id};
    
    dispatch(deleteTaskWall(params))
      .then(() => {
        browserHistory.push('/task-wall')
      }).catch(error => {
        console.log('error', error);
      });
  }

  handleClick(categoryName) {
    const {dispatch} = this.props,
          title = this.refs[`${categoryName}CreateTitle`];
    const data = {
      taskWallId: this.props.params.id,
      category: categoryName,
      title: title.value.trim()
    };
    dispatch(postTaskCard(data)).then(() => {
      this.getTasks(this.props.params.id);
    });
  }
}

const mapStateToProps = (state) => {
  return {
    wallData: state.taskWall.wallData || {info: {}, cards: []},
    status: state.taskCard.status
  };
}

export default connect(mapStateToProps)(TaskWall);
