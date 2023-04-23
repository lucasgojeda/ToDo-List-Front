/** Libraries */
import { type SetStateAction, type Dispatch, useState } from 'react'
import PropTypes from 'prop-types'

/** Components */
import { Task } from '../Task/Task'
import { AddTaskForm } from '../AddTaskForm/AddTaskForm'

/** Styles */
import './TaskList.css'

/** Interfaces / Types */
import { type Task as TTask } from '../../interfaces/task.interface'
interface Props {
  tasks: TTask[]
  page: number
  setPage: Dispatch<SetStateAction<number>>
  setTasks: Dispatch<SetStateAction<TTask[]>>
}

export const TaskList: React.FC<Props> = ({
  tasks,
  setTasks,
  page,
  setPage,
}) => {
  const [activeTask, setActiveTask] = useState<TTask | null>(null)

  /** Modal */
  const [modalStatus, setModalStatus] = useState<boolean>(false)

  const handlePrevius = () => {
    setPage((p) => p - 1)
  }
  const handleNext = () => {
    setPage((p) => p + 1)
  }
  return (
    <div className="container">
      <div className="table">
        {tasks.map((e) => (
          <Task
            key={e._id}
            _id={e._id}
            title={e.title}
            status={e.status}
            createdAt={new Date(e.createdAt)}
            activeTask={activeTask}
            setActiveTask={setActiveTask}
            setModalStatus={setModalStatus}
            setTasks={setTasks}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination_buttons"
          disabled={page <= 1}
          onClick={handlePrevius}
        >
          Previus
        </button>
        <h3>Page {page}</h3>
        <button
          className="pagination_buttons"
          disabled={tasks.length - 10 < 0}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <AddTaskForm
        modalType="UPDATE"
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        setTasks={setTasks}
        activeTask={activeTask}
      />
    </div>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
}
