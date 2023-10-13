import React from 'react'
import { NavLink } from 'react-router-dom'

const CommentBox = (props) => {
    // Props: userId,userComment,setUserComment,handleComment

    const { userComment, setUserComment, userId, handleComment } = props
    return (
        <>
            <form >
                <textarea
                    rows="4"
                    value={userComment}
                    onChange={(event) => setUserComment(event.target.value)}
                />
            </form>
            {!userId ? (
                <>
                    <h4>Please <NavLink to="auth">login or create</NavLink> an account to post a comment</h4>
                </>
            ) : (
                <>
                    <button onClick={handleComment}>Post comment</button>
                </>
            )}
        </>
    )
}

export default CommentBox