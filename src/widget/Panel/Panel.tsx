import React from 'react';

export function Panel({ children, style }) {
  return (
    <div
      style={{
        boxShadow: '0px 1px 5px rgb(230, 246, 255)',
        borderRadius: 6,
        padding: 12,
        boxSizing: 'border-box',
        backgroundColor: 'rgba(230, 246, 255, 0.6)',
          ...style
      }}
    >
      {children}
    </div>
  );
}
