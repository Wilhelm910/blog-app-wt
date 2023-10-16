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
import LikeSection from '../components/LikeSection'

const Detail = (props) => {

    const { setActive, user } = props
    const params = useParams()
    const [blog, setBlog] = useState([])
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
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
        setLikes(blogDetail.data().likes ? blogDetail.data().likes : [])
        setActive(null)
    }


    const handleComment = async (event) => {
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

    const handleLike = async () => {
        likes.push(userId)
        await updateDoc(doc(db, "blogs", params.id), {
            ...blog,
            likes,
            timestamp: serverTimestamp()
        })
        setLikes(likes)
    }

    return (
        <>
            {JSON.stringify(comments)}
            <div className='blog-detail-section'>
                <div className="blog-detail" style={{ backgroundImage: `url(${blog?.imgUrl})`, height: "750px", backgroundRepeat: "no-repeat", width: "100%", backgroundPosition: "center" }}>
                    <div className='detail-header'>
                        <p>Date palceholder</p>
                        <h2>{blog?.title}</h2>
                    </div>
                </div>
                <div>
                    <div style={{ borderBottom: "1px solid black", margin: "8px 0px", display: "flex", justifyContent: "space-between" }}>
                        <p>Created by {blog?.author} - Date Placeholder</p>
                        <LikeSection
                            handleLike={handleLike}
                            userId={userId}
                            likes={likes}
                        />
                    </div>
                    <p>{blog?.description}</p>
                </div>
                <div>
                    <Tags tags={blog?.tags} />
                </div>
                <div>
                    <div>
                        <p>{blog?.comments?.length} Comments</p>
                    </div>
                    {comments.length < 1 ? (
                        <UserComments msg={"No comments for this blog. Be the first to comment"} />
                    ) :
                        <>
                            {comments?.map((comment, index) => {
                                return (
                                    <>
                                        <UserComments index={index} {...comment} />
                                    </>
                                )
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