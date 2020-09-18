import React from 'react';
import './GameCard.css';
import { addToGame, createError, resetError } from '../../actions/actions.js';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const GameCard = (props) => {
  const listAnswers = props.question.incorrect_answers.map((answer, index) => {
    return (
      <li key={index}>{answer}</li>
    )
  })

  let question = document.querySelector('#root');

  return (
    <div className='game-card'>
      <button className='remove-question'><FaPlus className='icon'/></button>
      <div className='game-question'>
      <h2 className='game-question-title'>{props.question.question}</h2>
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

export function fixBadStrings(string) {
  return { __html: `<h2>${string}</h2>`}
}

export function insertBadText(string) {
  return <div dangerouslySetInnerHTML={fixBadStrings(string)} />
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addToGame: (question) => {
      dispatch(addToGame(question));
      dispatch(resetError());
    },
    handleError: (error) => {
      dispatch(createError(error));
    }
  };
};

//onClick={() => props.addToGame(props.everything) add to icon to remove?

export default connect(null, mapDispatchToProps)(GameCard);
