import React from 'react'

const Searchbar = (props) => {

    const { search, handleInput } = props

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
          
            <button type='submit'>Search</button>
        </form>
    )
}

export default Searchbar