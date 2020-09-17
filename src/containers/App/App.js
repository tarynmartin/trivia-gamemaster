import React from 'react';
import './App.css';
import Header from '../Header/Header';
import QuestionBar from '../QuestionBar/QuestionBar';
import Results from '../Results/Results';
import Game from '../Game/Game';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Route exact
          path='/create_game'
          render={() => {
            return (<>
              <QuestionBar />
              <Results />
            </>)
          }}
        />
        <Route exact
            path='/your_game'
            render={() => <Game />}
          />
    </div>
  );
}

export default connect(null, null)(App);
