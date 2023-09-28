import React, { useEffect, useState } from 'react'
import "./home.scss"
import BlogSection from '../components/BlogSection'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase-config'


const Home = () => {

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
        }, (error) => {
            console.log(error)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    console.log(blogs)

    return (
        <div className="home">
            <div className="trending-section">
                <h2>Trending</h2>
            </div>
            <div className='home-body'>
                <div className="blog-section">
                    <p className='blog-headline'>Daily Blogs</p>
                    <BlogSection blogs={blogs} />
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