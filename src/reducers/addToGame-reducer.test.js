import addToGameReducer from './addToGame-reducer'

describe('addToGameReducer', () => {
  it('should return the initial state', () => {
    const expected = [];
    const result = addToGameReducer(undefined, {});

    expect(result).toEqual(expected)
  });

  it('should return the correct state if action is ADD_TO_GAME', () => {
    const initialState = [];
    const action = {
      type: 'ADD_TO_GAME',
      id: "909",
      question:
        {
          id: "909",
          category: "Entertainment: Film",
          type: "multiple",
          difficulty: "easy",
          question: "Which of the following movies was not based on a novel by Stephen King? ",
          correct_answer: "The Thing",
          incorrect_answers: [
              "Carrie",
              "Misery",
              "The Green Mile"
          ]
        }
    }

    const newState = [
      {
      id: "909",
      question:
        {
          id: "909",
          category: "Entertainment: Film",
          type: "multiple",
          difficulty: "easy",
          question: "Which of the following movies was not based on a novel by Stephen King? ",
          correct_answer: "The Thing",
          incorrect_answers: [
              "Carrie",
              "Misery",
              "The Green Mile"
          ]
        }
      }
    ];

    const result = addToGameReducer(initialState, action)

    expect(result).toEqual(newState)
  });

  it('should return the correct state if action is REMOVE_QUESTION', () => {
    const initialState = [{
    id: "909",
    question:
      {
        id: "909",
        category: "Entertainment: Film",
        type: "multiple",
        difficulty: "easy",
        question: "Which of the following movies was not based on a novel by Stephen King? ",
        correct_answer: "The Thing",
        incorrect_answers: [
            "Carrie",
            "Misery",
            "The Green Mile"
        ]
      }
    }];

    const action = {
      type: 'REMOVE_QUESTION',
      id: "909",
      question:
        {
          id: "909",
          category: "Entertainment: Film",
          type: "multiple",
          difficulty: "easy",
          question: "Which of the following movies was not based on a novel by Stephen King? ",
          correct_answer: "The Thing",
          incorrect_answers: [
              "Carrie",
              "Misery",
              "The Green Mile"
          ]
        }
    }

    const newState = [];

    const result = addToGameReducer(initialState, action)

    expect(result).toEqual(newState)
  });
})
