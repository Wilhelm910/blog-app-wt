import React, { useEffect } from 'react'

const UserComments = (props) => {

  const { body, msg, index, name, createdAt } = props

  console.log(props)
  //props: user name, comment body, createdAt, default message when no comments

  return (
    <div>UserComments
      {msg ? (
        <>
          <p>{msg}</p>
        </>
      ) : (

        <div key={index}>
          <p>{name}</p>
          <span>{createdAt.toDate().toDateString()}</span>
          <p >{body}</p>
        </div>

      )}
    </div>
  )
}

export default UserComments