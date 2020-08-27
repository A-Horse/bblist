import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducer';
import { selectProjectAllUsers } from '../../../../redux/reducer/selector/user.selector';
import { useRouteMatch } from 'react-router-dom';
import { UserAvatar } from '../../../../components/UserAvatar/UserAvatar';
import { queryProjectUserRequest } from '../../../../redux/actions/project.action';

export function ProjectTeam() {
  const match = useRouteMatch<{ projectId: string }>();
  const projectId = match.params.projectId;
  const dispatch = useDispatch();
  const participants = useSelector((state: RootState) =>
    selectProjectAllUsers(state, projectId)
  );
  useEffect(() => {
    dispatch(queryProjectUserRequest(projectId));
  }, [dispatch, projectId]);

  return (
    <div>
      {participants.map((p) => (
        <div key={p.id}>
          <UserAvatar user={p} />
          {p.username}
        </div>
      ))}
    </div>
  );
}
