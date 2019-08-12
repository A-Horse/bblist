import { connect } from 'react-redux';
import { ProjectWall } from './ProjectWall';
import { bindActionCreators, AnyAction, Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import { getProjectsRequest } from '../../../actions/project/project.action';

const mapStateToProps = (state: any) => {
  return {
    projects: state.project
      .get('projectMap')
      .valueSeq()
      .toArray(),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        getProjectsRequest
      },
      dispatch
    )
  };
};

const ProjectWallContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectWall) as any);

export default ProjectWallContainer;
