import React from 'react'
import { Link, browserHistory } from 'react-router'

import {makeGravatarHash} from '../services/gravatar';

import Nav from './Nav';


export default function App({ children }) {
  return (
      <div>
      <Nav/>
      <div>
      
      </div>
      <div style={{ marginTop: '1.5em' }}>{children}</div>
      </div>
  )
}
