import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Radium from 'radium';
import R from 'fw-ramda';


import {spawnMixinRender} from '../../style/theme-render';
import {AddIcon, EditIcon, ArrowDownIcon, SettingIcon} from '../../services/svg-icons';
import {TaskWallSetting} from './TaskWallSetting';
import {navHeight} from '../../components/Nav';
import UserAvatar from '../../components/UserAvatar';

const styles = {

};
const themeRender = spawnMixinRender(styles);
themeRender('card', 'lightBackground', 'lightSmallShadow');

@Radium
class TaskModal extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      
    };
  }

  render() {
    const card = this.props;
    return (
      <div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  };
}

export default connect(mapStateToProps)(TaskModal);
