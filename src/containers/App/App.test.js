import React from 'react';
import { App } from './App';
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

describe('App', () => {
  let store;

  beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk));
  })
  it('should show instructions on page load', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const title = screen.getByText('Be Your Own QuizMaster!');
    const instructionsTitle = screen.getByText('Let\'s Create A Game!');
    const instructions = screen.getByText('This app allows the user', {exact: false});
    const listTitle = screen.getByText('Click on the choose questions button.')
    const lastInstruction = screen.getByText('If you decide', {exact: false});

    expect(title).toBeInTheDocument();
    expect(instructionsTitle).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(listTitle).toBeInTheDocument();
    expect(lastInstruction).toBeInTheDocument();
  });
  it('should change the page when choose questions is selected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const button1 = screen.getByRole('button', {name: 'Choose Questions'});

    fireEvent.click(button1);
    const category = screen.getByText('Choose a Category:');

    expect(category).toBeInTheDocument();
  });
  it('should change the page when your game is selected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const button1 = screen.getByRole('button', {name: 'Your Game'});

    fireEvent.click(button1);
    const category = screen.getByRole('heading', {name: 'Your Game'});

    expect(category).toBeInTheDocument();

  });
  it('should show questions based on user search', async () => {
    const mockedValues = {
      response_code: 0,
      results: [
         {
            category: "blah",
            type: "multiple",
            difficulty: "easy",
            question: "blah blah",
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
            question: "blah x 3",
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
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const button1 = screen.getByRole('button', {name: 'Choose Questions'});

    fireEvent.click(button1);

    const categoryMenu = screen.getByTestId('select-one');
    const sports = screen.getByTestId('sports');
    const numberInput = screen.getByPlaceholderText('1-50');
    const difficultyMenu = screen.getByTestId('select-difficulty')
    const hard = screen.getByTestId('hard');
    const submit = screen.getByRole('button', {name: 'Submit'})

    userEvent.selectOptions(categoryMenu, ['21']);
    fireEvent.change(numberInput, { target: { value: '45' } });
    userEvent.selectOptions(difficultyMenu, ['hard']);
    fireEvent.click(submit);

    const question1 = await waitFor(() => screen.getByText('blah'));
    const question2 = screen.getByText('humbug');

    expect(question1).toBeInTheDocument();
    expect(question2).toBeInTheDocument();
  });
  it('should return to the home page when the title is clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const button1 = screen.getByRole('button', {name: 'Your Game'});

    fireEvent.click(button1);
    const category = screen.getByRole('heading', {name: 'Your Game'});

    const button2 = screen.getByRole('heading', {name: 'Be Your Own QuizMaster!'});

    fireEvent.click(button2);
    const mainPage = screen.getByText('Let\'s Create A Game!');

    expect(mainPage).toBeInTheDocument();
  });
  it('should return to the previous results when returning to choose questions page from your game', async () => {
    const mockedValues = {
      response_code: 0,
      results: [
         {
            category: "blah",
            type: "multiple",
            difficulty: "easy",
            question: "blah blah",
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
            question: "blah x 3",
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
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const button1 = screen.getByRole('button', {name: 'Choose Questions'});

    fireEvent.click(button1);

    const categoryMenu = screen.getByTestId('select-one');
    const sports = screen.getByTestId('sports');
    const numberInput = screen.getByPlaceholderText('1-50');
    const difficultyMenu = screen.getByTestId('select-difficulty')
    const hard = screen.getByTestId('hard');
    const submit = screen.getByRole('button', {name: 'Submit'})

    userEvent.selectOptions(categoryMenu, ['21']);
    fireEvent.change(numberInput, { target: { value: '45' } });
    userEvent.selectOptions(difficultyMenu, ['hard']);
    fireEvent.click(submit);

    const question1 = await waitFor(() => screen.getByText('blah'));
    const question2 = screen.getByText('humbug');

    expect(question1).toBeInTheDocument();
    expect(question2).toBeInTheDocument();

    const button2 = screen.getByRole('button', {name: 'Your Game'});

    fireEvent.click(button2);

    const category = screen.getByRole('heading', {name: 'Your Game'});

    expect(category).toBeInTheDocument();

    const button3 = screen.getByRole('button', {name: 'Choose Questions'});

    fireEvent.click(button3);

    const categoryMenu2 = screen.getByTestId('select-one');
    const question3 = await waitFor(() => screen.getByText('blah'));
    const question4 = screen.getByText('humbug');

    await waitFor(() => {
      expect(categoryMenu2).toBeInTheDocument();
      expect(question3).toBeInTheDocument();
      expect(question4).toBeInTheDocument();
    });

  });
  it('should return to all questions on your game page when returning from choose questions page', async () => {
    const mockedValues = {
      response_code: 0,
      results: [
         {
            category: "blah",
            type: "multiple",
            difficulty: "easy",
            question: "blah blah",
            correct_answer: "Wilson",
            incorrect_answers: [
                "Friday",
                "Jones",
                "Billy"
            ]
        }
      ]
    }

    fetchQuestions.mockResolvedValueOnce(mockedValues);

    const mockedFetch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const button1 = screen.getByRole('button', {name: 'Choose Questions'});

    fireEvent.click(button1);

    const categoryMenu = screen.getByTestId('select-one');
    const sports = screen.getByTestId('sports');
    const numberInput = screen.getByPlaceholderText('1-50');
    const difficultyMenu = screen.getByTestId('select-difficulty')
    const hard = screen.getByTestId('hard');
    const submit = screen.getByRole('button', {name: 'Submit'})

    userEvent.selectOptions(categoryMenu, ['21']);
    fireEvent.change(numberInput, { target: { value: '45' } });
    userEvent.selectOptions(difficultyMenu, ['hard']);
    fireEvent.click(submit);

    const question1 = await waitFor(() => screen.getByText('blah'));

    expect(question1).toBeInTheDocument();

    const addButton = screen.getByRole('button', {name: 'Add'});

    fireEvent.click(addButton)

    const button2 = screen.getByRole('button', {name: 'Your Game'});

    fireEvent.click(button2);

    const category = screen.getByRole('heading', {name: 'Your Game'});

    const savedQuestion = screen.getByText('blah');

    expect(category).toBeInTheDocument();
    expect(savedQuestion).toBeInTheDocument();
  });
  it('should display an error message if the user doesn\'t enter enough info for fetch', async () => {
    const mockedValue = {
      response_code: 0,
      results: []
    }

    fetchQuestions.mockResolvedValueOnce(mockedValue);
    const mockedFetch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    const button1 = screen.getByRole('button', {name: 'Choose Questions'});

    fireEvent.click(button1);

    const categoryMenu = screen.getByTestId('select-one');
    const sports = screen.getByTestId('sports');
    const numberInput = screen.getByPlaceholderText('1-50');
    const difficultyMenu = screen.getByTestId('select-difficulty')
    const hard = screen.getByTestId('hard');
    const submit = screen.getByRole('button', {name: 'Submit'})

    userEvent.selectOptions(categoryMenu, ['21']);
    fireEvent.change(numberInput, { target: { value: '45' } });
    userEvent.selectOptions(difficultyMenu, ['difficulty']);
    fireEvent.click(submit);

    const errorMsg = await waitFor(() => screen.getByText('Sorry, it looks like there were no results. Please enter a new search and try again!'))

    expect(errorMsg).toBeInTheDocument();
  });
})
