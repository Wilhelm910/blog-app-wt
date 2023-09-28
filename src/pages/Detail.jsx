import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase-config'
import "./detail.scss"

const Detail = (props) => {

    const { setActive } = props
    const params = useParams()
    const [blog, setBlog] = useState([])


    useEffect(() => {
        getDetails()
    }, [params.id])


    const getDetails = async () => {
        const dataRef = doc(db, "blogs", params.id)
        const blogDetail = await getDoc(dataRef)
        setBlog(blogDetail.data())
        setActive(null)
    }


    return (
        <div className='blog-detail-section'>
            <div className="blog-detail" style={{ backgroundImage: `url(${blog?.imgUrl})`, height: "750px", backgroundRepeat: "no-repeat", width: "100%", backgroundPosition: "center" }}>
                <div className='detail-header'>
                    <p>Date palceholder</p>
                    <h2>{blog?.title}</h2>
                </div>
            </div>
            <div>
                <p style={{borderBottom: "1px solid black", margin: "8px 0px"}}>Created by {blog?.author} - Date Placeholder</p>
                <p>{blog?.description}</p>
            </div>
        </div>
    )
}

export default Detail

//<div>{blog?.timestamp.toDate().toDateString()}</div>