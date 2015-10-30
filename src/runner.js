'use strict';

let Set = require('./set'),
    EventEmitter = require('events');


let runner = new EventEmitter();

runner.on('run', () => {
  if (require.resolve) {
    delete require.cache[require.resolve('../solution/io-sets')];
    delete require.cache[require.resolve('../solution/solution')];
  }

  let sets = [];
  let ioSets = require('../solution/io-sets'),
      solution = require('../solution/solution');

  recursiveRun(0);

  function recursiveRun(index) {
    let inputs = ioSets.input[index],
        output = ioSets.output[index];

    setTimeout(function() {
      let readIndex = -1,
          set = new Set(inputs, output);

      sets.push(set);
      runner.emit('set', set);

      try {
        set.emit('init');
        solution(readline, print, putstr);
      } catch (e) {
        set.emit('error', e);
      } finally {
        set.emit('completed');
      }

      let next = index + 1;
      if (next < ioSets.input.length) {
        recursiveRun(next);
      } else {
        runner.emit('completed', sets);
      }


      function readline() {
        readIndex++;
        return inputs[readIndex];
      }

      function print(str) {
        set.emit('print', `${str}\n`);
      }

      function putstr(str) {
        set.emit('print', str);
      }
    }, 20);
  }

});

module.exports = runner;
