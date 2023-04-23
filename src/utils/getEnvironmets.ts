/** Types */
import { type EnvironmentVariables } from '../vite-env'

export const getEnvironmets = (): EnvironmentVariables => {
  // import.meta.env;

  return {
    VITE_REACT_APP_API_URL: import.meta.env.VITE_REACT_APP_API_URL,
  }
}
