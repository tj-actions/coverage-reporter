import * as core from '@actions/core'
import * as github from '@actions/github'
import {execSync} from 'child_process'

import {createComment, getPreviousComment, updateComment} from './utils'

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

    const commentBody = `<details><summary>Coverage report</summary>\n\n\`\`\`bash script \n ${codeCoverage} \n\`\`\` \n</details>`

    if (core.isDebug()) {
      core.info('Creating a PR comment.')
    }

    const repo = {...github.context.repo}
    const previousComment = await getPreviousComment(octokit, repo, prNumber)

    if (typeof previousComment !== 'undefined') {
      await updateComment(octokit, repo, previousComment.id, commentBody)
    } else {
      await createComment(octokit, repo, prNumber, commentBody)
    }
    core.info('Published report')
  } catch (err) {
    core.setFailed((err as Error).message)
  }
}

run()
