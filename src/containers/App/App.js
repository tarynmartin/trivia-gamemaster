import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Results from '../Results/Results';
import Game from '../Game/Game';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

const App = () => {
  return (
    <div className="App">
      <h1>Hello world!</h1>
      <Header />
      <Game />
      <Results />
    </div>
  );
}

export default connect(null, null)(App);
