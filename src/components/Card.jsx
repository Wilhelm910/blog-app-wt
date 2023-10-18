import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { db } from '../firebase-config'
import { excerpt } from '../utility'
import "./card.scss"

const Card = (props) => {

    const { tags, blog, likes, comments } = props
    const [relatedBlogs, setRelatedBlogs] = useState([])

    const getRelatedBlogs = async () => {
        const blogRef = collection(db, "blogs")
        const relatedBlogsQuery = query(blogRef, where("tags", "array-contains-any", tags, limit(1)))
        const list = []
        const relatedSnapshot = await getDocs(relatedBlogsQuery)

        relatedSnapshot.forEach(element => {
            list.push({
                id: element.id,
                ...element.data()
            })
        });
        setRelatedBlogs(list)
    }

    useEffect(() => {
        getRelatedBlogs()
    }, [tags])

    const renderRelatedBlogs = relatedBlogs?.map((item, index) => {
        if (relatedBlogs.length <= 1) {
            return (
                <div>
                    <p>No related Blogs</p>
                </div>
            )
        }

        if (blog.title != item.title) {
            return (
                <div key={index} className="related-blog">
                    <NavLink className="related-blog-link" to={`/${item.id}`}>
                        <div>
                            <img style={{ width: "50px", height: "50px" }} src={item.imgUrl} />
                        </div>
                        <div>
                            <h4>{item.title}</h4>
                            <p>{excerpt(item.description, 50)}</p>
                        </div>
                        <div>
                            <p>Comments: {comments.length}</p>
                            <p>Likes: {likes.length}</p>
                        </div>
                    </NavLink>
                </div>
            )
        } 

    })



    return (
        <div style={{ margin: "32px", width: "fit-content" }}>

            <p>Related Blogs</p>

            {renderRelatedBlogs}
        </div>
    )
}

export default Card