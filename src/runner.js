'use strict';

const ioSetsPath = '../solution/io-sets',
      solutionPath = '../solution/solution';

let Set = require('./set'),
    EventEmitter = require('events');


let runner = new EventEmitter();

runner.on('run', () => {
  delete require.cache[require.resolve(ioSetsPath)];
  delete require.cache[require.resolve(solutionPath)];

  let sets = [];
  let ioSets = require(ioSetsPath);

  ioSets.input.forEach(function(inputs, i) {
    let readIndex = -1,
        set = new Set(inputs, ioSets.output[i]);

    sets.push(set);
    runner.emit('set', set);

    try {
      set.emit('init');
      require(solutionPath)(readline, print, putstr);
      set.emit('completed');
    } catch (e) {
      set.emit('error', e);
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

  });

  runner.emit('completed', sets);
});

module.exports = runner;
