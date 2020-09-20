import React from 'react';
import './App.css';
import Header from '../Header/Header';
import QuestionBar from '../QuestionBar/QuestionBar';
import Results from '../Results/Results';
import Game from '../Game/Game';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

export const App = () => {
  return (
    <div className="App">
      <Route exact
          path='/create_game'
          render={() => {
            return (
              <>
                <Header />
                <QuestionBar />
                <Results />
              </>)
          }}
        />
        <Route exact
            path='/your_game'
            render={() => {
              return (
                <>
                  <Header />
                  <Game />
                </>
              )
            }}
          />
          <Route exact
              path='/'
              render={() => {
                return (
                  <>
                    <Header />
                    <div className='instructions'>
                      <h2>Let's Create A Game!</h2>
                      <p>This app allows the user to create their own trivia game based on questions they can look up on here! To start, follow the directions below:</p>
                      <div className='list-instructions'>
                        <h3>Click on the create your own game button.</h3>
                        <h3>Here, select a category, number of questions, and difficulty level and hit submit</h3>
                        <h3>Some categories don't have enough questions, so you may need to try again.</h3>
                        <h3>If you want to add a question to your game, click the add button on the question and it will be saved</h3>
                        <h3>To see your game, click on the your game button to see all of your questions so far.</h3>
                        <h3>If you decide you don't want a question in your game, just hit delete and it'll be removed!</h3>
                      </div>
                    </div>
                  </>
                )
              }}
            />
    </div>
  );
}

export default connect(null, null)(App);
