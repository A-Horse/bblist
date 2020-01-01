import './ProjectAddButton.scss';

import React, { useState } from 'react';

import { AppIcon } from '../../../../components/widget/Icon';
import { CreateKanbanCardModal } from '../modals/CreateKanbanCardModal/CreateKanbanCardModal';

export function ProjectAddButton() {
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
