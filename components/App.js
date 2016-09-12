import React from 'react'
import Nav from './Nav';
import Footer from './Footer';

export default function App({children}) {
  return (
    <div>
      <Nav/>
      {children}
      <Footer/>
    </div>
  )
}
