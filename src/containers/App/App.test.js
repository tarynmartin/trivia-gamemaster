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

describe('App', () => {
  it('should show instructions on page load', () => {

  });
  it('should change the page when choose questions is selected', () => {

  });
  it('should show questions based on user search', async () => {

  });
  it('should change the page when your game button is selected', () => {

  });
  it('should return to the home page when the title is clicked', () => {

  });
  it('should return to the previous results when returning to choose questions page', () => {

  });
  it('should return to all questions on your questions page when returning', () => {

  });
  it('should display an error message if the user doesn\'t enter enough info for fetch', () => {

  });
  it('should display an error message if there are no results of fetch', () => {

  });
})
