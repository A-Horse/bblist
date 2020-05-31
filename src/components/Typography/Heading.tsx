import React, { CSSProperties, ReactNode } from 'react';

export function Heading(props: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        fontSize: 15,
        color: '#555',
        fontWeight: 'bold',
      }}
    >
      {props.children}
    </div>
  );
}
