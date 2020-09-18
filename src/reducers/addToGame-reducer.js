const addToGameReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_GAME':
      return [...state, {id: action.id, question: action.question}];
    case 'REMOVE_QUESTION':
      return state.filter(question => {
        if (question.id !== action.question.id) {
          return question;
        }
      })
    default:
      return state;
  }
}

export default addToGameReducer;
