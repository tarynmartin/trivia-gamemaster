import React from 'react';
import './Results.css';
import TriviaCard from '../TriviaCard/TriviaCard';
import { connect } from 'react-redux';
import propTypes from 'prop-types'

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
        {retrievedQuestions}
      </div>
    </div>
  )
}

export const mapStateToProps = (state) => {
  return {
    questions: state.updateQuestions
  }
}

export default connect(mapStateToProps, null)(Results);
