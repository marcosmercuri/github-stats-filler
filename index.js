const fill = require('./src/fill')

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
  endDate: new Date(process.env.END_DATE_YEAR, process.env.END_DATE_MONTH-1, process.env.END_DATE_DAY)
}

fill(config)
