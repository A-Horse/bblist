import React from 'react';
import { useSelector } from 'react-redux';
import { AppModal } from '../../../../../widget/Modal/AppModal';
import { RootState } from '../../../../../redux/reducers';
import { getKanbans } from '../../../../../redux/reducers/selector/kanban.selector';
import { KanbanRecord } from '../../../../../typings/kanban.typing';

import './KanbanSelectorModal.scss';

interface InputProps {
  toggle: boolean;
  onClose: Function;
  projectId: string;
  onChange: Function;
}

export function KanbanSelectorModal(props: InputProps) {
  const project = useSelector((state: RootState) =>
    state.project.get('projectMap').get(props.projectId)
  );
  const kanbans = useSelector((state: RootState) =>
    getKanbans(project, state.project.get('kanbanMap'))
  );

  const closeModal = () => {
    props.onClose();
  };

  return (
    <AppModal
      className="KanbanSelectorModal"
      isOpen={props.toggle}
      onRequestClose={closeModal}
    >
      <ul>
        {kanbans.map((kanban: KanbanRecord) => {
          return (
            <li
              key={kanban.get('id')}
              onClick={() => {
                props.onChange(kanban.get('id'));
                props.onClose();
              }}
            >
              {kanban.get('name')}
            </li>
          );
        })}
      </ul>
    </AppModal>
  );
}
