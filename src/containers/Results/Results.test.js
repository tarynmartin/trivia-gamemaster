import React from 'react';
import { Results, mapStateToProps } from './Results';
import { screen, render} from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers/index.js';
import thunk from 'redux-thunk';

describe('Game component', () => {
  let store, mockQuestions;

  beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk));

    mockQuestions = [
      {
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
      },
      {
        id: "910",
        category: "Entertainment: Film",
        type: "multiple",
        difficulty: "easy",
        question: "How many cats do I have?",
        correct_answer: "1",
        incorrect_answers: [
            "0",
            "2",
            "3"
        ]
      },
    ]
  })

  it('should display the right number of TriviaCards on load', () => {

    render(
      <Provider store={ store }>
        <BrowserRouter>
          <Results
            questions={mockQuestions}
          />
        </BrowserRouter>
      </Provider>
    )

    const question1 = screen.getByText('Which of the following movies was not based on a novel by Stephen King?');
    const question2 = screen.getByText('How many cats do I have?');

    expect(question1).toBeInTheDocument();
    expect(question2).toBeInTheDocument();
  });

  it('should display an error message from the Redux store if there are no results to display', () => {

    render(
      <Provider store={ store }>
        <BrowserRouter>
          <Results
          questions={[]}
          errorMessage={'Sorry, we were unable to find any questions'}
          />
        </BrowserRouter>
      </Provider>
    )

    const noResults = screen.getByText('Sorry, we were unable to find any questions');

    expect(noResults).toBeInTheDocument();
  });

  it('should only return the necessary info from the redux store', () => {
    const mockError = 'Sorry, we don\'t have that';

    const mockState = {
      errorMessage: mockError,
      updateQuestions: mockQuestions,
      addToGame: []
    }

    const expected = {
      questions: mockQuestions,
      errorMessage: mockError
    }

    const props = mapStateToProps(mockState);
    expect(props).toEqual(expected)
  });
})
