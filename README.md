[![Codacy Badge](https://api.codacy.com/project/badge/Grade/aacd7350c4bc4eadae03e50c5f9d15ad)](https://app.codacy.com/gh/tj-actions/coverage-reporter?utm_source=github.com\&utm_medium=referral\&utm_content=tj-actions/coverage-reporter\&utm_campaign=Badge_Grade_Settings)
[![build-test](https://github.com/tj-actions/coverage-reporter/workflows/build-test/badge.svg)](https://github.com/tj-actions/coverage-reporter/actions?query=workflow%3Abuild-test) [![Total alerts](https://img.shields.io/lgtm/alerts/g/tj-actions/coverage-reporter.svg?logo=lgtm\&logoWidth=18)](https://lgtm.com/projects/g/tj-actions/coverage-reporter/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/tj-actions/coverage-reporter.svg?logo=lgtm\&logoWidth=18)](https://lgtm.com/projects/g/tj-actions/coverage-reporter/context:javascript) [![Public workflows that use this action.](https://img.shields.io/endpoint?url=https%3A%2F%2Fapi-tj-actions1.vercel.app%2Fapi%2Fgithub-actions%2Fused-by%3Faction%3Dtj-actions%2Fcoverage-reporter%26badge%3Dtrue)](https://github.com/search?o=desc\&q=tj-actions+coverage-reporter+path%3A.github%2Fworkflows+language%3AYAML\&s=\&type=Code)

## coverage-reporter

Display Coverage reports on a Pull Request.

![sample](https://user-images.githubusercontent.com/17484350/134744528-78d9b6bf-017d-42e3-9dc5-97a5fe47b30b.png)

## Usage

[coverage.py](https://github.com/nedbat/coveragepy)

```yaml
...
    steps:
      - uses: actions/checkout@v3
      - name: Code coverage-reporter
        uses: tj-actions/coverage-reporter@v5
        with:
          coverage-command: 'python -m coverage report'
```

[nyc](https://github.com/istanbuljs/nyc)

```yaml
...
    steps:
      - uses: actions/checkout@v3
      - name: Code coverage-reporter
        uses: tj-actions/coverage-reporter@v5
        with:
          coverage-command: "nyc --reporter=text mocha --exclude='fixtures' __tests__/*.js"
```

## Inputs

<!-- AUTO-DOC-INPUT:START - Do not remove or modify this section -->

|      INPUT       |  TYPE  | REQUIRED |        DEFAULT        |                  DESCRIPTION                   |
|------------------|--------|----------|-----------------------|------------------------------------------------|
| coverage-command | string | true     |                       | Specify a coverage command to run<br>the test. |
| token            | string | true     | `${{ github.token }}` | GITHUB_TOKEN or a Repo scoped PAT<br>          |

<!-- AUTO-DOC-INPUT:END -->

*   Free software: [MIT license](LICENSE)

If you feel generous and want to show some extra appreciation:

[![Buy me a coffee][buymeacoffee-shield]][buymeacoffee]

[buymeacoffee]: https://www.buymeacoffee.com/jackton1

[buymeacoffee-shield]: https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png
