import React from 'react'
import "./spinner.scss"

const Spinner = () => {
  return (
    <div className="spinner" role='status'>
        <span className="hidden">Loading...</span>
    </div>
  )
}

export default Spinner