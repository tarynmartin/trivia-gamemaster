import React from 'react';
import { QuestionBar } from './QuestionBar';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers/index.js';
import thunk from 'redux-thunk';
jest.mock('../../helpers/apiCalls');
import { fetchQuestions } from '../../helpers/apiCalls.js';


describe('QuestionBar component', () => {
  let store;

  beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk));
  });
  it('should render all page elements on load', () => {

    render(
      <Provider store={store}>
        <BrowserRouter>
          <QuestionBar />
        </BrowserRouter>
      </Provider>
    )

    const category = screen.getByText('Choose a Category:');
    const categoryMenu = screen.getByTestId('select-one')
    const questions = screen.getByText('Choose How Many Questions:');
    const questionInput = screen.getByPlaceholderText('1-50');
    const difficulty = screen.getByText('Choose Difficulty:');
    const difficultyMenu = screen.getByTestId('select-difficulty')

    expect(category).toBeInTheDocument();
    expect(categoryMenu).toBeInTheDocument();
    expect(questions).toBeInTheDocument();
    expect(questionInput).toBeInTheDocument();
    expect(difficulty).toBeInTheDocument();
    expect(difficultyMenu).toBeInTheDocument();
  });
  it('should allow a user to select a category', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <QuestionBar />
        </BrowserRouter>
      </Provider>
    )

    const categoryMenu = screen.getByTestId('select-one')
    const sports = screen.getByTestId('sports');
    const math1 = screen.getByTestId('math');

    userEvent.selectOptions(categoryMenu, ['21']);

    expect(sports.selected).toBe(true);
    expect(math1.selected).toBe(false);

  });
  it('should allow a user to input a number between 1-50', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <QuestionBar />
        </BrowserRouter>
      </Provider>
    )

    const numberInput = screen.getByPlaceholderText('1-50');

    fireEvent.change(numberInput, { target: { value: '45' } });

    expect(numberInput.value).toBe('45');

  });
  it('should allow a user to select a difficulty level for a question', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <QuestionBar />
        </BrowserRouter>
      </Provider>
    )

    const difficultyMenu = screen.getByTestId('select-difficulty')
    const easy = screen.getByTestId('easy');
    const hard = screen.getByTestId('hard');

    userEvent.selectOptions(difficultyMenu, ['hard']);

    expect(hard.selected).toBe(true);
    expect(easy.selected).toBe(false);
  });
  it('should submit a fetch request when submit button is clicked', async () => {

    const mockedValues = {
      response_code: 0,
      results: [
         {
            category: "blah",
            type: "multiple",
            difficulty: "easy",
            question: "blah",
            correct_answer: "Wilson",
            incorrect_answers: [
                "Friday",
                "Jones",
                "Billy"
            ]
        }, {
            category: "humbug",
            type: "multiple",
            difficulty: "easy",
            question: "blah",
            correct_answer: "The Thing",
            incorrect_answers: [
                "Carrie",
                "Misery",
                "The Green Mile"
            ]
        }
      ]
    }

    fetchQuestions.mockResolvedValueOnce(mockedValues);

    const mockedFetch = jest.fn();

    render(
      <Provider store={ store }>
        <BrowserRouter>
          <QuestionBar allQuestions={mockedFetch}/>
        </BrowserRouter>
      </Provider>
    )

    const categoryMenu = screen.getByTestId('select-one')
    const sports = screen.getByTestId('sports');
    const numberInput = screen.getByPlaceholderText('1-50');
    const difficultyMenu = screen.getByTestId('select-difficulty')
    const hard = screen.getByTestId('hard');
    const submit = screen.getByRole('button', {name: 'Submit'})

    userEvent.selectOptions(categoryMenu, ['21']);
    fireEvent.change(numberInput, { target: { value: '45' } });
    userEvent.selectOptions(difficultyMenu, ['hard']);
    fireEvent.click(submit);

    await waitFor(() => {
      expect(mockedFetch).toBeCalledTimes(1);
    })
  });
})
