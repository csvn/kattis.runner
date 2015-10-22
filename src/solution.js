module.exports = function(readline, print, putstr) {
  /**
   * readline, print and putstr is provided by kattis
   *
   * print is with newline suffix
   * putstr is without newline suffix
   */

  /* SOLUTION START - This part should be submitted to kattis */

  var line;

  while (typeof (line = readline()) !== 'undefined') {
    print(line);
  }

  putstr('These two lines will ');
  putstr('be on the same row');

  /* SOLUTION END */
};
