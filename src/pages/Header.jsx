import React from 'react'
import { NavLink } from 'react-router-dom'
import "./header.scss"

const Header = (props) => {
    const { setActive, active, user, handleLogout } = props
    const userId = user?.uid

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
                {!userId ? (
                    <>
                        <NavLink
                            className={`nav-link ${active === "auth" ? "active" : ""}`}
                            onClick={() => setActive("auth")}
                            to="auth"
                        >Login</NavLink>
                    </>
                ) : (
                    <>
                        <div className='user-img-container'>
                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt="logo"
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                }} />
                            <p>{user?.displayName}</p>
                            <p className='logout-btn' onClick={handleLogout}>Logout</p>
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}

export default Header