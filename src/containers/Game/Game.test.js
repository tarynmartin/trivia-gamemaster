import React from 'react';
import { Game, mapStateToProps } from './Game';
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
        id: 909,
        question: {
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
      },
      {
        id: 910,
        question: {
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
        }
      },
    ]
  })
  it('should display the right number of GameCards on load', () => {

    render(
      <Provider store={ store }>
        <BrowserRouter>
          <Game
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
  it('should display filler text if no questions are in store', () => {
    render(
      <Provider store={ store }>
        <BrowserRouter>
          <Game questions={[]}/>
        </BrowserRouter>
      </Provider>
    )

    const message = screen.getByText('You have not selected', {exact: false});

    expect(message).toBeInTheDocument();
  });
  it('should only return the necessary info from the redux store', () => {

    const mockState = {
      errorMessage: '',
      updateQuestions: [],
      addToGame: mockQuestions
    }

    const expected = {
      questions: mockQuestions
    }

    const props = mapStateToProps(mockState);
    expect(props).toEqual(expected)
  });
})
