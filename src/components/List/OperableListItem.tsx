import React, { ReactNode, CSSProperties } from 'react';

export function OperableListItem(props: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <li
      className="OperableListItem"
      style={{
        fontSize: 14,
        padding: '5px 0 3px',
        color: '#555',
      }}
    >
      {props.children}
    </li>
  );
}
