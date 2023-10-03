import React from 'react'
import "./mostPopular.scss"
import { NavLink, useNavigate } from 'react-router-dom'
import { excerpt } from '../utility'

const MostPopular = (props) => {
    const { blogs } = props

    const renderBlogs = blogs?.map((element, index) => {
        if (element.trending == "yes") {
            return (
                <NavLink className='trending' key={index} to={`/${element.id}`}>
                    <div className='trending-left'>
                        <img className='trending-img' src={element.imgUrl} />
                    </div>
                    <div className='trending-right'>
                        <p className='trending--title'>{element.title}</p>
                        <p className='trending--timestamp'>{element.timestamp.toDate().toDateString()}</p>
                    </div>
                </NavLink>
            )
        }
    })


    return (
        <>
            {renderBlogs}
        </>
    )
}

export default MostPopular