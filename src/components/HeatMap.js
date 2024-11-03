import React from 'react';
import '../App.css';

export default function HeatMap() {
  // Sample data for demonstration, use your actual data logic
  const weeklyData = [
    { day: 'Mon', score: 1 },
    { day: 'Tue', score: 3 },
    { day: 'Wed', score: 2 },
    { day: 'Thu', score: 4 },
    { day: 'Fri', score: 0 },
    { day: 'Sat', score: 2 },
    { day: 'Sun', score: 1 }
  ];
  const weeklyScore = weeklyData.reduce((acc, curr) => acc + curr.score, 0);

  // Function to determine the color based on the score
  const getColor = (score) => {
    if (score === 0) return '#ffffff'; // No contributions
    if (score <= 2) return '#e0f7fa'; // Low contributions
    if (score <= 4) return '#80deea'; // Medium contributions
    return '#00bcd4'; // High contributions
  };

  return (
    <div className="heat-map-content">
      {/* Heatmap Calendar Section */}
      <div className="heatmap-container">
        <div className="calendar">
          {weeklyData.map((data, index) => (
            <div
              key={index}
              className="box"
              style={{ backgroundColor: getColor(data.score) }}
            >
              <span className="day-text">{data.day}</span>
              <span className="score-text">{data.score}</span>
            </div>
          ))}
          {/* Extra box for weekly score */}
          <div className="week-box">
            <span className="week-text">Weekly Score</span>
            <span className="score-text">{weeklyScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
