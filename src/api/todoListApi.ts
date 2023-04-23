/** Libraries */
import axios, { type AxiosHeaders, type AxiosInstance } from 'axios'

/** Helpers */
import { getEnvironmets } from '../utils'

const { VITE_REACT_APP_API_URL } = getEnvironmets()

const todoListApi: AxiosInstance = axios.create({
  baseURL: VITE_REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
  },
})

todoListApi.interceptors.request.use((config) => {
  ;(config.headers as AxiosHeaders).set(
    'x-token',
    localStorage.getItem('token')
  )

  return config
})

export default todoListApi
