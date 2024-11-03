// src/StatusDashboard.js
import React from 'react';
import HealthBar from '/Healthbar.js';
import GutBar from '/GutBar.js';
import AverageScoreIcon from '/AverageScoreIcon.js';

const StatusDashboard = () => {
    const health = 89;  // Example health value
    const gutFill = 75; // Example gut fill value

    // Calculate average score
    const averageScore = (health + gutFill) / 2;

    return (
        <div style={{ position: 'relative' }}>
            <HealthBar health={health} />
            <GutBar gut={gutFill} /> {/* Pass the gut value here */}
            <AverageScoreIcon averageScore={averageScore} />
        </div>
    );
};

export default StatusDashboard;

