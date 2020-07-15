import React from 'react';

export function Panel({ children }) {
  return (
    <div
      style={{
        boxShadow: '0px 1px 5px rgb(230, 246, 255)',
        borderRadius: 6,
        padding: 12,
        boxSizing: 'border-box',
        backgroundColor: 'rgb(230, 246, 255)',
      }}
    >
      {children}
    </div>
  );
}
