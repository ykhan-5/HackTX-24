import React from 'react';
import '../../App.css';

const HealthBar = ({ health }) => {
  return (
    <div className="health-bar">
      <div className="health-bar-fill" style={{ width: `${health}%` }}></div>
    </div>
  );
};

export default HealthBar;
