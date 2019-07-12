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
module.exports = {
  formatTitle,

}
