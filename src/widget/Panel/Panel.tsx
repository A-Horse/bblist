import React from 'react';

export function Panel({ children, style }) {
  return (
    <div
      style={{
        borderRadius: 6,
        padding: 12,
        boxSizing: 'border-box',
        backgroundColor: '#ebecf0',
          ...style
      }}
    >
      {children}
    </div>
  );
}
