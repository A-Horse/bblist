import React, { CSSProperties, ReactNode } from 'react';

export function Flex(props: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  alignCenter?: boolean;
  contentEnd?: boolean;
}) {
  return (
    <div
      className={props.className}
      style={{
        display: 'flex',
        ...(props.alignCenter
          ? {
              alignItems: 'center',
            }
          : {}),
        ...(props.contentEnd
          ? {
              justifyContent: 'flex-end',
            }
          : {}),
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}
