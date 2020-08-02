const fill = require('./fill')
const dateFns = require('date-fns')
const isBefore = require('date-fns/isBefore')

const config = {
  auth: {
    username: process.env.AUTH_USERNAME,
    password: process.env.AUTH_PASSWORD
  },
  repoUrl: process.env.REPO_URL,
  author: {
    name: process.env.AUTHOR_NAME,
    email: process.env.AUTHOR_EMAIL
  },
  dir: process.env.DIR,
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
