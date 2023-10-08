import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase-config'
import Spinner from '../components/Spinner'

const TagBlog = () => {

  const params = useParams()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      getTagBlogs()
    }
  }, [params.id])


  const getTagBlogs = async () => {
    const blogRef = collection(db, "blogs")
    const tagBlogQuery = query(blogRef, where("tags", "array-contains", params.tag))

    const docSnapshot = await getDocs(tagBlogQuery)
    let tagBlogs = []
    docSnapshot.forEach(element => {
      tagBlogs.push({
        id: element.id,
        ...element.data()
      })
    });
    setBlogs(tagBlogs)

    setLoading(false)
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
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <div>
        {renderBlogs}
      </div>
    </div>
  )
}

export default TagBlog


/*
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
*/