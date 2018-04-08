import { connect } from 'react-redux';
import { uploadFile } from 'actions/common/file';
import { deleteTaskBoard } from 'actions/task/task-wall';
import Ideas from 'page/idea/Ideas';
import { browserHistory, hashHistory } from 'react-router';
import R from 'ramda';
import { wrapDispathToAction } from 'utils/wrap-props';
import { createTaskBoard, getAllTaskBoard } from 'actions/task/task-wall';
import { createSelector } from 'reselect';

const actions = {};

const mapStateToProps = (state, props) => {
  return {};
};

const IdeasContainer = connect(mapStateToProps, wrapDispathToAction(actions))(Ideas);

export default IdeasContainer;
