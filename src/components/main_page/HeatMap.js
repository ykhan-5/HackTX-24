import React from 'react';
import '../../App.css';

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
  
  // Get the current date
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  const currentDay = (currentDayIndex + 6) % 7; // Adjust to get index for Monday as 0
  const todayDate = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

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
        {/* Display the date at the top of the heatmap container */}
        <div className="date-label" style={{
          position: 'absolute', 
          top: '-20px', // Adjust this to position the date label above the heatmap
          left: '50%', // Center it horizontally
          transform: 'translateX(-50%)', // Center it based on its own width
          fontSize: '16px', // Adjust font size
          color: '#ff4747', // Color for visibility
          fontWeight: 'bold', // Optional: make it bold
          zIndex: 1 // Ensure it appears above the heatmap
        }}>
          {todayDate}
        </div>
        
        <div className="calendar">
          {weeklyData.map((data, index) => (
            <div
              key={index}
              className="box"
              style={{ 
                backgroundColor: getColor(data.score),
                border: index === currentDay ? '2px solid red' : 'none', // Highlight the current day
                position: 'relative', // Make this box the positioning context
              }}
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
