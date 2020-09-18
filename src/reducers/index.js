import { combineReducers } from 'redux';
import errorReducer from './error-reducer.js';
import updateQuestionsReducer from './updateQuestions-reducer.js';
import addToGameReducer from './addToGame-reducer.js'

const rootReducer = combineReducers({
  errorMessage: errorReducer,
  updateQuestions: updateQuestionsReducer,
  addToGame: addToGameReducer
});

export default rootReducer;
