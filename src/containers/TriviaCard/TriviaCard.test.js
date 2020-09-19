import React from 'react';
import TriviaCard from './TriviaCard.js';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers/index.js';
import thunk from 'redux-thunk';

describe('TriviaCard', () => {
  it('should display a question and related info on render', () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));

    const questionObj = {
            "category": "Entertainment: Film",
            "type": "multiple",
            "difficulty": "easy",
            "question": "Which of the following movies was not based on a novel by Stephen King?",
            "correct_answer": "The Thing",
            "incorrect_answers": [
                "Carrie",
                "Misery",
                "The Green Mile"
            ]
        }

    render(
      <Provider store={store}>
        <BrowserRouter>
          <TriviaCard
            question={'Which of the following movies was not based on a novel by Stephen King?'}
            category={'Entertainment: Film'}
            difficulty={'easy'}
            correct={'The Thing'}
            incorrect={["Carrie",
            "Misery",
            "The Green Mile"]}
            everything={questionObj}
            key={0}
          />
        </BrowserRouter>
      </Provider>
    )

    const button = screen.getByRole('button', {name: ""})
    const question = screen.getByText('Which of the following movies was not based on a novel by Stephen King?');
    const category = screen.getByText('Entertainment: Film');
    const difficulty = screen.getByText('easy');
    const correctAnswer = screen.getByText('The Thing');
    const incorrectAnswers = screen.getByText("Carrie")

    expect(button).toBeInTheDocument();
    expect(question).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(difficulty).toBeInTheDocument();
    expect(correctAnswer).toBeInTheDocument();
    expect(incorrectAnswers).toBeInTheDocument();
  })
  // test for fireEvent on add
})
