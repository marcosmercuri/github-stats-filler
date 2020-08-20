const fillPastWeek = require('./fill-past-week')
jest.mock('./fill-past-week', () => jest.fn())

const isSameDay = require('date-fns/isSameDay')

const fillPastYear = require('./fill-past-year')

describe('fillPastYear', () => {
  test('fill has been called a year worth of weeks', async () => {
    await fillPastYear()

    expect(fillPastWeek).toBeCalledTimes(53)
  })

  test('fill has been called with different dates', async () => {
    await fillPastYear()

    const fillArgsFirstCall = fillPastWeek.mock.calls[0][0]
    const fillArgsSecondCall = fillPastWeek.mock.calls[1][0]
    expect(isSameDay(fillArgsFirstCall.endDate, fillArgsSecondCall.endDate))
      .toBe(false)
  })
})
