import './App.css';
import React, { Fragment } from 'react';

// components

import InputTodo from './components/inputTodo';


function App() {
  return <Fragment>
    <div className='container'>
      <InputTodo />
    </div>
  </Fragment>;
}

export default App;