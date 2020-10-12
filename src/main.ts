import core from '@actions/core'

import {execSync} from 'child_process'

import github from '@actions/github'

const main = async (): Promise<void> => {
  const githubToken = core.getInput('token')
  const covCommand = core.getInput('coverage-command')

  const octokit = github.getOctokit(githubToken)
  const prNumber = github.context.payload.pull_request?.number

  const codeCoverage = execSync(covCommand).toString()

  const commentBody = `<details><summary>Coverage report</summary><p><pre>${codeCoverage}</pre></p></details>`

  try {
    await octokit.issues.createComment({
      ...github.context.repo,
      body: commentBody,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      issue_number: prNumber!
    })
    core.debug('Published report')
  } catch (err) {
    core.setFailed(err.message)
  }
}

;(async () => {
  try {
    await main()
  } catch (err) {
    core.setFailed(err.message)
  }
})()
