import React from 'react'
import { useNavigate } from 'react-router-dom'

const TaskCard = ({task}) => {

    const navigate = useNavigate()

    return (
        <div style={{background: "#101010"}}
         onClick={ () => {
            navigate(`/task/${task.id}`)
         }}>

            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <hr />
        </div>
    )
}

export default TaskCard