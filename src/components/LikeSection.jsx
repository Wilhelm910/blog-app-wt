import React, { useState } from 'react'

const LikeSection = (props) => {

    const { handleLike, userId, likes } = props


    const [userLike, setUserLike] = useState([])

    const likeStatus = () => {
        // like logic nach oben verschieben
    }

    return (
        <>
            <p>{likes.length}</p>
            {
                userId && !likes.includes(userId)
                    ?
                    (<>
                        <button onClick={handleLike}>Give a Like</button>
                    </>)
                    :
                    (<>
                        {!userId ?
                            (<>
                                <p>Create an account or login to like this post</p>
                            </>) :
                            (<>
                                ""
                            </>)
                        }
                    </>)
            }
        </>
    )
}

export default LikeSection