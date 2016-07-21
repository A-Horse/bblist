import React from 'react'
import { Link, browserHistory } from 'react-router'

import {makeGravatarHash} from '../services/gravatar';

import Nav from './Nav';


export default function App({ children }) {
  return (
      <div>
      <Nav/>
      <div>
      <button onClick={() => browserHistory.push('/foo')}>Go to /foo</button>
      </div>
      <div style={{ marginTop: '1.5em' }}>{children}</div>
      </div>
  )
}
