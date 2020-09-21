import React from 'react';
import { TriviaCard, mapStateToProps } from './TriviaCard';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers/index.js';
import thunk from 'redux-thunk';

describe('TriviaCard', () => {
  let store, questionObj;

  beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk));

    questionObj = {
      id: "910",
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

    const button = screen.getByRole('button', {name: "Add"})
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
  it('should call addToGame when button is clicked', () => {
    const mockAdd = jest.fn();
    const mockCheck = jest.fn();

    const mockQuestions = []

    render(
      <Provider store={ store }>
        <BrowserRouter>
          <TriviaCard
          questions={mockQuestions}
          question={'Cats'}
          category={'Entertainment: Film'}
          difficulty={'easy'}
          correct={'Awful'}
          incorrect={["Catastrophic",
          "Misery",
          "Wonderful"]}
          everything={questionObj}
          key={0}
          addToGame={mockAdd}
          checkForDuplicates={mockCheck}
          />
        </BrowserRouter>
      </Provider>
    )

    const button1 = screen.getByRole('button', {name: 'Add'});

    fireEvent.click(button1);

    expect(button1).toBeInTheDocument();
    expect(mockAdd).toBeCalledTimes(1);
    expect(mockAdd).toBeCalledWith(questionObj);

  })
  it('should only return the necessary information from the store', () => {
    const mockState = {
      errorMessage: '',
      updateQuestions: [
        {
          id: '910',
          question: {
            id: "910",
            category: "Cats",
            type: "multiple",
            difficulty: "easy",
            question: "How many cats do I have?",
            correct_answer: "1",
            incorrect_answers: [
                "0",
                "2",
                "3"
            ]}
        }
      ],
      addToGame: [
        {
          id: '910',
          question: {
            id: "910",
            category: "Cats",
            type: "multiple",
            difficulty: "easy",
            question: "How many cats do I have?",
            correct_answer: "1",
            incorrect_answers: [
                "0",
                "2",
                "3"
            ]}
        }
      ]
    }
    const expected = {
      questions: [
        {
          id: '910',
          question: {
            id: "910",
            category: "Cats",
            type: "multiple",
            difficulty: "easy",
            question: "How many cats do I have?",
            correct_answer: "1",
            incorrect_answers: [
                "0",
                "2",
                "3"
            ]}
        }
      ]
    }

    const mappedProps = mapStateToProps(mockState);

    expect(mappedProps).toEqual(expected);
  });
})
