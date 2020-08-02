const fill = require('./fill')
const git = require('isomorphic-git')
const fromUnixTime = require('date-fns/fromUnixTime')
const dateFns = require('date-fns')
const isSameDay = require('date-fns/isSameDay')

const mockMathRandom = mockNumber => {
  const mockMath = Object.create(global.Math)
  mockMath.random = () => mockNumber
  global.Math = mockMath
}

const baseConfig = {
  auth: {
    username: 'username',
    password: 'pass'
  },
  repoUrl: 'https://github.com/user/github-stats-filler.git',
  author: {
    name: 'User Name',
    email: 'username@gmail.com'
  },
  dir: '/var/folders/temp/github-stats-filler',
  maxNumberOfCommits: 80
}

describe('fill', () => {
  beforeEach(() => {
    git.clone.mockClear()
    git.commit.mockClear()
    git.push.mockClear()
  })

  test('should call clone', async () => {
    const result = await fill(baseConfig)

    expect(result).toBeTruthy()

    expect(git.clone).toHaveBeenCalledTimes(1)

    const cloneArgs = git.clone.mock.calls[0][0]
    expect(cloneArgs.dir).toBe(baseConfig.dir)
    expect(cloneArgs.url).toBe(baseConfig.repoUrl)
    expect(cloneArgs.singleBranch).toBe(true)

    const onAuthResponse = cloneArgs.onAuth()
    expect(onAuthResponse.username).toBe(baseConfig.auth.username)
    expect(onAuthResponse.password).toBe(baseConfig.auth.password)
  })

  describe('should call commit', () => {
    const maxNumberOfCommits = 80

    test('twice', async () => {
      mockMathRandom(2/maxNumberOfCommits)

      const result = await fill(baseConfig)

      expect(result).toBeTruthy()

      expect(git.commit).toHaveBeenCalledTimes(2)
    })

    test('once with', async () => {
      mockMathRandom(1/maxNumberOfCommits)

      const result = await fill(baseConfig)

      expect(result).toBeTruthy()

      expect(git.commit).toHaveBeenCalledTimes(1)
      const commitArgs = git.commit.mock.calls[0][0]
      expect(commitArgs.dir).toBe(baseConfig.dir)
      expect(commitArgs.author.name).toBe(baseConfig.author.name)
      expect(commitArgs.author.email).toBe(baseConfig.author.email)
      expect(commitArgs.message).toBe('A lot of work')
    })

    test('with specific commit date based on config date', async () => {
      const endDate = new Date(2019, 5, 5)

      const config = {
        ...baseConfig,
        endDate
      }
      const mockRandomForPreviousDay = 1/7
      mockMathRandom(mockRandomForPreviousDay)

      const result = await fill(config)

      expect(result).toBeTruthy()

      const commitArgs = git.commit.mock.calls[0][0]
      const passedDate = fromUnixTime(commitArgs.author.timestamp)

      const previousDay = dateFns.subDays(endDate, 1)

      expect(isSameDay(passedDate, previousDay)).toBeTruthy()
    })
  })

  test('should call push', async () => {
    const result = await fill(baseConfig)

    expect(result).toBeTruthy()

    expect(git.push).toHaveBeenCalledTimes(1)

    const pushArgs = git.push.mock.calls[0][0]
    expect(pushArgs.dir).toBe(baseConfig.dir)

    const onAuthResponse = pushArgs.onAuth()
    expect(onAuthResponse.username).toBe(baseConfig.auth.username)
    expect(onAuthResponse.password).toBe(baseConfig.auth.password)
  })
})

