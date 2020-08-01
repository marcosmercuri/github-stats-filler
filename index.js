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
  maxNumberOfCommits: 80
}

fill(config)
