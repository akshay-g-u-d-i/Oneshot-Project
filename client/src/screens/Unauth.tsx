import React from 'react'
import { Link } from 'react-router-dom'

export default function Unauth() {
  return (
    <div className='text-center text-danger m-5'>
        <h4>Session expired. <Link to='/'>Click here</Link> to login again</h4>

    </div>
  )
}
