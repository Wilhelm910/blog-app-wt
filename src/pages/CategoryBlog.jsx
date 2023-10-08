import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { db } from '../firebase-config'

const CategoryBlog = () => {


    const { category } = useParams()
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState()


    useEffect(() => {
        getBlogs()
    }, [category])


    const getBlogs = async() => {
        const blogRef = collection(db,"blogs")
        const blogCatQuery = query(blogRef, where("category", "==", category))
        
        const catSnapshot = await getDocs(blogCatQuery)
        let catBlogs = []
        catSnapshot.forEach(element => {
            catBlogs.push({
                id: element.id,
                ...element.data()
            })
        });
        setBlogs(catBlogs)
        setLoading(false)
    }
    

    const renderCategory = blogs?.map((item,index) => {
        return (
            <div key={index}>
                <p>{item.title}</p>
                <p>{item.description}</p>
            </div>
        )
    })



    if (loading) {
        return <Spinner />
    }


    return (
        <div>
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
            <div>
                {renderCategory}
            </div>
        </div>
    )
}

export default CategoryBlog