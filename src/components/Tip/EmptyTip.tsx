import React, { ReactNode, CSSProperties } from 'react';

export function EmptyTip(props: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        fontSize: 13,
        color: '#999'
      }}
    >
      {props.children}
    </div>
  );
}
