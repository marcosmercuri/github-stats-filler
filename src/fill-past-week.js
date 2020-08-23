const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')
const dateFns = require('date-fns')
const fs = require('fs')

const randomInteger = maxNumber => Math.floor(Math.random() * maxNumber)

const getCommitDateInSeconds = date => {
  const daysInAWeek = 7
  const daysToSubtract = randomInteger(daysInAWeek)
  const commitDate = dateFns.subDays(date, daysToSubtract)
  return Math.floor(commitDate / 1000)
}

const commit = (config, commitDateInSeconds) => () => {
  const commitParams = {
    fs,
    dir: config.dir,
    author: {
      ...config.author,
      timestamp: commitDateInSeconds
    },
    message: 'A lot of work'
  }
  return git.commit(commitParams)
}

const createCommits = (config, numberOfCommits) => {
  const commitDateInSeconds = getCommitDateInSeconds(config.endDate)

  return Array.apply(null, { length: numberOfCommits })
    .map(commit(config, commitDateInSeconds))
}

const fillPastWeek = async config => {
  const onAuth = () => config.auth

  await git.clone({fs, http, dir: config.dir, url: config.repoUrl, singleBranch: true, onAuth})

  const numberOfCommits = randomInteger(config.maxNumberOfCommits)

  const commitsPromises = createCommits(config, numberOfCommits)

  await Promise.all(commitsPromises)

  await git.push({fs, http, dir: config.dir, onAuth})

  return true
}

module.exports = fillPastWeek
