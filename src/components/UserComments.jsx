import React from 'react'

const UserComments = (props) => {

  const { item, index, msg } = props

  console.log(msg)
  console.log(props)
  //props: user name, comment body, createdAt, default message when no comments
  return (
    <div>UserComments
      {msg ? (<p>{msg}</p> ): (
        <>
        {comments}
        </>
      )}
    </div>
  )
}

export default UserComments