'use strict';

var ioSets = require('./io-sets'),
    solution = require('./solution');

console.log(' # Testing solution');
ioSets.input.forEach(function(inputs, i) {
  var duration,
      ix = -1,
      result = '',
      addNewline = false,
      start = Date.now(),
      output = ioSets.output[i];

  console.log(`\n # Input set #${i + 1}, running...`);

  try {
    solution(readline, print, putstr);
    logEnd();

    try {
      if (compareResult()) {
        log(' # Success!');
      }
    } catch (e) {
      log(' # Failure!');
      log(`\n # Did not match expected output: \n${output}`);
    }

  } catch (e) {
    log(`\n${e.stack}`);
    logEnd(true);
  }

  log('\n ===========================');


  function log(msg) {
    console.log(`${addNewline ? '\n' : ''}${msg}`);
    addNewline = false;
  }

  function logEnd(terminated) {
    var prefix = terminated ? '\n # Terminated' : ' # Completed';
    duration = ((Date.now() - start) / 1000).toFixed(3);
    log(`${prefix} after ${duration}s`);
  }

  function readline() {
    ix++;
    return inputs[ix];
  }

  function print(str) {
    result += `${str}\n`;
    addNewline = false;
    console.log(str);
  }

  function putstr(str) {
    result += str;
    addNewline = true;
    process.stdout.write(str);
  }

  function compareResult() {
    if (typeof output !== 'string') {
      return false;
    }

    result = result.replace(/\n$/, '');
    if (output !== result) {
      throw new Error();
    }

    return true;
  }

});
