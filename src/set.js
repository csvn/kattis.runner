'use strict';

let EventEmitter = require('events');

module.exports = class Set {

  constructor(input, expected) {
    this.input = input;
    this.output = '';
    this.expected = expected;
    this.emitter = new EventEmitter();

    this.on('init', () => this.start = Date.now());
    this.on('print', str => this.output += str);
    this.on('error', err => this.error = err);
    this.on('completed', () => {
      this.duration = (Date.now() - this.start) / 1000;
    });
  }

  matches() {
    if (typeof this.expected !== 'string') {
      return true;
    }

    return this.expected === this.output.replace(/\n$/, '');
  }

  useNewline() {
    return !/\n$/.test(this.output);
  }

  on(ev, fn) {
    this.emitter.on(ev, fn);
  }

  emit() {
    this.emitter.emit.apply(this.emitter, [].slice.call(arguments));
  }

};
