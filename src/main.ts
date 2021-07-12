import {execSync} from 'child_process'

import * as github from '@actions/github'

import * as core from '@actions/core'

import {getPreviousComment, updateComment, createComment} from './utils'

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

    const context = github.context
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

    const baseSha = context.payload.pull_request?.base.sha
    const beforeSha = context.payload.before
    const afterSha = context.payload.after

    core.info(`Base SHA: ${baseSha}`)
    core.info(`before SHA: ${beforeSha}`)
    core.info(`after SHA: ${afterSha}`)

    //     const response = octokit.rest.repos.compareCommitsWithBasehead({
    //       repo,
    //       basehead,
    //     });

    core.info('Published report')
  } catch (err) {
    core.setFailed(err.message)
  }
}

run()
