import React, { CSSProperties, ReactNode } from 'react';
import { Flex } from '../../widget/Layout/Flex';
import { AppButton } from '../../widget/Button';
import { AppIcon } from '../../widget/Icon';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export function OperableListItem(props: {
  children: ReactNode;
  style?: CSSProperties;
  onEditClick?: Function;
  onDeleteClick?: Function;
}) {
  return (
    <li
      className="OperableListItem"
      style={{
        fontSize: 14,
        padding: '5px 0 3px',
        color: '#555',
        borderBottom: '1px solid #ccc',
        ...props.style,
      }}
    >
      <Flex>
        <div>{props.children}</div>
        <div>
          <AppButton onClick={props.onEditClick}>
            <AppIcon icon={faPencilAlt} />
          </AppButton>
          <AppButton onClick={props.onDeleteClick}>
            <AppIcon icon={faTrashAlt} />
          </AppButton>
        </div>
      </Flex>
    </li>
  );
}
