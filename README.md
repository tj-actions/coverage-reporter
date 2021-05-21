[![build-test](https://github.com/tj-actions/coverage-reporter/workflows/build-test/badge.svg)](https://github.com/tj-actions/coverage-reporter/actions?query=workflow%3Abuild-test) [![Total alerts](https://img.shields.io/lgtm/alerts/g/tj-actions/coverage-reporter.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/tj-actions/coverage-reporter/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/tj-actions/coverage-reporter.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/tj-actions/coverage-reporter/context:javascript) <a href="https://github.com/search?q=tj-actions+coverage-reporter+path%3A.github%2Fworkflows+language%3AYAML&type=code" target="_blank" title="Public workflows that use this action."><img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fapi-tj-actions.vercel.app%2Fapi%2Fgithub-actions%2Fused-by%3Faction%3Dtj-actions%2Fcoverage-reporter%26badge%3Dtrue" alt="Public workflows that use this action."></a>

coverage-reporter
-----------------
Display Coverage reports on a Pull Request.

![](sample.png)

Usage
-----

[Coverage.py](https://github.com/nedbat/coveragepy)

```yaml
...
    steps:
      - uses: actions/checkout@v3
      - name: Code coverage-reporter
        uses: tj-actions/coverage-reporter@v3
        with:
          coverage-command: 'python -m coverage report'
```

[nyc](https://github.com/istanbuljs/nyc)

```yaml
...
    steps:
      - uses: actions/checkout@v3
      - name: Code coverage-reporter
        uses: tj-actions/coverage-reporter@v3
        with:
          coverage-command: "nyc --reporter=text mocha --exclude='fixtures' __tests__/*.js"
```

* Free software: [MIT license](LICENSE)

