// src/components/main_page/AverageScoreIcon.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../firebase/firebase';
import { getAuth } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import '../../App.css';

const AverageScoreIcon = () => {
    const [gutHealthScore, setGutHealthScore] = useState(76); // Default value for gut health
    const health = 89; // Static value for health

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return;

        const userDocRef = doc(db, "users", user.uid);

        // Real-time listener for GutHealthScore
        const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setGutHealthScore(data.GutHealthScore || 0);
            }
        });

        return () => unsubscribe(); // Clean up the listener on component unmount
    }, []);

    // Calculate the average score based on health and dynamic gutHealthScore
    const averageScore = ((health + gutHealthScore) / 2).toFixed(1);

    return (
        <div className="average-score-icon" style={{ display: 'flex', alignItems: 'center', marginTop: '20px', width: '90px', height: '90px' }}>
            <FontAwesomeIcon icon={faStar} style={{ color: '#ffeb3b', fontSize: '40px', marginRight: '10px' }} />
            <div className="average-score-value" style={{ fontSize: '28px', color: '#333' }}>
                {averageScore}%
            </div>
        </div>
    );
};

export default AverageScoreIcon;
