import React from 'react'
import { NavLink } from 'react-router-dom'
import "./category.scss"

const Categorys = (props) => {

    const { categoryCount } = props

    console.log(categoryCount)

    const renderCategory = categoryCount?.map((item, index) => {
        return (
            <NavLink to={`category/${item.category}`} className="cat-link" key={index}>
                <span>{item.category} </span>
                <span>({item.count})</span>
            </NavLink>
        )
    })

    return (
        <>
            {renderCategory}
        </>
    )
}

export default Categorys