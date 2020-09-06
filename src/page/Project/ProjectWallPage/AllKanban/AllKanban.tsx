import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserKanbansRequest } from '../../../../redux/actions/kanban.action';
import { RootState } from '../../../../redux/reducer';
import { selectAllKanbans } from '../../../../redux/reducer/selector/kanban.selector';
import { KanbanOverviewPanel } from '../../ProjectPage/ProjectOverview/KanbanOverviewPanel/KanbanOverviewPanel';

export function AllKanban() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserKanbansRequest());
  }, []);

  const kanbans = useSelector((state: RootState) => selectAllKanbans(state));
  return (
    <div>
      {kanbans.map((kanban) => (
        <KanbanOverviewPanel key={kanban.id} kanban={kanban} />
      ))}
    </div>
  );
}
