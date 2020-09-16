import { combineReducers } from 'redux';
import errorReducer from './error-reducer.js';

const rootReducer = combineReducers({
  errorMessage: errorReducer
});

export default rootReducer;
