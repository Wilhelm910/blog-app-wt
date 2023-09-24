import React from 'react'
import { NavLink } from 'react-router-dom'
import "./header.scss"

const Header = (props) => {
    const { setActive, active } = props
    return (
        <div className="header">
            <div className="left">
                <NavLink 
                className={`nav-link ${active === "home" ? "active" : ""}`} 
                to="/"
                onClick={() => setActive("home")}
                >Home</NavLink>
                <NavLink 
                className={`nav-link ${active === "create" ? "active" : ""}`} 
                onClick={() => setActive("create")}
                to="create"
                >Create</NavLink>
                <NavLink
                 className={`nav-link ${active === "about" ? "active" : ""}`} 
                 onClick={() => setActive("about")}
                 to="about"
                >About</NavLink>
            </div>
            <div className="right">
                <NavLink 
                className={`nav-link ${active === "auth" ? "active" : ""}`} 
                onClick={() => setActive("auth")}
                to="auth"
                >Login</NavLink>
            </div>
        </div>
    )
}

export default Header