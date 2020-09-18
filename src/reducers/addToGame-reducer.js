const addToGameReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_GAME':
      return [...state, {id: action.id, question: action.question}];
    default:
      return state;
  }
}

export default addToGameReducer;
