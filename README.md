# Kattis runner

Easily test kattis solutions in node.

* Run solutions in node
* Test solutions with multiple input sets
* Displays duration of each test
* Will auto-run tests when files change

## Setup
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

There are 3 gulp tasks:

* **default** - The other tasks will be executed
* **run** - Will run solution once
* **watch** - Watches files and calls **run** on changes
