import React from 'react'
import "./tags.scss"
import { NavLink } from 'react-router-dom'

const Tags = (props) => {

    const { tags } = props

    const renderTags = tags?.map((element, index) => {

        return (
            <NavLink to={`tag/${element}`} key={index} className='tags--tags'>
                {element}
            </NavLink>
        )
    })

    return (
        <>
            {renderTags}
        </>

    )
}

export default Tags