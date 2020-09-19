import React from 'react';
import GameCard from './GameCard.js';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { removeQuestion } from '../../actions/actions.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers/index.js';
import thunk from 'redux-thunk';

describe('GameCard', () => {
  it('should display a question and related info on render', () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));

    const questionObj = {
            "id": "909",
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
        <MemoryRouter>
          <GameCard
            question={questionObj}
            key={0}
          />
        </MemoryRouter>
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
  })
  it('should call removeQuestion when button is clicked', () => {
    const mockRemove = jest.fn();

    const store = createStore(rootReducer, applyMiddleware(thunk));

    const questionObj = {
            "id": "909",
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
        <MemoryRouter>
          <GameCard
            question={questionObj}
            key={0}
            removeQuestion={mockRemove}
          />
        </MemoryRouter>
      </Provider>
    )

    const button = screen.getByRole('button', {name: 'Remove'});

    fireEvent.click(button);


      expect(mockRemove).toBeCalledTimes(1);
      expect(mockRemove).toBeCalledWith(questionObj);

  })
})
