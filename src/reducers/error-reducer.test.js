import errorReducer from './error-reducer'

describe('errorReducer', () => {
  it('should return the initial state', () => {
    const expected = '';
    const result = errorReducer(undefined, {});

    expect(result).toEqual(expected)
  });

  it('should return the correct state if action is ERRORED', () => {
    const initialState = 'No questions found';
    const action = {
      type: 'ERRORED',
      error: 'Sorry, we were unable to find any questions. Please try a different search'
    }

    const newState = 'Sorry, we were unable to find any questions. Please try a different search';

    const result = errorReducer(initialState, action)

    expect(result).toEqual(newState)
  });

  it('should return the correct state if action is RESET_ERROR', () => {
    const initialState = 'No questions found';
    const action = {
      type: 'RESET_ERROR',
      error: ''
    }

    const newState = '';

    const result = errorReducer(initialState, action)

    expect(result).toEqual(newState)
  })
})
