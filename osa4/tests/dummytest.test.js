const listHelper = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/utils/list_helper.js')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
