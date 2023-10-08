import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { db } from '../firebase-config'

const Card = (props) => {

    const { tags } = props
    const [relatedBlogs, setRelatedBlogs] = useState([])

    const getRelatedBlogs = async () => {
        const blogRef = collection(db, "blogs")
        const relatedBlogsQuery = query(blogRef, where("tags", "array-contains-any", tags))
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
        return (
            <div key={index}>
                <NavLink to={`/${item.id}`}>
                    <p>{item.title}</p>
                </NavLink>
            </div>
        )
    })



    return (
        <div style={{ margin: "32px" }}>
            <div>
                <p>Related Blogs</p>
            </div>
            {renderRelatedBlogs}
        </div>
    )
}

export default Card