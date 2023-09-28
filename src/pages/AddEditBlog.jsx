import React, { useEffect, useState } from 'react'
import "./addeditblog.scss"
import { TagsInput } from "react-tag-input-component";
import { db, storage } from "../firebase-config"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';


const initializeBlog = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: ""
}

const categoryOptions = [
  "Fashion",
  "Technology",
  "Food",
  "politics",
  "Sports",
  "Business"
]

const AddEditBlog = (props) => {

  const params = useParams()
  const navigate = useNavigate()

  const { user,setActive } = props

  const [form, setForm] = useState(initializeBlog)
  const { title, tags, trending, category, description } = form
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    params.id && getBlog()
  }, [params.id])

  const getBlog = async () => {
    const dataRef = doc(db, "blogs", params.id)
    const blogDetail = await getDoc(dataRef)
    try {
      setForm({ ...blogDetail.data() })
      setActive("create")
    } 
    catch(error) {
      console.log(error)
    }
  }


  const handleInput = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }


  const handleTags = (tags) => {
    setForm({
      ...form,
      tags
    })
  }


  const handleTrending = (event) => {
    setForm({
      ...form,
      trending: event.target.value
    })
  }


  const handleCategory = (event) => {
    setForm({
      ...form,
      category: event.target.value
    })
  }


  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is" + progress + "% done")
        console.log(snapshot)
        setProgress(progress)

        switch (snapshot.state) {
          case "paused":
            console.log("upload is paused")
          case "running":
            console.log("Upload is running")
            break;
          default:
            break
        }

      }, (error) => {
        console.log(error)
      },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setForm((prev) => ({
              ...prev,
              imgUrl: downloadUrl
            }))
          })
        })
    }

    file && uploadFile()
  }, [file])


  const handleSubmit = async (event) => {
    event.preventDefault()
    if (category, title, tags, trending, description, file) {
      try {
        await addDoc(collection(db, "blogs"), {
          ...form,
          timestamp: serverTimestamp(),
          author: user.displayName,
          userId: user.uid
        })
      }
      catch (error) {
        console.log(error)
      }
    } else {
      alert("All fields are mandatory")
    }
    navigate("/")
  }



  return (
    <div className="add-edit-blog">
      <h1>{params.id ? "Update Blog" : "Create Blog"}</h1>
      <div className="blog-container">
        <form className='add-edit-form' onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type='text'
              placeholder='Title'
              name='title'
              value={title}
              onChange={handleInput}
            />
          </div>
          <div>
            <TagsInput
              value={tags}
              placeholder="Tags"
              onChange={handleTags}
            />
          </div>
          <div className='trending-container'>
            <p>Is it trending?</p>
            <div className='radio'>
              <input
                type='radio'
                name='radio-option'
                value="no"
                checked={trending === "no"}
                onChange={handleTrending}
              />
              <label htmlFor='radio-option'>No&nbsp;</label>
            </div>
            <div className='radio'>
              <input
                type='radio'
                name='radio-option'
                value="yes"
                checked={trending === "yes"}
                onChange={handleTrending}
              />
              <label htmlFor='radio-option'>Yes&nbsp;</label>
            </div>
          </div>
          <div className='select-container'>
            <select
              value={category}
              onChange={handleCategory}
            >
              <option>Please select category</option>
              {categoryOptions.map((element, index) => {
                return (
                  <option key={index} value={element || ""}>{element}</option>
                )
              })}
            </select>
          </div>
          <div>
            <textarea className='blog-textarea'
              placeholder='description'
              name='description'
              value={description}
              onChange={handleInput}
            ></textarea>
          </div>
          <div>
            <input
              type='file'
              onChange={(event) => setFile(event.target.files[0])}
            />
          </div>
          <div>
            <button type='Submit'>{params.id ? "Update" : "Submit"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEditBlog