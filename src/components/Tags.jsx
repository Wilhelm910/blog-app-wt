import React, { useEffect, useState } from 'react'
import "./tags.scss"
import { NavLink, useParams } from 'react-router-dom'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../firebase-config'




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