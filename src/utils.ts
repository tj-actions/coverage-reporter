import * as core from '@actions/core';
import {GitHub} from '@actions/github/lib/utils';

export const HEADER = "[//]: # (coverage-start)";


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
  body: string,
  previousBody?: string
): Promise<void> {
  if (!body && !previousBody)
    return core.warning('Comment body cannot be blank')

  await octokit.rest.issues.updateComment({
    ...repo,
    comment_id,
    body: previousBody
      ? `${previousBody}\n${body}`
      : `${body}\n${HEADER}`
  })
};


export async function createComment(
  octokit: InstanceType<typeof GitHub>,
  repo: {
    owner: string
    repo: string
  },
  issue_number: number,
  body: string,
  previousBody?: string
): Promise<void> {
  if (!body && !previousBody)
    return core.warning('Comment body cannot be blank')

  await octokit.rest.issues.createComment({
    ...repo,
    issue_number,
    body: previousBody
      ? `${previousBody}\n${body}`
      : `${body}\n${HEADER}`
  })
}