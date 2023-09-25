import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../pages/Header'
import { ToastContainer } from 'react-toastify'

const Layout = (props) => {
    const { setActive, active, user, handleLogout } = props
    return (
        <div className="layout">
            <Header setActive={setActive} active={active} user={user} handleLogout={handleLogout} />
            <ToastContainer position='top-center'/>
            <Outlet />
        </div>
    )
}

export default Layout