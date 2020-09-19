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

  handleQuestionCategory = (event) => {
    this.setState({category: event.target.value});
  }

  handleDifficulty = (event) => {
    this.setState({difficulty: event.target.value});
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
          <select className='dropdown' onChange={this.handleQuestionCategory}>
            <option value='9'>Categories</option>
            <option value='General Knowledge'>General Knowledge</option>
            <option value='10'>Entertainment: Books</option>
            <option value='11'>Entertainment: Film</option>
            <option value='12'>Entertainment: Music</option>
            <option value='13'>Entertainment: Musicals & Theatres</option>
            <option value='14'>Entertainment: TV</option>
            <option value='15'>Entertainment: Video Games</option>
            <option value='16'>Entertainment: Board Games</option>
            <option value='29'>Entertainment: Comics</option>
            <option value='32'>Entertainment: Cartoon & Animations</option>
            <option value='31'>Entertainment: Japanese Anime & Manga</option>
            <option value='17'>Science & Nature</option>
            <option value='18'>Science: Computers</option>
            <option value='30'>Science: Gadgets</option>
            <option value='19'>Math</option>
            <option value='20'>Mythology</option>
            <option value='21'>Sports</option>
            <option value='22'>Geography</option>
            <option value='23'>History</option>
            <option value='24'>Politics</option>
            <option value='25'>Art</option>
            <option value='26'>Celebrities</option>
            <option value='27'>Animals</option>
            <option value='28'>Vehicles</option>
          </select>
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
          <select className='difficulty-dropdown' onChange={this.handleDifficulty}>
            <option>Difficulty</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
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
    }
  }
}

export default connect(null, mapDispatchToProps)(QuestionBar);
