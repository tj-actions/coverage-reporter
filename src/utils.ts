import * as core from '@actions/core'
import {GitHub} from '@actions/github/lib/utils'
// eslint-disable-next-line import/named
import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods'

export const HEADER = '<!-- Coverage Report -->'

export async function getPreviousComment(
  octokit: InstanceType<typeof GitHub>,
  repo: {
    owner: string
    repo: string
  },
  issue_number: number
): Promise<{body?: string; id: number} | undefined> {
  const {data: comments} = await octokit.rest.issues.listComments({
    ...repo,
    issue_number
  })
  return comments.find(comment => comment.body?.includes(HEADER))
}

export async function updateComment(
  octokit: InstanceType<typeof GitHub>,
  repo: {
    owner: string
    repo: string
  },
  comment_id: number,
  body: string
): Promise<
  RestEndpointMethodTypes['issues']['updateComment']['response'] | void
> {
  if (!body) return core.warning('Comment body cannot be blank')

  return await octokit.rest.issues.updateComment({
    ...repo,
    comment_id,
    body: `${body}\n${HEADER}`
  })
}

export async function createComment(
  octokit: InstanceType<typeof GitHub>,
  repo: {
    owner: string
    repo: string
  },
  issue_number: number,
  body: string
): Promise<
  RestEndpointMethodTypes['issues']['createComment']['response'] | void
> {
  if (!body) {
    const message = 'Comment body cannot be blank'
    return core.warning(message)
  }

  return await octokit.rest.issues.createComment({
    ...repo,
    issue_number,
    body: `${body}\n${HEADER}`
  })
}
