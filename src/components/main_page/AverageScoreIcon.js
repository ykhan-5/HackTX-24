import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../../App.css'; // Ensure this path is correct

const AverageScoreIcon = ({ health = 98, gut = 76,email }) => { // Use default values
    const averageScore = ((health + gut) / 2).toFixed(1); // Calculate average

    return (
        <div className="average-score-icon" style={{ display: 'flex', alignItems: 'center', marginTop: '20px',width: '90px', height: '90px'}}>
            <FontAwesomeIcon icon={faStar} style={{ color: '#ffeb3b', fontSize: '40px', marginRight: '10px' }} /> {/* Increase icon size */}
            <div className="average-score-value" style={{ fontSize: '28px', color: '#333' }}> {/* Increase font size */}
                {averageScore}%
            </div>
        </div>
    );
};

export default AverageScoreIcon;
