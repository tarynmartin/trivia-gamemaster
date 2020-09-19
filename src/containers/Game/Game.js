import React from 'react';
import './Game.css';
import GameCard from '../GameCard/GameCard';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const Game = (props) => {
  const retrievedQuestions = props.questions.map((question, index) => {
    return (
      <GameCard
        question={question.question}
        key={index}
      />
    )
  })

  return (
    <div className='game'>
      <div>
        <h2 className='game-title'>Your Game</h2>
      </div>
      <div className='all-questions'>
        {retrievedQuestions}
      </div>
    </div>
  )
}

export const mapStateToProps = (state) => {
  return {
    questions: state.addToGame
  }
}

export default connect(mapStateToProps, null)(Game);
