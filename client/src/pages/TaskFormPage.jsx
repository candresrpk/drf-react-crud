import { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api'
import {useNavigate, useParams} from 'react-router-dom'
import { toast } from 'react-hot-toast'

function TaskFormPage() {

  const {register, handleSubmit,
    formState: {errors}, setValue } = useForm()

  const navigate = useNavigate()
  const params = useParams()

  const submitData = handleSubmit(async data => {
    if (params.id) {
      await updateTask(params.id, data)
      toast.success('Task succesfully updated', {
        style: {
          background: "#101010",
          color: "#fff"
        }
      })
    } else {
      await createTask(data)
      toast.success('Task succesfully created', {
        style: {
          background: "#101010",
          color: "#fff"
        }
      })
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
    <div className='max-w-xl mx-auto'>
      <form onSubmit={submitData}>
          <input type="text" name="title" id="title" placeholder='Limpiar / Clean' className='bg-zinc-700 rounded-lg block w-full mb-3'
          {...register("title", {required: true}) }
          />

          {errors.title && <span>The title is required</span>}
        
          <textarea name="description" id="description" cols="30" rows="10" placeholder='Lavar la loza / Clean the dishes ' className='bg-zinc-700 rounded-lg block w-full mb-3'
            {...register("description", {required: true}) }
          ></textarea>

          {errors.description && <span>The description is required</span>}


        <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Save</button>
      </form>


      {
        params.id && (
          <div className="flex justify-end">
            <button className='bg-red-500 p-3 rounded-lg w-48 mt-3 ' onClick={ async () => {
              const acceptar = window.confirm('You sure to delete this task?')

                if(acceptar){
                  await deleteTask(params.id)
                  toast.success('Task succesfully deleted', {
                    style: {
                      background: "#101010",
                      color: "#fff"
                    }
                  })
                  navigate("/tasks")
                }
              }}>
              Delete
            </button>
          </div>
        )
      }
      
    </div>
  )
}

export default TaskFormPage