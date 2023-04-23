/** Libraries */
import { type SetStateAction, type Dispatch } from 'react'
import PropTypes from 'prop-types'

/** Actions */
import { startDeletingTask, startCheckingTask } from '../../actions'

/** Styles */
import './Task.css'
import 'material-icons/iconfont/material-icons.css'

/** Interfaces /Types */
import { type Task as TTask } from '../../interfaces/task.interface'
interface Props {
  _id: string
  title: string
  status: boolean
  createdAt: Date
  activeTask: TTask | null
  setActiveTask: Dispatch<SetStateAction<TTask | null>>
  setModalStatus: Dispatch<SetStateAction<boolean>>
  setTasks: Dispatch<SetStateAction<TTask[]>>
}

export const Task: React.FC<Props> = ({
  _id,
  title,
  status,
  createdAt,
  activeTask,
  setActiveTask,
  setModalStatus,
  setTasks,
}) => {
  const handleOnMouseOver = () => {
    setActiveTask({
      _id,
      title,
      status,
      createdAt,
    })
  }

  const handleDelete = async () => {
    if (activeTask) {
      const data = await startDeletingTask(activeTask)

      if (data) {
        setTasks((tasks) => tasks.filter((e) => e._id !== data._id && e))
      }
    }
  }

  const handleCheck = async () => {
    if (activeTask) {
      const data = await startCheckingTask(activeTask)

      if (data) {
        setTasks((tasks) => tasks.map((e) => (e._id !== data._id ? e : data)))
      }
    }
  }

  const handleUpdateTask = () => {
    setModalStatus(true)
  }

  return (
    <div
      className="container_Task"
      onFocus={handleOnMouseOver}
      onMouseOver={handleOnMouseOver}
    >
      <div>
        <p>{title}</p>
      </div>
      <div className="checkbox-container">
        {status ? (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <span className="material-icons" onClick={handleCheck}>
            check_box_outline_blank
          </span>
        ) : (
          <span className="material-icons">check_box</span>
        )}
      </div>

      <div
        className="items-container"
        style={{
          visibility: _id === activeTask?._id ? 'visible' : 'hidden',
        }}
      >
        {status && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <span className="material-icons edit" onClick={handleUpdateTask}>
            mode_edit
          </span>
        )}
        {
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <span className="material-icons delete" onClick={handleDelete}>
            delete
          </span>
        }
      </div>
    </div>
  )
}

Task.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  activeTask: PropTypes.oneOfType([
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
    }),
    PropTypes.oneOf([null]),
  ]),
  setActiveTask: PropTypes.func.isRequired,
  setModalStatus: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
}

// Login.propTypes ={
//   errors: PropTypes.string,
// }

Task.defaultProps = {
  activeTask: null,
}
