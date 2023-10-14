import React from 'react'

const LikeSection = (props) => {

    const {handleLike} = props

    return (
        <>
            <button onClick={handleLike}>Give a Like</button>
        </>
    )
}

export default LikeSection