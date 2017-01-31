import React from 'react';
import Nav from 'containers/Nav';

export default function App({children}) {
  return (
    <div>
      <Nav/>
      {children}
    </div>
  );
}
