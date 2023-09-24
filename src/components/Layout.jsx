import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../pages/Header'

const Layout = (props) => {
    const { setActive, active } = props
    return (
        <div className="layout">
            <Header setActive={setActive} active={active} />
            <Outlet />
        </div>
    )
}

export default Layout