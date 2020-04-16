import React, { ReactNode, CSSProperties } from 'react';

import './ModalFooter.scss';

export function ModalFooter(props: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      className="ModalFooter"
      style={{
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}
