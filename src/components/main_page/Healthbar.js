// src/HealthBar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../../App.css'; // Make sure this path is correct

const HealthBar = ({ health = 89 }) => {
    const maxHealth = 100;

    // Determine the background color based on health value
    let backgroundColor;
    if (health >= 85) {
        backgroundColor = 'linear-gradient(90deg, #00ff00, #4caf50)'; // Green
    } else if (health > 75) {
        backgroundColor = 'linear-gradient(90deg, #ffeb3b, #cddc39)'; // Greenish Yellow
    } else if (health >= 51) {
        backgroundColor = 'linear-gradient(90deg, #ffeb3b, #ff9800)'; // Yellow
    } else {
        backgroundColor = 'linear-gradient(90deg, #ff4747, #f44336)'; // Red
    }

    return (
        <div className="health-bar" style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faHeart} style={{ marginRight: '20px', color: '#ff4747', fontSize: '30px' }} />
            <div
                className="health-fill"
                style={{ 
                    width: `${(health / maxHealth) * 100}%`,
                    background: backgroundColor, // Apply dynamic background color
                    height: '24px' // Set a fixed height for the health bar
                }}
            >
                {health} %
            </div>
        </div>
    );
};

export default HealthBar;
