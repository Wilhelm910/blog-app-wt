import React, { useState } from 'react'

const LikeSection = (props) => {

    const { handleLike, userId, likes } = props


    const [userLike, setUserLike] = useState([])

    const LikeStatus = () => {
        if (userId) {
            return (
                <>
                    <button onClick={handleLike}>Like</button>
                </>)
        } else if (!userId) {
            return (
                <p>Create an account or login to like this post</p>
            )
        }
    }

    return (
        <>
            <p>{likes.length} {likes.length == 1 ? "Like" : "Likes"}</p>
            {<LikeStatus />}
        </>
    )
}

export default LikeSection