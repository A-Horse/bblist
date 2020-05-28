import React, { CSSProperties, ReactNode } from 'react';

export function ModalContent(props: {
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        padding: '8px 16px',
        fontSize: 14,
      }}
    >
      {props.children}
    </div>
  );
}
