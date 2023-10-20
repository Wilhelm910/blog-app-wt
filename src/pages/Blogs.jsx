import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { collection, endAt, endBefore, getDocs, limit, limitToLast, orderBy, query, startAfter } from 'firebase/firestore'
import { db } from '../firebase-config'
import BlogSection from '../components/BlogSection'
import Pagination from '../components/Pagination'


const Blogs = () => {


    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [nrOfPages, setNrOfPages] = useState(null)
    const [lastVisible, setLastVisible] = useState(null)
    const [count, setCount] = useState(null)


    useEffect(() => {
        getBlogs()
        getAllBlogs()
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
            setCount(docSnapshot.size)
            setLastVisible(docSnapshot.docs[docSnapshot.docs.length - 1])
            setLoading(false)
        }
        catch (error) {
            console.log(error)
        }
    }
   
    const getAllBlogs = async () => {
        const blogRef = collection(db, "blogs")
        const docSnapshot = await getDocs(blogRef)
        const totalBlogs = docSnapshot.size
        const totalPages = Math.ceil(totalBlogs / 4)
        setNrOfPages(totalPages)
    }
  
    const fetchMore = async () => {
        const blogRef = collection(db, "blogs")
        const moreBlogsQuery = query(blogRef, orderBy("title"), startAfter(lastVisible), limit(4))
        const moreBlogs = await getDocs(moreBlogsQuery)
        setBlogs(moreBlogs.docs.map((item) => ({
            id: item.id,
            ...item.data()
        })))
        setCount(moreBlogs.size)
        setLastVisible(moreBlogs.docs[moreBlogs.docs.length - 1])
    }

    const fetchPrev = async () => {
        const blogRef = collection(db, "blogs")

        const end = nrOfPages !== currentPage ? endAt(lastVisible) : endBefore(lastVisible)

        const limitData = nrOfPages !== currentPage ? limit(4) : count <= 4 && nrOfPages % 2 == 0 ? limit(4) : limitToLast(4)

        const moreBlogsQuery = query(blogRef, orderBy("title"), end, limitData)
        const moreBlogs = await getDocs(moreBlogsQuery)
        setBlogs(moreBlogs.docs.map((item) => ({
            id: item.id,
            ...item.data()
        })))
        setCount(moreBlogs.size)
        setLastVisible(moreBlogs.docs[moreBlogs.docs.length - 1])
    }


    const renderBlogs = blogs?.map((item, index) => {
        return (
            <>
                {item.title}
            </>
        )
    })

    const handlePageChange = (value) => {
        if (value == "next") {
            setCurrentPage((page) => page + 1)
            fetchMore()
        } else if (value == "prev") {
            setCurrentPage((page) => page - 1)
            fetchPrev()
        }
    }



    if (loading) {
        return <Spinner />
    }

    return (
        <>
            <BlogSection blogs={blogs} />
            <Pagination handlePageChange={(e) => handlePageChange(e)} currentPage={currentPage} nrOfPages={nrOfPages} />
        </>
    )
}

export default Blogs