import React from 'react';
import { GameCard } from './GameCard';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers/index.js';
import thunk from 'redux-thunk';

describe('GameCard', () => {
  let store, questionObj;

  beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk));

    questionObj = {
      id: "909",
      category: "Entertainment: Film",
      type: "multiple",
      difficulty: "easy",
      question: "Which of the following movies was not based on a novel by Stephen King?",
      correct_answer: "The Thing",
      incorrect_answers: [
          "Carrie",
          "Misery",
          "The Green Mile"
      ]
    }
  });
  it('should display a question and related info on render', () => {

    render(
      <Provider store={ store }>
        <BrowserRouter>
          <GameCard
            question={questionObj}
          />
        </BrowserRouter>
      </Provider>
    )

    const question = screen.getByText('Which of the following movies was not based on a novel by Stephen King?');
    const category = screen.getByText('Entertainment: Film');
    const difficulty = screen.getByText('easy');
    const correctAnswer = screen.getByText('The Thing');
    const incorrectAnswers = screen.getByText("Carrie")

    expect(question).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(difficulty).toBeInTheDocument();
    expect(correctAnswer).toBeInTheDocument();
    expect(incorrectAnswers).toBeInTheDocument();
  });
  it('should call removeQuestion when button is clicked', () => {

    const mockRemove = jest.fn();

    render(
      <Provider store={ store }>
        <BrowserRouter>
          <GameCard
            question={questionObj}
            removeQuestion={mockRemove}
          />
        </BrowserRouter>
      </Provider>
    )

    const button1 = screen.getByRole('button', {name: 'Remove'});

    fireEvent.click(button1);

    expect(mockRemove).toBeCalledTimes(1);
    expect(mockRemove).toBeCalledWith(questionObj);

  })
})
