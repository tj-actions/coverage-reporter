[![Codacy Badge](https://app.codacy.com/project/badge/Grade/637cb6499b3741f0af66d6e66414be65)](https://app.codacy.com/gh/tj-actions/coverage-badge-js/dashboard?utm_source=gh\&utm_medium=referral\&utm_content=\&utm_campaign=Badge_grade)
[![build-test](https://github.com/tj-actions/coverage-reporter/workflows/build-test/badge.svg)](https://github.com/tj-actions/coverage-reporter/actions?query=workflow%3Abuild-test)
[![Public workflows that use this action.](https://img.shields.io/endpoint?url=https%3A%2F%2Fused-by.vercel.app%2Fapi%2Fgithub-actions%2Fused-by%3Faction%3Dtj-actions%2Fcoverage-reporter%26badge%3Dtrue)](https://github.com/search?o=desc\&q=tj-actions+coverage-reporter+path%3A.github%2Fworkflows+language%3AYAML\&s=\&type=Code)

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
        uses: tj-actions/coverage-reporter@v5.1
        with:
          coverage-command: 'python -m coverage report'
```

[nyc](https://github.com/istanbuljs/nyc)

```yaml
...
    steps:
      - uses: actions/checkout@v3
      - name: Code coverage-reporter
        uses: tj-actions/coverage-reporter@v5.1
        with:
          coverage-command: "nyc --reporter=text mocha --exclude='fixtures' __tests__/*.js"
```

## Inputs

<!-- AUTO-DOC-INPUT:START - Do not remove or modify this section -->

|                                      INPUT                                       |  TYPE  | REQUIRED |         DEFAULT         |                   DESCRIPTION                    |
|----------------------------------------------------------------------------------|--------|----------|-------------------------|--------------------------------------------------|
| <a name="input_coverage-command"></a>[coverage-command](#input_coverage-command) | string |   true   |                         | Specify a coverage command to <br>run the test.  |
|                 <a name="input_token"></a>[token](#input_token)                  | string |   true   | `"${{ github.token }}"` |      GITHUB\_TOKEN or a Repo scoped <br>PAT       |

<!-- AUTO-DOC-INPUT:END -->

*   Free software: [MIT license](LICENSE)

If you feel generous and want to show some extra appreciation:

[![Buy me a coffee][buymeacoffee-shield]][buymeacoffee]

[buymeacoffee]: https://www.buymeacoffee.com/jackton1

[buymeacoffee-shield]: https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png
