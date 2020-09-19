import React from 'react';
import Header from './Header.js';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import { removeQuestion } from '../../actions/actions.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers/index.js';
import thunk from 'redux-thunk';

describe('Header', () => {
  it('should display header on page load', () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    )

    const title = screen.getByText('Be Your Own QuizMaster!');
    const button1 = screen.getByRole('button', {name: 'Choose Questions'});
    const button2 = screen.getByRole('button', {
      name: 'Your Game'});

    expect(title).toBeInTheDocument();
    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });
})
