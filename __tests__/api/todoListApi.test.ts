/** Api */
import todoListApi from '../../src/api/todoListApi'

describe('Testing on todoListApi', () => {
  test('It should have the default settings', () => {
    expect(todoListApi.defaults.baseURL).toBe(
      process.env.VITE_REACT_APP_API_URL
    )
  })
})
