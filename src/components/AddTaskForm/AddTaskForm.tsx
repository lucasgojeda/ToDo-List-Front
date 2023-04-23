/** Libraries */
import { type SetStateAction, type Dispatch, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

/** Actions */
import { startCreatingTask, startUpdatingTask } from '../../actions'

/** Styles */
import './AddTaskForm.css'

/** Interfaces / Types */
import { type Task } from '../../interfaces/task.interface'
type ModalType = 'CREATE' | 'UPDATE'
interface Props {
  modalType: ModalType
  modalStatus: boolean
  setModalStatus: Dispatch<SetStateAction<boolean>>
  setTasks: Dispatch<SetStateAction<Task[]>>
  activeTask?: Task | null
}

export const AddTaskForm: React.FC<Props> = ({
  modalType,
  modalStatus,
  setModalStatus,
  setTasks,
  activeTask,
}) => {
  const [title, setTitle] = useState<string>('')
  const [titleError, setTitleError] = useState<string>('')

  useEffect(() => {
    if (activeTask) {
      setTitle(activeTask.title)
    }
  }, [activeTask])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (title.length < 6) {
      setTitleError('Title should have at least 6 characters')
      return
    } else if (title.length > 30) {
      setTitleError("Title shouldn't have more than 30 characters")
      return
    } else {
      setTitleError('')
    }

    if (modalType === 'CREATE') {
      const data = await startCreatingTask(title)
      if (data) {
        setTasks((tasks) => [data, ...tasks])
      }
    }
    if (modalType === 'UPDATE') {
      if (activeTask) {
        const data = await startUpdatingTask(title, activeTask)
        if (data) {
          setTasks((tasks) =>
            tasks.map((e) =>
              e._id.toString() !== data._id.toString() ? e : data
            )
          )
        }
      }
    }
    handleClose()
  }

  const handleInputChange = (e: any) => {
    e.preventDefault()

    const title = e.target.value

    if (title.length < 6) {
      setTitleError('Title should have at least 6 characters')
    } else if (title.length > 30) {
      setTitleError("Title shouldn't have more than 30 characters")
    } else {
      setTitleError('')
    }

    setTitle(title)
  }

  const handleClose = () => {
    setModalStatus(false)
    setTitle('')
    setTitleError('')
  }

  return (
    <>
      {modalStatus && (
        <div className="container_modal">
          <form className="modal" onSubmit={handleSubmit}>
            <div className="modal-title">
              <h5>{modalType === 'CREATE' ? 'Add Task' : 'Update Task'}</h5>
            </div>
            <div className="modal-input">
              {titleError && <p>{titleError}</p>}
              <input
                type="text"
                name="title"
                value={title}
                minLength={6}
                maxLength={30}
                min={6}
                max={30}
                onChange={handleInputChange}
              />
            </div>
            <div className="modal-buttons">
              <button type="submit" className="modal-button">
                Save
              </button>
              <button className="modal-close-button" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </form>
          <div className="modal-backdrop"></div>
        </div>
      )}
    </>
  )
}

AddTaskForm.propTypes = {
  modalType: PropTypes.oneOf<ModalType>(['CREATE', 'UPDATE']).isRequired,
  modalStatus: PropTypes.bool.isRequired,
  setModalStatus: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
  activeTask: PropTypes.oneOfType([
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
    }),
    PropTypes.oneOf([null]),
  ]),
}
