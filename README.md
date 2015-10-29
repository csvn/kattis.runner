# Kattis runner

Easily test kattis solutions in node or browser.

* Run solutions in node/browser
* Test solutions with multiple input sets
* Verify output against expected output
* Displays duration of each test
* Will auto-run tests when files change

----------------------

1. [Setup](#setup)
2. [Solution](#solution)
3. [Notes](#notes)


## Setup

### Requirements
[Git](https://git-scm.com/), [Node v4.0.0 or higher](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/)

### Environment
1. Clone repo with git

    ```
    git clone https://github.com/csvn/kattis.runner.git
    ```

2. Install npm packages

    ```
    npm install
    ```

3. Run node, optionally with gulp

    ```
    gulp run
    ```

4. Profit! (but probably not...)

### Gulp
There are 3 gulp tasks:

* **default** - The other tasks will be executed
* **run** - Will run solution once
* **watch** - Watches files and calls **run** on changes


## Solution

#### `solution.js`
Write all your solution code in `solution/solution.js`. When you have your gulp task up and running, a file that can be submitted directly to kattis will be generated and placed in `solution/submission.js`.

#### `io-sets.js`
`solution/io-sets.js` contains groups of inputs, and groups of expected output to check your solution against. Set output to a non-string to not compare the result with the expected output.

### Tips
* Write your solution in es5 friendly code (see notes)
* Use default gulp task, and submit `submission.js` when you're satisfied


## Notes
Kattis uses a SpiderMonkey engine version (C24.2.0) that is roughly the version that was used in browser Firefox v24. This means that care needs to be taken when using e.g. array methods which may not be present in the engine. This is most easily noticed on es6 features.
