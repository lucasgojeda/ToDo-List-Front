/** Types */
import { type MongoId } from 'vite-env'

export interface Task {
  _id: MongoId
  title: string
  status: boolean
  createdAt: Date
}
