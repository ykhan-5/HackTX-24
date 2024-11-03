// src/components/main_page/GutBar.js
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { getAuth } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import '../../App.css';

const GutBar = () => {
    const [gutHealthScore, setGutHealthScore] = useState(0);
    const maxGut = 100;

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

    // Determine the background color based on gut health score
    let backgroundColor;
    if (gutHealthScore >= 85) {
        backgroundColor = 'linear-gradient(90deg, #00ff00, #4caf50)'; // Green
    } else if (gutHealthScore > 75) {
        backgroundColor = 'linear-gradient(90deg, #ffeb3b, #cddc39)'; // Greenish Yellow
    } else if (gutHealthScore >= 51) {
        backgroundColor = 'linear-gradient(90deg, #ffeb3b, #ff9800)'; // Yellow
    } else {
        backgroundColor = 'linear-gradient(90deg, #ff4747, #f44336)'; // Red
    }

    return (
        <div className="gut-bar" style={{ display: 'flex', alignItems: 'center' }}>
            {/* SVG stomach icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                fill="currentColor"
                width="30"
                height="30"
                style={{ marginRight: '20px', color: '#ff4747' }}
            >
                <path d="M32 4C28.14 4 25 7.14 25 11V20H15C10.58 20 7 23.58 7 28V46C7 50.42 10.58 54 15 54H25V60C25 62.21 26.79 64 29 64H35C37.21 64 39 62.21 39 60V54H49C53.42 54 57 50.42 57 46V28C57 23.58 53.42 20 49 20H39V11C39 7.14 35.86 4 32 4zM29 58H35V60H29V58zM49 22H39V60H25V22H15C13.34 22 12 23.34 12 25V46C12 48.66 13.34 50 15 50H25V24H39V50H49C50.66 50 52 48.66 52 46V25C52 23.34 50.66 22 49 22z" />
            </svg>
            <div
                className="gut-fill"
                style={{
                    width: `${(gutHealthScore / maxGut) * 100}%`,
                    background: backgroundColor, // Apply dynamic background color
                    height: '24px' // Set a fixed height for the gut bar
                }}
            >
                {gutHealthScore} %
            </div>
        </div>
    );
};

export default GutBar;
