// src/components/main_page/Capture.js
import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import heart from "../../assets/heart.png";
import { Link } from "react-router-dom";
import "../../css/capture.css";
import "../../css/navbar.css";
import Navbar from "./Navbar";
import OpenAI from "openai";

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
      const base64Image = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(file);
      });

      const client = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze the following image of food and assess its healthiness in relation to heart health. Provide a category ranking of 'Bad', 'Neutral', or 'Good', and assign a score between -5 to 10 based on the following criteria: Bad: score of -5 through -1 Neutral: score of 1 through 5 Good: score of 6 through 10 Format the response as follows: Category: score, Also warn me about any possible allergens in the food. GIve the score in a simple format as shown before, and then give a list of allergens, no extra explanations",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 300,
      });

      console.log("Analysis Result:", response.choices[0].message.content);
      setAnalysisResult(response.choices[0].message.content);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-between p-5">
        {/* Left Column: Old Scores */}
        <div className="flex-1 p-3 border border-gray-300 mr-3">
          <h3 className="text-lg font-semibold mb-3">Old Scores</h3>
          <ul className="space-y-2">
            <li>Score 1: 85</li>
            <li>Score 2: 90</li>
            <li>Score 3: 88</li>
          </ul>
        </div>

        {/* Middle Column: Image Upload */}
        <div className="flex-1 p-3 border border-gray-300 mx-3">
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
        <div className="flex-1 p-3 border border-gray-300 ml-3">
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
    </div >
  );
};

export default Capture;
