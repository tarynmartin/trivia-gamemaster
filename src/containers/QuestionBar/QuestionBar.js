import React, { Component } from 'react';
import './QuestionBar.css';
import { updateQuestions, createError, resetError } from '../../actions/actions.js';
import { Link } from 'react-router-dom';
import { fetchQuestions } from '../../helpers/apiCalls';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

class QuestionBar extends Component {
  constructor() {
    super();
    this.state= {
      category: null,
      numberQuestions: null,
      difficulty: null
    }
  }
  handleNumberChange = (event) => {
    this.setState({numberQuestions: event.target.value})
  }

  handleQuestionCategory = (number) => {
    this.setState({category: number});
  }

  handleDifficulty = (difficulty) => {
    this.setState({difficulty: difficulty});
  }

  checkInput() {
    const inputNumber = +this.state.numberQuestions;
    if (inputNumber > 0 && inputNumber < 51) {
      return true;
    } else {
      return false;
    }
  }

  submitRequest = (event) => {
    const validInput = this.checkInput();
    const questionsNumber = this.state.numberQuestions;
    const questionCategory = this.state.category;
    const questionDifficulty = this.state.difficulty;

    event.preventDefault();

    if (validInput) {
      fetchQuestions(questionsNumber, questionCategory, questionDifficulty)
        .then((questions) => {
          let retrievedQuestions = this.translateResponse(questions);
          this.props.allQuestions(retrievedQuestions)
        })
        .catch(error => this.props.handleError(error))
    } else {
      return alert('Please use a number between 1-50 for questions.')
    }
  }

  translateResponse = (questions) => {
    let retrievedQuestions =
    questions.results.map(question => {
      question.id = Date.now() * Math.floor(Math.random() * 100);

      const decodedQuestion = entities.decode(question.question);
      const decodedCorrect = entities.decode(question.correct_answer);
      const decodedIncorrect = question.incorrect_answers.map(answer => {
        return entities.decode(answer)
      })

      question.question = decodedQuestion;
      question.correct_answer = decodedCorrect;
      question.incorrect_answers = decodedIncorrect;

      return question;
    })
    return retrievedQuestions;
  }

  render() {
    return (
      <div className ='question-bar'>
        <div className='category'>
          <h2>Choose a Category: </h2>
          <div className='dropdown'>
            <button className='dropdown-btn'>Categories</button>
              <div className='dropdown-content'>
                <a href='#' onClick={() => this.handleQuestionCategory('9')}>General Knowledge</a>
                <a href='#' onClick={() => this.handleQuestionCategory('10')}>Entertainment: Books</a>
                <a href='#' onClick={() => this.handleQuestionCategory('11')}>Entertainment: Film</a>
                <a href='#' onClick={() => this.handleQuestionCategory('12')}>Entertainment: Music</a>
                <a href='#' onClick={() => this.handleQuestionCategory('13')}>Entertainment: Musicals & Theatres</a>
                <a href='#' onClick={() => this.handleQuestionCategory('14')}>Entertainment: TV</a>
                <a href='#' onClick={() => this.handleQuestionCategory('15')}>Entertainment: Video Games</a>
                <a href='#' onClick={() => this.handleQuestionCategory('16')}>Entertainment: Board Games</a>
                <a href='#' onClick={() => this.handleQuestionCategory('29')}>Entertainment: Comics</a>
                <a href='#' onClick={() => this.handleQuestionCategory('32')}>Entertainment: Cartoon & Animations</a>
                <a href='#' onClick={() => this.handleQuestionCategory('31')}>Entertainment: Japanese Anime & Manga</a>
                <a href='#' onClick={() => this.handleQuestionCategory('17')}>Science & Nature</a>
                <a href='#' onClick={() => this.handleQuestionCategory('18')}>Science: Computers</a>
                <a href='#' onClick={() => this.handleQuestionCategory('30')}>Science: Gadgets</a>
                <a href='#' onClick={() => this.handleQuestionCategory('19')}>Science: Math</a>
                <a href='#' onClick={() => this.handleQuestionCategory('20')}>Mythology</a>
                <a href='#' onClick={() => this.handleQuestionCategory('21')}>Sports</a>
                <a href='#' onClick={() => this.handleQuestionCategory('22')}>Geography</a>
                <a href='#' onClick={() => this.handleQuestionCategory('23')}>History</a>
                <a href='#' onClick={() => this.handleQuestionCategory('24')}>Politics</a>
                <a href='#' onClick={() => this.handleQuestionCategory('25')}>Art</a>
                <a href='#' onClick={() => this.handleQuestionCategory('26')}>Celebrities</a>
                <a href='#' onClick={() => this.handleQuestionCategory('27')}>Animals</a>
                <a href='#' onClick={() => this.handleQuestionCategory('28')}>Vehicles</a>
              </div>
          </div>
        </div>
        <div className='number-questions'>
          <h2>Choose How Many Questions: </h2>
          <input
            className='question-number'
            type='number'
            placeholder='1-50'
            onChange={this.handleNumberChange}
          />
        </div>
        <div className='difficulty'>
        <h2>Choose Difficulty: </h2>
          <div className='difficulty-dropdown'>
            <button className='difficulty-btn'>Difficulty</button>
            <div className='difficulty-content'>
              <a href='#' onClick={() => this.handleDifficulty('easy')}>Easy</a>
              <a href='#' onClick={() => this.handleDifficulty('medium')}>Medium</a>
              <a href='#' onClick={() => this.handleDifficulty('hard')}>Hard</a>
            </div>
          </div>
        </div>
        <button className='submit' onClick={this.submitRequest}>Submit</button>
    </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    allQuestions: (questions) => {
      dispatch(updateQuestions(questions));
      dispatch(resetError());
    },
    handleError: (error) => {
      dispatch(createError(error));
    },
  }
}

export default connect(null, mapDispatchToProps)(QuestionBar);
