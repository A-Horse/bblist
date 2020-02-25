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
import { Input } from '../../../../widget/Input/Input';
import { ProjectRecord } from '../../../../typings/project.typing';
import { generateProjectCoverUrl } from '../../util/project-cover.util';
import { KanbanSettingPanel } from './KanbanSettingPanel/KanbanSettingPanel';
import { getProjectKanbansRequest } from '../../../../actions/project/kanban.action';
import { withToastManager } from 'react-toast-notifications';
import { AxiosError } from 'axios';
import { SectionField } from '../../../../widget/SectionField/SectionField';

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
          if (!error) {
            return;
          }
          let errorDetail = '';
          if (error.response!.status === 413) {
            errorDetail = '，不能超过2M';
          }
          this.props.toastManager.add(`上传失败${errorDetail}`, {
            appearance: 'error',
            autoDismiss: true
          });
        }
      }
    );
  };

  render() {
    if (!this.props.project) {
      return <div>loading</div>;
    }
    return (
      <div className="ProjectSetting">
        <SectionField name="项目封面" transform={true}>
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
        </SectionField>

        <SectionField name="项目名称" transform={true}>
          <Input
            className="ProjectSetting--project-name-input"
            defaultValue={this.props.project.get('name')}
          />
        </SectionField>

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
