// If you have environment variables and it still doesn't support import.meta.env
// yarn add -D dotenv
require('dotenv').config({
  path: '.env.test',
})
// Environment variables mock
// eslint-disable-next-line no-undef
jest.mock('./src/utils/getEnvironmets', () => ({
  getEnvironmets: () => ({ ...process.env }),
}))
