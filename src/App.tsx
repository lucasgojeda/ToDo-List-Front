/** Libraries */
import { useEffect, useState } from 'react'

/** Components */
import { TaskList } from './components/TaskList/TaskList'
import { AddTaskForm } from './components/AddTaskForm/AddTaskForm'

/** Custom hooks */
import { startLoadingTasks } from './actions'

/** Types */
import { type Task } from './interfaces/task.interface'
import { type Filter, type Order } from 'vite-env'

/** Styles */
import './App.css'

export const App = (): JSX.Element => {
  /** Tasks state */
  const [tasks, setTasks] = useState<Task[]>([])

  /** Modal */
  const [modalStatus, setModalStatus] = useState<boolean>(false)

  /** Pagination */
  const [page, setPage] = useState<number>(1)

  /** Filter and order tasks */
  const [order, setOrder] = useState<Order>('asc')
  const [filter, setFilter] = useState<Filter>('all')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'order') {
      setOrder(event.target.value as Order)
    }

    if (event.target.name === 'filter') {
      setPage(1)
      setFilter(event.target.value as Filter)
    }
  }

  /** Load tasks management */
  const handleLoadTasks = async () => {
    const data = await startLoadingTasks(order, filter, page)
    if (data) setTasks([...data])
  }

  useEffect(() => {
    handleLoadTasks()
  }, [order, filter, page])

  const handleModal = () => {
    if (modalStatus) {
      setModalStatus(false)
    } else {
      setModalStatus(true)
    }
  }

  return (
    <main className="main">
      <h1>Todo List</h1>
      <div className="container_movilBotton">
        <button className="newtask_button" onClick={handleModal}>
          New task
        </button>
      </div>
      <div className="container_button">
        <div className="container_items">
          <div className="container_item">
            <div className="title">
              <p>Order</p>
            </div>
            <div className="options">
              <div className="radio_items">
                <label htmlFor="opcion1">asc</label>
                <input
                  defaultChecked
                  type="radio"
                  name="order"
                  value="asc"
                  onChange={handleChange}
                />
              </div>
              <div className="radio_items">
                <label htmlFor="opcion2">desc</label>
                <input
                  type="radio"
                  name="order"
                  value="desc"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="container_item">
            <div className="title">
              <p>filter</p>
            </div>
            <div className="options">
              <div className="radio_items">
                <label htmlFor="opcion1">all</label>
                <input
                  defaultChecked
                  type="radio"
                  name="filter"
                  value="all"
                  onChange={handleChange}
                />
              </div>
              <div className="radio_items">
                <label htmlFor="opcion2">completed</label>
                <input
                  type="radio"
                  name="filter"
                  value="completed"
                  onChange={handleChange}
                />
              </div>
              <div className="radio_items">
                <label htmlFor="opcion3">uncompleted</label>
                <input
                  type="radio"
                  name="filter"
                  value="uncompleted"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="newtask_button" onClick={handleModal}>
          New task
        </button>
      </div>
      <AddTaskForm
        modalType="CREATE"
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        setTasks={setTasks}
      />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        page={page}
        setPage={setPage}
      />
    </main>
  )
}
