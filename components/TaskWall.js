import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Radium from 'radium';
import R from 'fw-ramda';

import {deleteTaskWall, getTaskAllCards} from '../actions/task-wall';
import {postTaskCard} from '../actions/task-card';
import {createTaskList, deleteTaskList} from '../actions/task-list';
import {DropMenu} from './widget/DropMenu';
import {ConfirmModal} from './widget/ConfirmModal';
import {getAssets} from '../services/assets-manager';
import {spawnThemeRender} from '../style/theme-render';
import {PageContainer} from './widget/PageContainer';
import {AddIcon, EditIcon, ArrowDownIcon, SettingIcon} from '../services/svg-icons';
import {TaskWallSetting} from './TaskWallSetting';
import {navHeight} from './Nav';
import {Hr} from './widget/Hr';

const styles = {
  container: {
    position: 'fixed',
    top: `${navHeight}px`,
    left: 0,
    right: 0,
    bottom: 0
  },
  pageContainer: {
    overflowX: 'scroll'
  },
  settingIcon: {
    fill: 'white',
    verticalAlign: 'middle'
  },
  settingContainer: {
    display: 'block',
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
    position: 'relative',
    textAlign: 'center',
    display: 'flex',
    height: '33px',
    padding: '0 2px 0 16px',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topBarTitle: {
    color: 'white'
  },
  dimensions: {
    
  },
  categoryContainer: {
    justifyContent: 'center',
    height: '100%',
    whiteSpace: 'nowrap'
  },
  category: {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    margin: '0 1rem',
    width: '250px',
    height: '100%',
    padding: '0 0.8rem'
  },
  categoryTopBar: {
    position: 'relative',
    height: '3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  categoryNameInput: {
    backgroundColor: 'transparent',
    borderBottom: '1px solid black',
    boxShadow: 'none',
  },
  categoryName: {
    textAlign: 'center'
  },
  categoryMenuIcon: {
    verticalAlign: 'middle',
    width: '20px',
    height: '20px'
  },
  categorySetting: {
    position: 'absolute',
    right: '0.8rem',
    backgroundColor: 'white',
    padding: '4px 0',
    top: '1.5rem',
    transform: 'translate(50%, 0)',
    width: '100px'
  },
  categoryEditIcon: {
    marginTop: '-0.2rem',
    width: '1.2rem',
    verticalAlign: 'middle'    
  },
  categorySettingItem: {
    padding: '0 10px',
    ':hover': {
      backgroundColor: '#eee'
    }
  },
  card: {
    margin: '0.6rem 0',
    padding: '4px 8px',
    borderRadius: '1px',
    height: '48px'
  }
};

const themeRender = spawnThemeRender(styles);
themeRender('category', 'grayBackground');
themeRender('card', 'lightBackground', 'lightSmallShadow');
themeRender('topBar', 'mainColorBackground');

@Radium
class TaskWall extends Component {
  constructor() {
    super();
    this.state = {
      createCardToggle: {},
      editingCategory: {},
      /* openSetting: false, */
      typingNewCategory: false,
      categorySetting: {},
      openCreateCardDom: {}
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

  classificationCards(cards, lists) {
    return R.merge(lists.reduce((result, list) => {
      result[list.id] = [];
      return result;
    }, {}), R.groupBy(_ => _.taskListId)(cards))
  }

  makeListNameMap(lists) {
    return R.zipObj(
      R.pluck('id', lists),
      R.pluck('name', lists),
    );
  }

  mapListName(id) {
    return this.listNameMap[id];
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

  renderCategory(listId, cards) {
    return (
      <div style={styles.category} key={listId}>
        <div style={styles.categoryTopBar}>
          {this.state.editingCategory[listId]
         ? (<div style={styles.listId}><input type='text' style={styles.categoryNameInput} ref={`${listId}ChangeName`} defaultValue={this.mapListName(listId)} onKeyDown={(e) => {if (e.which === 13) this.changeCategoryName(listId)}} onBlur={() => {this.toggleEditCategoryName(listId)}}/></div>)
         : (<div style={styles.listId}>{this.mapListName(listId)} <EditIcon style={styles.categoryEditIcon} onClick={() => {this.toggleEditCategoryName(listId)}}/></div>)}
          
          <ArrowDownIcon style={styles.categoryMenuIcon} onClick={() => {const obj = {}; obj[listId] = !this.state.categorySetting[listId]; this.setState({categorySetting: obj})}}/>
    
          <DropMenu toggle={this.state.categorySetting[listId]}>
          <ul style={styles.categorySetting}>
          <p style={{textAlign: 'center'}}>Setting</p>
          <Hr style={{magin: '0.3rem 0'}}/>
          <li style={styles.categorySettingItem} onClick={() => {this.refs[`delListConfirm${listId}`].open()}}>Delete</li>
          </ul>
          </DropMenu>
        </div>
        
        <ConfirmModal confirmFn={() => {this.deleteTaskList(listId)}} ref={`delListConfirm${listId}`}></ConfirmModal>
        
        {this.renderCards(cards)}
        
        {this.state.openCreateCardDom[listId] ? this.renderCreateCardDom(listId) : 
         <div onClick={() => {const obj = {}; obj[listId] = !this.state.openCreateCardDom[listId]; this.setState({openCreateCardDom: Object.assign({}, this.state.openCreateCardDom, obj)})}}>+ New Task</div>}
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
        <SettingIcon style={styles.settingIcon} onClick={() => {this.setState({openSetting: true})}}/>
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
        <h2 style={styles.topBarTitle}>{wallData.info.name}</h2>
        <div style={styles.dimensions}>
          {wallData.info.defaultDimensions}
        </div>
        {this.renderSetttingMenu()}
      </div>
    );
  }

  renderAddCategory() {
    return (
      <div style={styles.category} key='addCategory'>
        {
          this.state.typingNewCategory ? <input ref='newCategoryInput' onKeyDown={(e) => {if (e.which === 13) this.createNewCategory()}} onBlur={() => {}}/>
            : <AddIcon onClick={() => {this.setState({typingNewCategory: true})}} />
          }
      </div>
    );
  }

  /* renderSetting() {
   *   return (
   *     <TaskWallSetting {...this.props}/>
   *   );
   * }*/
  
  render() {
    const {wallData} = this.props;
    const cardGroups = this.classificationCards(wallData.cards, wallData.lists);
    this.listNameMap = this.makeListNameMap(wallData.lists);
    return (
      <div style={styles.container}>
        {this.renderTopBar()}
        <PageContainer style={styles.pageContainer}>
           <div style={styles.categoryContainer}>
              {this.renderCategorys(cardGroups)}
              {this.renderAddCategory()}
           </div>
        </PageContainer>
      </div>
    );
  }

  createNewCategory() {
    const {dispatch} = this.props;
    const name = this.refs.newCategoryInput;
    dispatch(createTaskList(this.props.params.id, {name: name.value.trim()}))
      .then()
  }
  
  

  deleteTaskList(listId) {
    const {dispatch} = this.props;
    const wallId = this.props.params.id;
    dispatch(deleteTaskList(wallId, listId)).then(() => {
      console.log('hi');
    })
  }

  handleClick(listId) {
    const {dispatch} = this.props,
          title = this.refs[`${listId}CreateTitle`];
    const data = {
      taskWallId: +this.props.params.id,
      taskListId: listId,
      title: title.value.trim()
    };
    dispatch(postTaskCard(data)).then(() => {
      this.getTasks(this.props.params.id);
    });
  },

  
}

const mapStateToProps = (state) => {
  return {
    wallData: state.taskWall.wallData || {info: {}, cards: [], lists: [], category: []},
    status: state.taskCard.status
  };
}

export default connect(mapStateToProps)(TaskWall);
