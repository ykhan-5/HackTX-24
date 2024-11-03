// src/App.js
import React from "react";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import Header from "./components/header"
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/main_page"; // Home page with main components
import Capture from "./components/main_page/Capture"; // Separate Capture page

function App() {
  const routesArray = [
    { path: "*", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/home", element: <Home /> },
    { path: "/capture", element: <Capture /> }, // Route for Capture page
  ];

  const routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
