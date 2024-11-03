import React from 'react';
import { useAuth } from '../../contexts/authContext';

import Navbar from "./Navbar";
import Avatar from "./Avatar";
import HealthBar from "./Healthbar";
import HeatMap from "./HeatMap";

const Home = () => {
    const { currentUser } = useAuth();
    return (
        <div className="app">
            <Navbar />
            <div className="main-content">
                <div className="left-side">
                    <Avatar />
                </div>
                <div className="right-side">
                    <HealthBar />
                    <HealthBar />
                </div>
            </div>
            <div>
                <HeatMap />
            </div>
            {/* <div className='text-2xl font-bold pt-18'>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div> */}
        </div>
    );
};

export default Home;
