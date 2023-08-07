import React from 'react';
import {Demo, Hero} from './components';
import './App.scss';

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient"/>
      </div>
      <div className="app">
        <Hero/>
        <Demo/>
      </div>
    </main>
  );
};
export default App;
