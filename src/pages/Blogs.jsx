import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase-config'
import BlogSection from '../components/BlogSection'
import Pagination from '../components/Pagination'


const Blogs = () => {


    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([])


    useEffect(() => {
        getBlogs()
    }, [])

    const getBlogs = async () => {
        try {
            const blogRef = collection(db, "blogs")
            const firstFour = query(blogRef, orderBy("title"), limit(4))
            const docSnapshot = await getDocs(firstFour)
            let list = []
            docSnapshot.forEach(element => {
                list.push({
                    id: element.id,
                    ...element.data()
                })
            });
            setBlogs(list)

            setLoading(false)
        }
        catch (error) {
            console.log(error)
        }
    }


    const renderBlogs = blogs?.map((item, index) => {
        return (
            <>
                {item.title}
            </>
        )
    })



    if (loading) {
        return <Spinner />
    }

    return (
        <>
            {renderBlogs}
            <BlogSection blogs={blogs} />
            <Pagination />
        </>
    )
}

export default Blogs