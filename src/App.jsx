import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/interview-prep/:sessionId"
            element={<InterviewPrep />}
          />
        </Routes>
      </BrowserRouter>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </>
  );
}

export default App;
