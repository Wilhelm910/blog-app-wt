import React, { useEffect, useState } from 'react'
import "./scroll.scss"

const ScrollToTop = () => {

    const [visibility, setVisibility] = useState(false)

    const toggleVisibility = () => {
        if (window.scrollY > 200) {
            setVisibility(true)
        } else {
            setVisibility(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility)

        return () => {
            window.removeEventListener("scroll", toggleVisibility)
        }
    }, [])

    return (
        <div className='scroll-btn'>
            {visibility && (
                <button onClick={scrollToTop}>Top</button>
            )}
        </div>
    )
}

export default ScrollToTop