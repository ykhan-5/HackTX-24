import React from "react";
import heart from "../assets/heart.png";

const Capture = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      {/* Left Column: Old Scores */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          border: "1px solid #ccc",
          marginRight: "10px",
        }}
      >
        <h3>Old Scores</h3>
        <ul>
          <li>Score 1: 85</li>
          <li>Score 2: 90</li>
          <li>Score 3: 88</li>
          {/* Add more scores as needed */}
        </ul>
      </div>

      {/* Middle Column: Image Upload */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          border: "1px solid #ccc",
          margin: "0 10px",
        }}
      >
        <h3>Upload Image</h3>
        <input type="file" accept="image/*" />
      </div>

      {/* Right Column: Vitals */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          border: "1px solid #ccc",
          marginLeft: "10px",
        }}
      >
        <h3>Current Vitals</h3>
        <ul>
          <li>Current Score: 92</li>
          <li>
            <img
              src={heart}
              style={{
                width: "24px",
                verticalAlign: "middle",
                marginRight: "8px",
              }}
            />
            45 / 50
          </li>
          <li>
            <img
              src={heart}
              style={{
                width: "24px",
                verticalAlign: "middle",
                marginRight: "8px",
              }}
            />
            23 / 50
          </li>
          {/* Add more vitals as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Capture;
