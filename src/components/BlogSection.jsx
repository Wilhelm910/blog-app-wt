import React from 'react'
import { excerpt } from '../utility'
import "./blogSection.scss"
import { NavLink } from 'react-router-dom'

const BlogSection = (props) => {

    const { blogs, user, handleDelete } = props

    const renderBlogs = blogs?.map((element, index) => {
        return (
            <div className='blog-blog' key={index}>
                <div className='blog-left'>
                    <img className='blog-img' src={element.imgUrl} />
                </div>
                <div className='blog-right'>
                    <div className='blog-header'>
                        <p className='blog-category'>{element.category}</p>
                        <p>{element.author}</p>
                        <p className='blog-timestamp'>{element.timestamp.toDate().toDateString()}</p>
                    </div>
                    <div className='blog-content'>
                        <h3 className='blog-title'>{element.title}</h3>
                        <p>{excerpt(element.description, 120)}</p>
                    </div>
                    <div className='blog-bnt-section'>
                        <NavLink to={`/${element.id}`}>
                            <button>Read more</button>
                        </NavLink>

                        {user && user.uid == element.userId ?
                            <div>
                                <NavLink to={`update/${element.id}`}>
                                    <button>Edit</button>
                                </NavLink>
                                <button onClick={() => handleDelete(element.id)}>Delete</button>
                            </div>
                            : ""}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="blog-section">
            {renderBlogs}
        </div>
    )
}

export default BlogSection