import React from 'react';
import Plot from 'react-plotly.js';

// Sample data for demonstration
const sampleData = [
  { time: '08:00', value: 30 },
  { time: '09:00', value: 40 },
  { time: '10:00', value: 50 },
  { time: '11:00', value: 60 },
  { time: '12:00', value: 50 },
  { time: '13:00', value: 70 },
  { time: '14:00', value: 60 },
  { time: '15:00', value: 80 },
  { time: '16:00', value: 90 },
  { time: '17:00', value: 70 },
  { time: '18:00', value: 60 },
];

// Function to calculate line of best fit (linear regression)
const linearRegression = (x, y) => {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((acc, val, idx) => acc + val * y[idx], 0);
  const sumX2 = x.reduce((acc, val) => acc + val * val, 0);
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  return { slope, intercept };
};

const BodyBatteryPlot = () => {
  // Extracting time and value arrays from sampleData
  const times = sampleData.map(d => d.time);
  const values = sampleData.map(d => d.value);

  // Calculate the line of best fit
  const x = times.map((_, i) => i); // x-axis as indices
  const { slope, intercept } = linearRegression(x, values);
  const lineOfFit = x.map(xVal => slope * xVal + intercept);

  return (
    <Plot
      data={[
        {
          x: times,
          y: values,
          type: 'bar',
          marker: { color: 'blue' },
          name: 'Body Battery',
        },
        {
          x: times,
          y: lineOfFit,
          type: 'scatter',
          mode: 'lines',
          name: 'Line of Fit',
          line: { color: 'red', width: 2 },
        },
      ]}
      layout={{
        title: 'Body Battery Timeline',
        xaxis: {
          title: 'Time',
          tickangle: -45,
        },
        yaxis: {
          title: 'Battery Level',
          range: [0, 100],
        },
      }}
      style={{ width: '100%', height: '400px' }}
    />
  );
};

export default BodyBatteryPlot;
