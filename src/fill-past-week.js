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

const fillPastWeek = async config => {
  const onAuth = () => config.auth

  await git.clone({fs, http, dir: config.dir, url: config.repoUrl, singleBranch: true, onAuth})

  const numberOfCommits = randomInteger(config.maxNumberOfCommits)
  const commitDateInSeconds = getCommitDateInSeconds(config.endDate)

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

module.exports = fillPastWeek
