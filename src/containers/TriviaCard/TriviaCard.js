import React from 'react';
import './TriviaCard.css';
import { addToGame } from '../../actions/actions.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const TriviaCard = (props) => {
  const listAnswers = props.incorrect.map((answer, index) => {
    return (
      <li key={index}>{answer}</li>
    )
  })

  return (
    <div className='card'>
      <button className='add-question' onClick={() => props.checkForDuplicates(props.questions, props.everything)}>Add</button>
      <div className='question'>
      <h2 className='question-title'>{props.question}</h2>
      <h3 className='question-category'>{props.category}</h3>
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
    },
    checkForDuplicates: (questions, questionObj) => {
      dispatch(checkForDuplicates(questions, questionObj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaCard);

TriviaCard.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  question: PropTypes.string,
  category: PropTypes.string,
  difficulty: PropTypes.string,
  correct: PropTypes.string,
  incorrect: PropTypes.arrayOf(PropTypes.string),
  everything: PropTypes.object
}
