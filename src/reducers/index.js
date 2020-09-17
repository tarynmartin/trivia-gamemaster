import { combineReducers } from 'redux';
import errorReducer from './error-reducer.js';
import updateQuestionsReducer from './updateQuestions-reducer.js';

const rootReducer = combineReducers({
  errorMessage: errorReducer,
  updateQuestions: updateQuestionsReducer
});

export default rootReducer;
