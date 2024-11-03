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
        </div>
    )
}

export default Home