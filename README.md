# Kattis runner

Basic project to easily test kattis solutions in node.

* Run solutions in node
* Test solutions with multiple input sets
* Verify output against expected output
* Displays duration of each test
* Will auto-run tests when files change

### Requirements
[Git](https://git-scm.com/), [Node v4.0.0 or higher](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/)

### Setup
1. Clone repo with git

    ```
    git clone https://github.com/csvn/kattis.runner.git
    ```

2. Install npm packages

    ```
    npm Install
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

### Working on a solution
There are two files that will need to be edited when working on your solution. `src/io-sets.js` and `src/solution.js`. `io-sets.js` contains groups of inputs, and groups of expected output to check your solution against. `solution.js` contains all code that will be submitted to kattis.

### Notes
Kattis uses a SpiderMonkey engine version (C24.2.0) that is roughly the version that was used in browser Firefox v24. This means that care needs to be taken when using e.g. array methods which may not be present in the engine. This is most easily noticed on es6 features.
