import React from 'react';
import Capture from "./components/Capture";
import Navbar from "./components/Navbar";
import Avatar from './components/Avatar';
// import HealthBar from './components/Healthbar';
import HeatMap from './components/HeatMap';
import './App.css';

function App() {
    return (
    <div className="app">
        <Navbar />
        <Avatar />
        <HeatMap />
        <Capture />
    </div>
    // <div className="app">
    //     <div className="header">
    //         <div className="username">Username</div>
    //         <div className="score">Score: 100</div>
    //     </div>
    //         <div className="avatar-container">
    //             <Avatar />
    //         </div>
    //         <div className="health-bars">
    //             <HealthBar />
    //             <HealthBar />
    //         </div>
    //         <div className="heat-map">
    //             <HeatMap />
    //         </div>
    //     </div>
        );
    }
export default App;
