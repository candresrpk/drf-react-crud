import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api'
import {useNavigate, useParams} from 'react-router-dom'

function TaskFormPage() {

  const {register, handleSubmit,
    formState: {errors}, setValue } = useForm()

  const navigate = useNavigate()
  const params = useParams()

  const submitData = handleSubmit(async data => {
    if (params.id) {
      await updateTask(params.id, data)
    } else {
      await createTask(data)
    }
    navigate("/tasks")
  })

  useEffect(() => {
    async function loadTask() {
      if (params.id){
        const res = await getTask(params.id)

        setValue('title', res.data.title)
        setValue('description', res.data.description)

      }

    }

    loadTask()
  }, [])

  return (
    <div className='container'>
      <form onSubmit={submitData}>
        <div className="form-group">
          <label htmlFor="title">Titulo </label>
          <input type="text" name="title" id="title" placeholder='Limpiar / Clean' className='form-control'
          {...register("title", {required: true}) }
          />

          {errors.title && <span>The title is required</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">description</label>
          <textarea name="description" id="description" cols="30" rows="10" placeholder='Lavar la loza / Clean the dishes ' className='form-control'
            {...register("description", {required: true}) }
          ></textarea>

          {errors.description && <span>The description is required</span>}

        </div>

        <button>Save</button>
      </form>


      {
        params.id && (
          <button onClick={ async () => {
            const acceptar = window.confirm('You sure to delete this task?')

            if(acceptar){
              await deleteTask(params.id)
              navigate("/tasks")
            }
          }}>
            Delete
          </button>
        )
      }
      
    </div>
  )
}

export default TaskFormPage