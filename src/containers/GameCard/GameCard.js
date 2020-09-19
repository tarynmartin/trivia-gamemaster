import React from 'react';
import './GameCard.css';
import { removeQuestion, createError, resetError } from '../../actions/actions.js';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const GameCard = (props) => {
  const listAnswers = props.question.incorrect_answers.map((answer, index) => {
    return (
      <li key={index}>{answer}</li>
    )
  })

  return (
    <div className='game-card'>
      <button className='remove-question' onClick={() => props.removeQuestion(props.question)}>Remove</button>
      <div className='game-question'>
      <h2 className='game-question-title'>{props.question.question}</h2>
      <h3 className='game-category'>{props.question.category}</h3>
      <h3 className='game-difficulty-title'>{props.question.difficulty}</h3>
      </div>
      <div className='game-answers'>
        <ol>
          <h4 className='game-correct'><li>{props.question.correct_answer}</li></h4>
          <h4 className='game-incorrect'>{listAnswers}</h4>
        </ol>
      </div>
    </div>
  )
}

export const mapDispatchToProps = (dispatch) => {
  return {
    removeQuestion: (question) => {
      dispatch(removeQuestion(question));
      dispatch(resetError());
    },
    handleError: (error) => {
      dispatch(createError(error));
    }
  };
};

export default connect(null, mapDispatchToProps)(GameCard);
