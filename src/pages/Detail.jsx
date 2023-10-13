import { Timestamp, addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase-config'
import "./detail.scss"
import Card from '../components/Card'
import Tags from '../components/Tags'
import UserComments from '../components/UserComments'
import { isEmpty } from 'lodash'
import CommentBox from '../components/CommentBox'

const Detail = (props) => {

    const { setActive, user } = props
    const params = useParams()
    const [blog, setBlog] = useState([])
    const [comments, setComments] = useState([])
    const [userComment, setUserComment] = useState([])
    const userId = user?.uid


    useEffect(() => {
        getDetails()
    }, [params.id])


    const getDetails = async () => {
        const dataRef = doc(db, "blogs", params.id)
        const blogDetail = await getDoc(dataRef)
        setBlog(blogDetail.data())
        setComments(blogDetail.data().comments ? blogDetail.data().comments : [])
        setActive(null)
    }

    const handleComment = async (event) => {
        console.log("test")
        event.preventDefault()
        comments.push({
            createdAt: Timestamp.fromDate(new Date()),
            userId,
            name: user?.displayName,
            body: userComment
        })
        alert("comment posted")
        await updateDoc(doc(db, "blogs", params.id), {
            ...blog,
            comments,
            timestamp: serverTimestamp()
        })
        setComments(comments)
        setUserComment("")
    }
    console.log(comments)

    return (
        <>
            <div className='blog-detail-section'>
                <div className="blog-detail" style={{ backgroundImage: `url(${blog?.imgUrl})`, height: "750px", backgroundRepeat: "no-repeat", width: "100%", backgroundPosition: "center" }}>
                    <div className='detail-header'>
                        <p>Date palceholder</p>
                        <h2>{blog?.title}</h2>
                    </div>
                </div>
                <div>
                    <p style={{ borderBottom: "1px solid black", margin: "8px 0px" }}>Created by {blog?.author} - Date Placeholder</p>
                    <p>{blog?.description}</p>
                </div>
                <div>
                    <Tags tags={blog?.tags} />
                </div>
                <div>
                    <div>
                        <p>{blog?.comments?.length} Comments</p>
                    </div>
                    {isEmpty(comments) ? (
                        <UserComments msg={"No comments for this blog. Be the first to comment"} />
                    ) :
                        <>
                            {comments?.map((item, index) => {
                                <UserComments item={item} index={index} />
                            })}
                        </>
                    }
                    <CommentBox userComment={userComment} setUserComment={setUserComment} userId={userId} handleComment={handleComment} />
                </div>
            </div>
            <Card tags={blog.tags} blog={blog} />
        </>
    )
}

export default Detail

//<div>{blog?.timestamp.toDate().toDateString()}</div>