import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../firebase-config'
import Spinner from '../components/Spinner'

const TagBlog = () => {

  const params = useParams()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return () => {
      getTagBlogs()
    }
  }, [params.id])


  const getTagBlogs = () => {
    const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
      let blogList = []
      let sortedBlogs = []
      snapshot.docs.forEach(element => {
        blogList.push({
          id: element.id,
          ...element.data()
        })
      });
      blogList.forEach(element => {
        element.tags.forEach(tag => {
          if (tag === params.tag) {
            sortedBlogs.push(element)
          }
        });
      });
      setBlogs(sortedBlogs)
      setLoading(false)
    })
  }

  if (loading) {
    return <Spinner />
  }

  const renderBlogs = blogs?.map((item, index) => {
    return (
      <div key={index}>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>
    )
  })

  return (
    <div>
      {renderBlogs}
    </div>
  )
}

export default TagBlog