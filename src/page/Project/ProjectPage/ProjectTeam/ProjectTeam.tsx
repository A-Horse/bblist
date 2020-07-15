import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducer';
import { findProjectAllUsers } from '../../../../redux/reducer/selector/user.selector';
import { useRouteMatch } from 'react-router-dom';
import { UserAvatar } from '../../../../components/UserAvatar/UserAvatar';
import { queryProjectUserRequest } from '../../../../redux/actions/project.action';

export function ProjectTeam() {
  const match = useRouteMatch<{ projectId: string }>();
  const projectId = match.params.projectId;
  const dispatch = useDispatch();
  const participants = useSelector((state: RootState) =>
    findProjectAllUsers(state, projectId)
  );
  useEffect(() => {
    dispatch(queryProjectUserRequest(projectId));
  }, [dispatch]);

  return (
    <div>
      {participants.map((p) => (
        <div>
          <UserAvatar user={p} />
          {p.username}
        </div>
      ))}
    </div>
  );
}
