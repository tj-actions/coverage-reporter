import * as core from '@actions/core';
import {GitHub} from '@actions/github/lib/utils';

export const HEADER = "<!-- Coverage report -->";


export async function getPreviousComment(
  octokit: InstanceType<typeof GitHub>,
  repo: {
    owner: string
    repo: string
  },
  issue_number: number,
  header: string
): Promise<{body?: string; id: number} | undefined> {

  const {data: comments} = await octokit.issues.listComments({
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
  body: string,
  header: string,
  previousBody?: string
): Promise<void> {
  if (!body && !previousBody)
    return core.warning('Comment body cannot be blank')

  await octokit.issues.updateComment({
    ...repo,
    comment_id,
    body: previousBody
      ? `${previousBody}\n${body}`
      : `${body}\n${headerComment(header)}`
  })
}


export async function createComment(
  octokit: InstanceType<typeof GitHub>,
  repo: {
    owner: string
    repo: string
  },
  issue_number: number,
  body: string,
  header: string,
  previousBody?: string
): Promise<void> {
  if (!body && !previousBody)
    return core.warning('Comment body cannot be blank')

  await octokit.issues.createComment({
    ...repo,
    issue_number,
    body: previousBody
      ? `${previousBody}\n${body}`
      : `${body}\n${headerComment(header)}`
  })
}
