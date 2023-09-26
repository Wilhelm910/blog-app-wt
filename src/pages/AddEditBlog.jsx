import React, { useState } from 'react'
import "./addeditblog.scss"
import { TagsInput } from "react-tag-input-component";


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

const AddEditBlog = () => {

  const [form, setForm] = useState(initializeBlog)
  const { title, tags, trending, category, description } = form
  const [file, setFile] = useState(null)


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

  console.log(form)

  return (
    <div className="add-edit-blog">
      <div className="blog-container">
        <form className='add-edit-form'>
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
            <button type='Submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEditBlog