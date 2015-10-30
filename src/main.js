'use strict';

let runner = require('./runner');

let count = 0;


function log(msg, spaceTop) {
  console.log(`${spaceTop ? '\n' : ''}# ${msg}`);
}

function setLogger(set) {
  count++;
  set.on('init', () => log(`Input set #${count}, running...`, true));
  set.on('print', str => process.stdout.write(str));
  set.on('completed', () => {
    let prefix = set.error ? 'Terminated' : 'Finished';

    log(`${prefix} after ${set.duration.toFixed(3)}s`, set.useNewline());
    if (!set.error && !set.matches()) {
      log(`Failure! Expected output:\n${set.expected}`);
    }
  });
  set.on('error', err => {
    let prefix = set.useNewline() ? '\n' : '',
        suffix = set.useNewline() ? '' : '\n';
    console.error(`\n${prefix}${err.stack}${suffix}`);
  });
}


module.exports = function(cb) {
  count = 0;

  runner.on('set', setLogger);
  runner.once('completed', () => {
    runner.removeListener('set', setLogger);
    cb();
  });

  log('Testing solution');
  runner.emit('run');
};
