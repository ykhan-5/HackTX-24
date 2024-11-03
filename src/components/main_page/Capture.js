import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import heart from "../../assets/heart.png";
import { Link } from "react-router-dom";
import "../../css/capture.css";
import "../../css/navbar.css";
import Navbar from "./Navbar";
import OpenAI from "openai";
import { db } from "../../firebase/firebase.js";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const Capture = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [healthBoost, setHealthBoost] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        try {
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setHealthData(userDoc.data());
          } else {
            const initialHealthData = {
              GutHealthScore: 0,
              HeartHealthScore: 0,
              LastGenerated: [],
              TotalHealthScore: 0,
            };

            try {
              await setDoc(userDocRef, initialHealthData);
              setHealthData(initialHealthData);
            } catch (error) {
              console.error("Error initializing health data:", error);
              setError("Failed to initialize health data.");
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch health data.");
        }
      } else {
        console.log("No user is signed in.");
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const updateHealthScores = async (score) => {
    if (!user || score === null) return;

    const userDocRef = doc(db, "users", user.uid);
    try {
      const userDoc = await getDoc(userDocRef);
      const currentData = userDoc.exists()
        ? userDoc.data()
        : {
            GutHealthScore: 0,
            HeartHealthScore: 0,
            LastGenerated: [],
            TotalHealthScore: 0,
          };

      // Update health scores
      const updatedGutScore = Math.min(
        100,
        Math.max(0, currentData.GutHealthScore + score)
      );
      const updatedHeartScore = Math.min(
        100,
        Math.max(0, currentData.HeartHealthScore + score)
      );

      // Calculate total health score
      const updatedTotalScore = (updatedGutScore + updatedHeartScore) / 2;

      // Get current LastGenerated array or initialize if it doesn't exist
      const currentLastGenerated = currentData.LastGenerated || [];

      // Add new score to LastGenerated array
      const updatedLastGenerated = [...currentLastGenerated, score];

      const updates = {
        GutHealthScore: updatedGutScore,
        HeartHealthScore: updatedHeartScore,
        LastGenerated: updatedLastGenerated,
        TotalHealthScore: updatedTotalScore,
      };

      await updateDoc(userDocRef, updates);
      setHealthData(updates);
      console.log("Health scores updated successfully");
    } catch (error) {
      console.error("Error updating health scores:", error);
      setError("Failed to update health scores.");
    }
  };

  const extractHealthScore = (analysisText) => {
    if (analysisText === "Not a Food") return null;

    // Find the number in the text using regex
    const match = analysisText.match(/-?\d+/);
    if (match) {
      return parseInt(match[0]);
    }
    return null;
  };

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
                text: "Analyze the image of food and assess its healthiness for heart health. Provide a category ranking of 'Bad', 'Neutral', or 'Good' with a score of -5 to 10: Bad (-5 to -1), Neutral (1 to 5), Good (6 to 10). Format as 'Category: score'. List allergens separated by * or respond with 'Not a Food' if it is not food.",
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

      const analysisText = response.choices[0].message.content;
      console.log("Analysis Result:", analysisText);
      setAnalysisResult(analysisText);

      // Extract and set the health boost score
      const score = extractHealthScore(analysisText);
      setHealthBoost(score);
      console.log("Health Boost Score:", score);

      // Update the health scores in the database
      if (score !== null) {
        await updateHealthScores(score);
      }
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
      <div className="main-content flex justify-between p-5">
        {/* Left Column: Old Scores */}
        <div className="left-column flex-1 p-3 border border-gray-300 mr-3">
          <h3 className="text-lg font-semibold mb-3">Previous Scores</h3>
          <ul className="space-y-2">
            {healthData?.LastGenerated?.slice(-5).map((score, index) => (
              <li key={index}>
                Score {index + 1}: {score}
              </li>
            ))}
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
              <p className="text-green-600">
                Analysis Result: {analysisResult}
              </p>
              {healthBoost !== null && (
                <p className="text-blue-600">Health Boost: {healthBoost}</p>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Vitals */}
        <div className="right-column flex-1 p-3 border border-gray-300 ml-3">
          <h3 className="text-lg font-semibold mb-3">Current Vitals</h3>
          <ul className="space-y-2">
            <li>
              Total Health Score: {healthData?.TotalHealthScore?.toFixed(1)}
            </li>
            <li className="flex items-center">
              <img src={heart} className="w-6 mr-2" alt="heart" />
              Gut Health: {healthData?.GutHealthScore}
            </li>
            <li className="flex items-center">
              <img src={heart} className="w-6 mr-2" alt="heart" />
              Heart Health: {healthData?.HeartHealthScore}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Capture;
