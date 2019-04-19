import { connect } from 'react-redux';
import { BoardWall } from './BoardWall';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Actions, { makeActionRequestCollection } from '../../../actions/actions';

const mapStateToProps = (state: any) => {
  return {
    boardMap: state.task2.get('boardMap'),
    boardSettingMap: state.task2.get('boardSettingMap')
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(
      makeActionRequestCollection(),
      dispatch
    )
  };
};

const BoardsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BoardWall) as any
);

export default BoardsContainer;
