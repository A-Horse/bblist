import './ProjectSetting.scss';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import {
  updateProjectsRequest,
  uploadProjectCoverRequest,
} from '../../../../redux/actions/project.action';
import { ImageUploader } from '../../../../components/ImageUploader/ImageUploader';
import { Input } from '../../../../widget/Input/Input';
import { KanbanSettingPanel } from './KanbanSettingPanel/KanbanSettingPanel';
import { getProjectKanbansRequest } from '../../../../redux/actions/kanban.action';
import { useToasts } from 'react-toast-notifications';
import { AxiosError } from 'axios';
import { SectionField } from '../../../../widget/SectionField/SectionField';
import { RootState } from '../../../../redux/reducer/index';
import { objectFileUrl } from '../../../../utils/object-storage';

export function ProjectSetting() {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const match = useRouteMatch<{ projectId: string }>();
  const projectID = match.params.projectId;
  const project = useSelector((state: RootState) =>
    state.project.projectMap.get(projectID)
  );

  useEffect(() => {
    const action = getProjectKanbansRequest({
      projectId: match.params.projectId,
    });
    dispatch(action);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCoverUpload = (coverBase64: string) => {
    const action = uploadProjectCoverRequest(
      {
        projectId: project!.get('id'),
        coverBase64,
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
          addToast(`上传失败${errorDetail}`, {
            appearance: 'error',
            autoDismiss: true,
          });
        },
      }
    );
    dispatch(action);
  };

  if (!project) {
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
            display: 'block',
          }}
          modalTitle="裁剪项目封面"
          source={objectFileUrl(project.get('coverUri'))}
          upload={onCoverUpload}
        >
          上传封面
        </ImageUploader>
      </SectionField>

      <SectionField name="项目名称" transform={true}>
        <Input
          className="ProjectSetting--project-name-input"
          defaultValue={project.get('name')}
          onBlur={(name) =>
            dispatch(
              updateProjectsRequest({
                projectID,
                name,
              })
            )
          }
        />
      </SectionField>

      <KanbanSettingPanel />
    </div>
  );
}
