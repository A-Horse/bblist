import React, { useState } from 'react';

import './ProjectAddButton.scss';
import { CreateKanbanCardModal } from '../modals/CreateKanbanCardModal/CreateKanbanCardModal';
import { AppIcon } from '../../../../components/widget/Icon';

interface InputProps {}

export function ProjectAddButton({  }: InputProps) {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="ProjectAddButton">
      <CreateKanbanCardModal toggle={toggle} onClose={() => setToggle(false)} />

      <div onClick={() => setToggle(true)}>
        <AppIcon icon="plus-circle" color="black" size="lg" />
      </div>
    </div>
  );
}
