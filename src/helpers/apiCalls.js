export const fetchQuestions = (number, category, difficulty) => {
  return fetch(`https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}`)
    .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      return response.json();
    }
  });
}
