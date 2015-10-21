# Kattis runner

Basic project to easily test kattis solutions in node.

* Run solutions in node
* Test solutions with multiple input sets
* Displays duration of each test
* Will auto-run tests when files change

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
 
### Notes
Kattis uses a SpiderMonkey engine version (C24.2.0) that is roughly the version that was used in browser Firefox v24. This means that care needs to be taken when using e.g. array methods which may not be present in the engine. This is most easily noticed on es6 features.
