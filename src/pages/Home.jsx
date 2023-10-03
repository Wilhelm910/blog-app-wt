import React, { useEffect, useState } from 'react'
import "./home.scss"
import BlogSection from '../components/BlogSection'
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase-config'
import Spinner from '../components/Spinner'
import Tags from '../components/Tags'
import MostPopular from '../components/MostPopular'
import Trending from '../components/Trending'


const Home = (props) => {


    const { setActive, user } = props
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([])
    const [tags, setTags] = useState([])
    const [trendingBlogs, setTrendingBlogs] = useState([])


    const getTrendingBlogs = async () => {
        const blogRef = collection(db, "blogs")
        const getQuery = query(blogRef, where("trending", "==", "yes"))
        const querySnapshot = await getDocs(getQuery)
        let trendingBlogs = []
        querySnapshot.forEach((element) => {
            trendingBlogs.push({
                id: element.id,
                ...element.data()
            })
        });
        setTrendingBlogs(trendingBlogs)
    }


    useEffect(() => {
        getTrendingBlogs()
        const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
            let list = []
            let tags = []
            snapshot.docs.forEach(element => {
                tags.push(
                    ...element.get("tags")
                )
                list.push({
                    id: element.id,
                    ...element.data()
                })
            });
            const uniqueTags = [...new Set(tags)];
            setTags(uniqueTags);
            setBlogs(list)
            setLoading(false)
            setActive("/")
        }, (error) => {
            console.log(error)
        })

        return () => {
            unsubscribe()
            getTrendingBlogs()
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
                <Trending trendingBlogs={trendingBlogs} />
            </div>
            <div className='home-body'>
                <div className="blog-section">
                    <p className='blog-headline'>Daily Blogs</p>
                    <BlogSection blogs={blogs} user={user} handleDelete={handleDelete} />
                </div>
                <div className="home-right">
                    <div className="tags-section">
                        <p className='tags-headline'>Tags</p>
                        <div className='tags-container'>
                            <Tags tags={tags} />
                        </div>
                    </div>
                    <div className="most-popular-section">
                        <p className='most-popular-headline'>Most popular</p>
                        <div className='most-popular-container'>
                            <MostPopular blogs={blogs} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home