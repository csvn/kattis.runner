'use strict';

let setTpl = require('./set.jade'),
    runner = require('./runner');

let index = 0,
    content = document.querySelector('#content');


runner.on('set', set => {
  let div = document.createElement('div');

  index += 1;
  set.index = index;
  content.appendChild(div);

  set.on('error', err => console.error(err.stack || err));
  set.on('completed', () => render(div, set));
});


function render(el, set) {
  requestAnimationFrame(() => {
    el.innerHTML = setTpl({ set });
    el.querySelector('button')
      .addEventListener('click', () => {
        el.querySelector('.input').classList.toggle('show');
      });

    requestAnimationFrame(() => {
      el.querySelector('.panel').classList.add('in');
    });
  });
}

runner.emit('run');
