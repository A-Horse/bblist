import './ProjectSetting.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  ActionCreatorsMapObject,
  AnyAction,
  bindActionCreators,
  Dispatch
} from 'redux';

import { uploadProjectCoverRequest } from '../../../../actions/project/project.action';
import { ImageUploader } from '../../../../components/ImageUploader/ImageUploader';
import { FormField } from '../../../../widget/FormField/FormField';
import Input from '../../../../widget/Input/Input';
import { ProjectRecord } from '../../../../typings/project.typing';
import { generateProjectCoverUrl } from '../../util/project-cover.util';
import { KanbanSettingPanel } from './KanbanSettingPanel/KanbanSettingPanel';
import { getProjectKanbansRequest } from '../../../../actions/project/kanban.action';
import { withToastManager } from 'react-toast-notifications';
import { AxiosError } from 'axios';

interface Props {
  actions: ActionCreatorsMapObject;
  project: ProjectRecord;
}

class ProjectSettingComponent extends Component<
  Props &
    RouteComponentProps<{ projectId: string }> & {
      toastManager: any;
    },
  {}
> {
  componentDidMount() {
    this.props.actions.getProjectKanbansRequest({
      projectId: this.props.match.params.projectId
    });
  }

  onCoverUpload = (coverBase64: string) => {
    this.props.actions.uploadProjectCoverRequest(
      {
        projectId: this.props.project.get('id'),
        coverBase64
      },
      {
        callback: (error: AxiosError) => {
          console.log('error', error);
          if (!error) {
            return;
          }
          this.props.toastManager.add('上传失败', {
            appearance: 'error',
            autoDismiss: true
          });
        }
      }
    );
  };

  render() {
    return (
      <div className="ProjectSetting">
        <FormField name="项目封面">
          <ImageUploader
            style={{
              width: '256px',
              height: '144px',
              borderRadius: '6px',
              display: 'block'
            }}
            modalTitle="裁剪项目封面"
            source={generateProjectCoverUrl(
              this.props.project.get('setting').get('coverFileName')
            )}
            upload={this.onCoverUpload}
          >
            上传封面
          </ImageUploader>
        </FormField>

        <FormField name="项目名称">
          <Input
            className="ProjectSetting--project-name-input"
            defaultValue={this.props.project.get('name')}
          />
        </FormField>

        <KanbanSettingPanel />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        uploadProjectCoverRequest: uploadProjectCoverRequest,
        getProjectKanbansRequest: getProjectKanbansRequest
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
  )(withToastManager(ProjectSettingComponent))
);
