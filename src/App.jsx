import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "./context/userContext";
import SessionLoader from "./components/Loader/SessionLoader";
import SpinnerLoader from "./components/Loader/SpinnerLoader";

// Lazy loaded pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/Auth/Login"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const Dashboard = lazy(() => import("./pages/Home/Dashboard"));
const InterviewPrep = lazy(() => import("./pages/InterviewPrep/InterviewPrep"));

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="h-screen w-screen bg-black flex justify-center items-center">
              <SpinnerLoader />
            </div>
          }
        >
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
        </Suspense>
      </BrowserRouter>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </UserContextProvider>
  );
}

export default App;
