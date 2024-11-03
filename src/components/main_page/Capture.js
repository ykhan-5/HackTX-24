// Capture.js
import React, { useState } from "react";
import Navbar from "./Navbar";
import heart from "../../assets/heart.png";
import "../../css/capture.css";

const Capture = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      // Placeholder function for image analysis
      const base64Image = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(file);
      });

      const analysis = await analyzeImage(base64Image);
      setAnalysisResult(analysis);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const analyzeImage = async (base64Image) => {
    return "Sample Analysis Result: Good - Score: 8";
  };

  return (
    <div className="capture-page">
      <Navbar />
      <div className="main-content flex justify-between p-5">
        {/* Left Column: Old Scores */}
        <div className="left-column flex-1 p-3 border border-gray-300 mr-3">
          <h3 className="text-lg font-semibold mb-3">Old Scores</h3>
          <ul className="space-y-2">
            <li>Score 1: 85</li>
            <li>Score 2: 90</li>
            <li>Score 3: 88</li>
          </ul>
        </div>

        {/* Middle Column: Image Upload */}
        <div className="middle-column flex-1 p-3 border border-gray-300 mx-3">
          <h3 className="text-lg font-semibold mb-3">Upload Image</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {loading && <p className="mt-2 text-blue-600">Analyzing image...</p>}
          {error && <p className="mt-2 text-red-600">{error}</p>}
          {analysisResult && (
            <div className="mt-3">
              <p className="text-green-600">Analysis Result: {analysisResult}</p>
            </div>
          )}
        </div>

        {/* Right Column: Vitals */}
        <div className="right-column flex-1 p-3 border border-gray-300 ml-3">
          <h3 className="text-lg font-semibold mb-3">Current Vitals</h3>
          <ul className="space-y-2">
            <li>Current Score: 92</li>
            <li className="flex items-center">
              <img src={heart} className="w-6 mr-2" alt="heart" />
              45 / 50
            </li>
            <li className="flex items-center">
              <img src={heart} className="w-6 mr-2" alt="heart" />
              23 / 50
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Capture;
