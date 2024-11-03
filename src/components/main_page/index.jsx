import React from 'react'
import { useAuth } from '../../contexts/authContext'

import Navbar from "./Navbar";
import Avatar from "./Avatar";
import HeatMap from "./HeatMap";
import Capture from "./Capture";

const Home = () => {
    const { currentUser } = useAuth()
    return (
        <div className="app">
            <Navbar />
            <Avatar />
            <HeatMap />
            <Capture />
        </div>
        // <div className='text-2xl font-bold pt-18'>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div>
    )
}

export default Home