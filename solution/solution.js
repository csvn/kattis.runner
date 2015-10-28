module.exports = function(readline, print, putstr) {
  /* SOLUTION START - This part should be submitted to kattis */

  var line;

  while (typeof (line = readline()) !== 'undefined') {
    print(line);
  }

  putstr('These two lines will ');
  putstr('be on the same row');

  /* SOLUTION END */
};
