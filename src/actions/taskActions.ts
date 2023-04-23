/** API Instance */
import todoListApi from '../api/todoListApi'

/** Interfaces / types */
import { type Task } from '../interfaces/task.interface'
import { type Filter, type Order } from 'vite-env'

type ReturnLoadingTasksType = Task[] | null
export const startLoadingTasks = async (
  order: Order,
  filter: Filter,
  page: number
): Promise<ReturnLoadingTasksType> => {
  const {
    data: { tasks },
    status,
  } = await todoListApi.get(`/task/${filter}/${order}/${page * 10 - 10}/${10}`)

  if (status === 200) return tasks

  return null
}

type ReturnCreatingTaskType = Task | null
export const startCreatingTask = async (
  title: string
): Promise<ReturnCreatingTaskType> => {
  const {
    data: { task },
    status,
  } = await todoListApi.post('/task', { title })

  if (status === 200) return task

  return null
}

type ReturnUpdatingTaskType = Task | null
export const startUpdatingTask = async (
  title: string,
  activeTask: Task
): Promise<ReturnUpdatingTaskType> => {
  const {
    data: { task },
    status,
  } = await todoListApi.put(`/task/${activeTask._id}`, { title })

  if (status === 200) return task

  return null
}

type ReturnDeletingTaskType = Task | null
export const startDeletingTask = async (
  activeTask: Task
): Promise<ReturnDeletingTaskType> => {
  const {
    data: { task },
    status,
  } = await todoListApi.delete(`/task/${activeTask._id}`)

  if (status === 200) return task

  return null
}

type ReturnCheckingTaskType = Task | null
export const startCheckingTask = async (
  activeTask: Task
): Promise<ReturnCheckingTaskType> => {
  const {
    data: { task },
    status,
  } = await todoListApi.patch(`/task/${activeTask._id}`)

  if (status === 200) return task

  return null
}
