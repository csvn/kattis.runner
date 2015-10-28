'use strict';

let Set = require('./set'),
    EventEmitter = require('events'),
    ioSets = require('../solution/io-sets'),
    solution = require('../solution/solution');


let runner = new EventEmitter();

runner.on('run', () => {
  ioSets.input.forEach(function(inputs, i) {
    let readIndex = -1,
        set = new Set(inputs, ioSets.output[i]);

    runner.emit('set', set);

    try {
      set.emit('init');
      solution(readline, print, putstr);
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
});

module.exports = runner;
