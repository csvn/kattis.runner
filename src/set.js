'use strict';

let EventEmitter = require('events');

module.exports = class Set {

  constructor(input, expected) {
    this.input = input;
    this.output = '';
    this.expected = expected;
    this.emitter = new EventEmitter();

    this.emitter.on('init', () => this.start = Date.now());
    this.emitter.on('print', str => this.output += str);
    this.emitter.on('error', () => this.finished());
    this.emitter.on('completed', () => this.finished());
  }

  matches() {
    if (typeof this.expected !== 'string') {
      return true;
    }

    return this.expected === this.output.replace(/\n$/, '');
  }

  finished() {
    this.duration = (Date.now() - this.start) / 1000;
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
