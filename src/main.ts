import {execSync} from 'child_process'

import * as github from '@actions/github'

import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    if (core.isDebug()) {
      core.info('Retrieving input values.')
    }
    const githubToken = core.getInput('token')
    const covCommand = core.getInput('coverage-command')

    if (core.isDebug()) {
      core.info('Retrieved input values.')
    }

    const octokit = github.getOctokit(githubToken)
    const prNumber = github.context.payload.pull_request?.number

    if (!prNumber) {
      core.warning(
        'Skipped collecting coverage report no pull request number found.'
      )
      return
    }

    if (core.isDebug()) {
      core.info(`Executing coverage command: ${covCommand}.`)
    }

    const codeCoverage = execSync(covCommand).toString()

    const commentBody = `<details><summary>Coverage report</summary><p><pre>${codeCoverage}</pre></p></details>`

    if (core.isDebug()) {
      core.info(`Commenting on PR.`)
    }

    await octokit.issues.createComment({
      ...github.context.repo,
      body: commentBody,
      issue_number: prNumber
    })
    core.info('Published report')
  } catch (err) {
    core.setFailed(err.message)
  }
}

run()
