import {connect} from 'react-redux';
import {signin} from 'actions/login';
import SignIn from 'page/SignIn';

const mapDispatchToProps = (dispatch) => {
  return {
    uploadFile(authData) {
      return dispatch(signin(authData));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    wall: state.task.board.wall,
    lists: state.task.list.lists
  };
};

const BoardSettingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

export default BoardSettingPage;
