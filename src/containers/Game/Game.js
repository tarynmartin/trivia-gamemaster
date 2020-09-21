import React from 'react';
import './Game.css';
import GameCard from '../GameCard/GameCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const Game = (props) => {
  let retrievedQuestions;
  if (props.questions) {
    retrievedQuestions = props.questions.map((question, index) => {
     return (
       <GameCard
         question={question.question}
         key={index}
       />
     )
   })
  }

  return (
    <div className='game'>
      <div>
        <h2 className='game-title'>Your Game</h2>
      </div>
      {retrievedQuestions.length === 0 &&
        <div className='no-questions'>
          <p>You have not selected any questions. Please click on the Choose Questions button to start creating your game!</p>
        </div>
      }
      {retrievedQuestions.length > 0 &&
        <div className='all-questions'>
          {retrievedQuestions}
        </div>
      }
    </div>
  )
}

export const mapStateToProps = (state) => {
  return {
    questions: state.addToGame
  }
}

export default connect(mapStateToProps, null)(Game);

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object)
}
