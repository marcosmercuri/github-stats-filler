const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')
const dateFns = require('date-fns')
const fs = require('fs')

const getCommitDateInSeconds = () => {
  const today = new Date()
  const daysToSubtract = Math.floor(Math.random() * 7)
  const commitDate = dateFns.subDays(today, daysToSubtract)
  return Math.floor(commitDate / 1000)
}

const fill = async config => {
  const onAuth = () => config.auth

  await git.clone({fs, http, dir: config.dir, url: config.repoUrl, singleBranch: true, onAuth})

  const numberOfCommits = Math.floor(Math.random() * config.maxNumberOfCommits)
  const commitDateInSeconds = getCommitDateInSeconds()

  const commitsPromises = []
  for (let i = 0; i < numberOfCommits; i++) {
    commitsPromises.push(git.commit({
      fs,
      dir: config.dir,
      author: {
        ...config.author,
        timestamp: commitDateInSeconds
      },
      message: 'A lot of work'
    }))
  }
  await Promise.all(commitsPromises)

  await git.push({fs, http, dir: config.dir, onAuth})

  return true
}

module.exports = fill
