const validator = require('validator');

function formatTitle(title) {
  let arr = title.trim().split(/\s+/);  
  let result = arr.reduce(function (currentResult, word) {
    first = word.charAt(0).toUpperCase();
    second = word.slice(1).toLowerCase();
    currentResult.push(first.concat(second));
    return currentResult;
  }, []);
  return result.join(' ');
}

function validateTitle(title) {
  let errors = [];
  if(validator.isEmpty(title)) {
    errors.push('Title is Empty!');
  }
  return errors;
}


function validateBoard(board) {
  board.title = formatTitle(board.title);
  let errors = [];
  errors.push(...validateTitle(board.title));
  
  let isValid = errors.length === 0;
  return {
    errors,
    isValid,
    board   
  };
}
module.exports = {
  validateBoard,
  formatTitle,
}
