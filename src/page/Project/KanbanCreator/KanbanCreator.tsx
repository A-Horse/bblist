import React, { ReactNode, useState } from 'react';
import { KanbanCreatorModal } from './KanbanCreatorModal';

export function KanbanCreator(props: {
  children: (setVisible: Function) => ReactNode;
  projectId: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {props.children(setVisible)}
      <KanbanCreatorModal
        projectId={props.projectId}
        toggle={visible}
        onClose={() => setVisible(false)}
      />
    </>
  );
}
