import React, { useEffect, useState } from 'react'
import "./home.scss"
import BlogSection from '../components/BlogSection'
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase-config'
import Spinner from '../components/Spinner'


const Home = (props) => {


    const { setActive, user } = props
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([])


    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
            let list = []
            snapshot.docs.forEach(element => {
                list.push({
                    id: element.id,
                    ...element.data()
                })
            });
            setBlogs(list)
            setLoading(false)
            setActive("/")
        }, (error) => {
            console.log(error)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    if (loading) {
        return <Spinner />
    }


    const handleDelete = async (id) => {
        console.log(id)
        if (window.confirm("Are you sure to delete this blog?")) {
            try {
                setLoading(true)
                const dataRef = doc(db, "blogs", id)
                await deleteDoc(dataRef)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

    }

    return (
        <div className="home">
            <div className="trending-section">
                <h2>Trending</h2>
            </div>
            <div className='home-body'>
                <div className="blog-section">
                    <p className='blog-headline'>Daily Blogs</p>
                    <BlogSection blogs={blogs} user={user} handleDelete={handleDelete} />
                </div>
                <div className="home-right">
                    <div className="tags-section">
                        <h2>Tags</h2>
                    </div>
                    <div className="most-popular-section">
                        <h2>Most popular</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home