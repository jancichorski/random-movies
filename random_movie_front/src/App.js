import React from 'react';
import './App.css';
import Form from './Form'
import CardList from './CardList';
// import {Form2} from './Form2'

function App() {
  return (
    <div className="app">
        <div className='app__left'>
          <Form />
        </div>
        <div className='app__right'>
          <CardList/>
        </div>
    </div>
  );
}

export default App;
