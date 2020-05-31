import React, { CSSProperties, ReactNode } from 'react';
import './List.scss';

export function AppList(props: { children: ReactNode; style?: CSSProperties }) {
  return (
    <ul
      style={{
        textAlign: 'left',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        ...props.style,
      }}
    >
      {props.children}
    </ul>
  );
}
