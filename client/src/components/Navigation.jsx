import {Link} from 'react-router-dom'

const Navigation = () => {
  return (
    <div className='flex justify-between py-3'>
        <Link to='/tasks'>
            <h1 className='font-bold text-3xl mb-4'>Task app</h1>
        </Link>

        <Link className='bg-indigo-500 px-3 py-2 rounded-lg' to='/task-create'>Crear Tarea</Link>
    </div>
  )
}

export default Navigation