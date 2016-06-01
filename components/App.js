import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import Nav from '../containers/Nav'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
    <div>
      <Nav/>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
)

export default App
