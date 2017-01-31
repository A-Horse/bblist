import {connect} from 'react-redux';
import {uploadFile} from 'actions/common/file';
import {deleteTaskBoard} from 'actions/task/task-wall';
import BoardContent from 'page/task/BoardContent';
import {browserHistory, hashHistory} from 'react-router';
import {deleteTaskWall, getTaskAllCards} from 'actions/task/task-wall';
import {createTaskList, deleteTaskList, updateTaskTrackIndex} from 'actions/task/task-list';
import {wrapDispathToAction} from 'utils/wrap-props';

const actions = {
  updateTaskTrackIndex
};

const mapStateToProps = (state) => {
  return {
    wall: state.task.board.wall,
    normalizedList: state.task.list
  };
};

const BoardContentPage = connect(
  mapStateToProps,
  wrapDispathToAction(actions)
)(BoardContent);

export default BoardContentPage;
