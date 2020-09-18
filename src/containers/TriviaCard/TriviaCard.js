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

  let question = document.querySelector('#root');

  return (
    <div className='card'>
      <button className='add-question' onClick={() => props.addToGame(props.everything)}><FaPlus className='icon'/></button>
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

export function fixBadStrings(string) {
  return { __html: `<h2>${string}</h2>`}
}

export function insertBadText(string) {
  return <div dangerouslySetInnerHTML={fixBadStrings(string)} />
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addToGame: (question) => {
      console.log('got here');
      dispatch(addToGame(question));
      dispatch(resetError());
    },
    handleError: (error) => {
      dispatch(createError(error));
    }
  };
};

export default connect(null, mapDispatchToProps)(TriviaCard);

// create conditional renders of certain elements
