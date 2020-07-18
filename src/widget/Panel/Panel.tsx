import React from 'react';

export function Panel({ children, style }) {
  return (
    <div
      style={{
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
