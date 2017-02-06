import {connect} from 'react-redux';
import {uploadFile} from 'actions/common/file';
import {deleteTaskBoard} from 'actions/task/task-wall';
import Infomation from 'page/task/Setting/Infomation';
import {browserHistory, hashHistory} from 'react-router';
import {createSelector} from 'reselect';


const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

const mapStateToProps = (state) => {
  return {
    normalizedBoard: state.task.board
  };
};

const PreferenceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Infomation);

export default PreferenceContainer;
