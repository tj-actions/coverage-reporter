[![build-test](https://github.com/tj-actions/coverage-reporter/workflows/build-test/badge.svg)](https://github.com/tj-actions/coverage-reporter/actions?query=workflow%3Abuild-test)

coverage-reporter
-----------------
Display Coverage reports on a Pull Request.

Usage
-----

[Coverage.py](https://github.com/nedbat/coveragepy)

```yaml
...
    steps:
      - uses: actions/checkout@v2
      - name: Code coverage-reporter
        uses: tj-actions/coverage-reporter@v2
        with:
          coverage-command: 'python -m coverage report'
```

[nyc](https://github.com/istanbuljs/nyc)

```yaml
...
    steps:
      - uses: actions/checkout@v2
      - name: Code coverage-reporter
        uses: tj-actions/coverage-reporter@v2
        with:
          coverage-command: "nyc --reporter=text mocha --exclude='fixtures' __tests__/*.js"
```

* Free software: [MIT license](LICENSE)

