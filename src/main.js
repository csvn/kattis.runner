var inputSets = require('./input-sets'),
    solution = require('./solution');


inputSets.forEach(function(inputs, i) {
  var duration,
      ix = -1,
      start = Date.now();

  console.log(`\n==============   Input set #${i + 1}   ==============`);
  solution(function() {
    ix++;
    return inputs[ix];
  }, print);
  duration = ((Date.now() - start) / 1000).toPrecision(3);
  console.log(`--------------  Duration ${duration}s  --------------\n`);
});

function print() {
  console.log.apply(console, [].slice.call(arguments));
}
