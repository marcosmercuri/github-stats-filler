const fill = require('./fill')
const dateFns = require('date-fns')
const isBefore = require('date-fns/isBefore')
const secrets = require('./secrets.json')

const config = {
  auth: {
    username: secrets.AUTH_USERNAME,
    password: secrets.AUTH_PASSWORD
  },
  repoUrl: secrets.REPO_URL,
  author: {
    name: secrets.AUTHOR_NAME,
    email: secrets.AUTHOR_EMAIL
  },
  dir: secrets.DIR,
  maxNumberOfCommits: 80,
  endDate: undefined
}

const fillPastYear = async () => {
  const today = new Date()
  let endDate = dateFns.subYears(today, 1)

  while (isBefore(endDate, today)) {
    await fill({
      ...config,
      endDate
    })
    endDate = dateFns.addWeeks(endDate, 1)
  }

}

module.exports = fillPastYear
