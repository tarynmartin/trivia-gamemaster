import React from 'react';
import './TriviaCard.css';
import { addToGame, createError, resetError } from '../../actions/actions.js';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const TriviaCard = (props) => {
  const listAnswers = props.incorrect.map((answer, index) => {
    return (
      <li key={index}>{answer}</li>
    )
  })

  return (
    <div className='card'>
      <button className='add-question' onClick={() => props.checkForDuplicates(props.questions, props.everything)}><FaPlus className='icon'/></button>
      <div className='question'>
      <h2 className='question-title'>{props.question}</h2>
      <h3 className='difficulty-title'>{props.difficulty}</h3>
      </div>
      <div className='answers'>
        <ol>
          <h4 className='correct'><li>{props.correct}</li></h4>
          <h4 className='incorrect'>{listAnswers}</h4>
        </ol>
      </div>
    </div>
  )
}

export const checkForDuplicates = (questions, questionObj) => {
  return (dispatch) => {
    const checked = questions.find(question => { return question.id === questionObj.id })

    if (checked === undefined) {
      dispatch(addToGame(questionObj))
    } else {
      return alert('You have already added this question to your game. Please add a new one!')
    }
  }
}

export const mapStateToProps = (state) => {
  return {
    questions: state.addToGame
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addToGame: (question) => {
      dispatch(addToGame(question));
      dispatch(resetError());
    },
    checkForDuplicates: (questions, questionObj) => {
      dispatch(checkForDuplicates(questions, questionObj));
    },
    handleError: (error) => {
      dispatch(createError(error));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaCard);
