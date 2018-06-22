import { getFormattedValue } from '../utils'

test ('should return the right formatted value', () => {
  expect(getFormattedValue('123456.7891')).toBe('123,456.7891')
  // jest的默认环境是jsdom
  // 如果在package.json中制定jest的测试环境为`node`，👇就会报错，没有window
  // console.log(window)
})