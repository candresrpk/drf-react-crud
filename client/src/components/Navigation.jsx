import {Link} from 'react-router-dom'

const Navigation = () => {
  return (
    <div>
        <Link to='/tasks'>
            <h1>Task app</h1>
        </Link>
        <Link to='/task-create'>Crear Tarea</Link>
    </div>
  )
}

export default Navigation