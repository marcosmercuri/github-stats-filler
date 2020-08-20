const fillPastWeek = require('./src/fill-past-week')

exports.handler = async (event, context) => {
  const today = new Date()
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
    endDate: today
  }
  return await fillPastWeek(config)
}
