import './ProjectSetting.scss';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import {
  updateProjectRequest,
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
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const match = useRouteMatch<{ projectId: string }>();
  const projectId = match.params.projectId;
  const project = useSelector(
    (state: RootState) => state.project.projectMap[projectId]
  );
  const [projectName, setProjectName] = useState<string>(project.name);

  useEffect(() => {
    const action = getProjectKanbansRequest({
      projectId: match.params.projectId,
    });
    dispatch(action);
  }, [dispatch, match.params.projectId]);

  const onCoverUpload = (coverBase64: string) => {
    const action = uploadProjectCoverRequest(
      {
        projectId: project!.id,
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

  return (
    <div className="ProjectSetting">
      <h1>项目设置</h1>
      <SectionField name="项目封面" transform={true}>
        <ImageUploader
          style={{
            width: '256px',
            height: '144px',
            borderRadius: '6px',
            display: 'block',
          }}
          modalTitle="裁剪项目封面"
          source={objectFileUrl(project.coverUri)}
          upload={onCoverUpload}
        >
          上传封面
        </ImageUploader>
      </SectionField>

      <SectionField name="项目名称" transform={true}>
        <Input
          className="ProjectSetting--project-name-input"
          value={projectName}
          onChange={setProjectName}
          onBlur={(name) =>
            dispatch(
              updateProjectRequest({
                id: projectId,
                name: projectName,
              })
            )
          }
        />
      </SectionField>

      <KanbanSettingPanel />
    </div>
  );
}
