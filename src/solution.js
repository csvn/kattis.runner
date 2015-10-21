module.exports = function(readline, print) {

  /* SOLUTION START - This part should be submitted to kattis */
  var index = 0,
      growth = Math.random() * 0.5 + 0.75;

  while (index < 1000000000) {
    index += growth;
  }

  print(readline());

  /* SOLUTION END */
};
