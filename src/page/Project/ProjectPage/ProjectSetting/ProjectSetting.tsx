import './ProjectSetting.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { ProjectRecord } from '../../../../typings/project.typing';
import { getProjectKanbansRequest } from '../../../../actions/project/kanban.action';
import { ImageUploader } from '../../../../components/ImageUploader/ImageUploader';
import { DEFAULT_BOARD_COVER_SRC } from '../../../../constants';
import { uploadProjectCoverRequest } from '../../../../actions/project/project.action';
import { generateProjectCoverUrl } from '../../util/project-cover.util';

interface Props {
  actions: ActionCreatorsMapObject;
  project: ProjectRecord;
}

class ProjectSettingComponent extends Component<Props & RouteComponentProps<{ projectId: string }>, {}> {
  componentDidMount() {}

  onCoverUpload = (coverBase64: string) => {
    this.props.actions.uploadProjectCoverRequest({
      projectId: this.props.project.get('id'),
      coverBase64
    });
  };

  render() {
    return (
      <div>
        <ImageUploader
          style={{
            width: '250px',
            height: '125px',
            borderRadius: '6px',
            display: 'block'
          }}
          source={
            this.props.project.get('setting').get('coverUrl')
              ? generateProjectCoverUrl(this.props.project.get('setting').get('coverUrl'))
              : DEFAULT_BOARD_COVER_SRC
          }
          upload={this.onCoverUpload}
        >
          Upload new Cover
        </ImageUploader>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        uploadProjectCoverRequest: uploadProjectCoverRequest
      },
      dispatch
    )
  };
};

const mapStateToProps = (state: any, props: any) => {
  const { projectId } = props.match.params;

  return {
    project: state.project.get('projectMap').get(projectId) as ProjectRecord
  };
};

export const ProjectSetting = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectSettingComponent)
);
