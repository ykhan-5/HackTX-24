import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.js"; 
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const HealthScores = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const { currentUser } = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser; // Get the current user
      if (user) {
        const userDocRef = doc(db, "users", user.uid); // Reference to the user's document
        const userDoc = await getDoc(userDocRef); // Fetch the document

        if (userDoc.exists()) {
          setHealthData(userDoc.data()); // Set health data to state
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("No user is signed in.");
      }
      setLoading(false);
    };

    fetchData();
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {healthData ? (
        <div>
          <h2>Health Scores</h2>
          <p>Gut Health Score: {healthData.GutHealthScore}</p>
          <p>Heart Health Score: {healthData.HeartHealthScore}</p>
          <p>Total Health Score: {healthData.TotalHealthScore}</p>
          <p>Last Generated: {healthData.LastGenerated.join(", ")}</p>
        </div>
      ) : (
        <p>No health data found.</p>
      )}
    </div>
  );
};

export default HealthScores;
