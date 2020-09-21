import React from 'react';
import './Results.css';
import TriviaCard from '../TriviaCard/TriviaCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

export const Results = (props) => {
  const retrievedQuestions = props.questions.map((question, index) => {
    return (
      <TriviaCard
        question={question.question}
        category={question.category}
        difficulty={question.difficulty}
        correct={question.correct_answer}
        incorrect={question.incorrect_answers}
        everything={question}
        key={index}
      />
    )
  })

  return (
    <div className='results'>
      <div>
        <h2 className='results-title'>Results</h2>
      </div>
      <div className='all-cards'>
        {retrievedQuestions.length === 0 &&
          props.errorMessage &&
          <p className='error-message'>{props.errorMessage}</p>
        }
        {retrievedQuestions.length === 0 && props.errorMessage === ''&&
          <p className='error-message'>Put in your question search terms above!</p>
        }
        {retrievedQuestions.length > 0 &&
          <>
          {retrievedQuestions}
          </>
        }
      </div>
    </div>
  )
}

export const mapStateToProps = (state) => {
  return {
    questions: state.updateQuestions,
    errorMessage: state.errorMessage
  }
}

export default connect(mapStateToProps, null)(Results);

Results.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  errorMessage: PropTypes.string
}
