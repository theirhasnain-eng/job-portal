import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Browsjob from "./pages/Browsjob";
import JobDetails from "./pages/JobDetails";
import PostJob from "./components/PostJob";
import EditJob from "./components/EditJob";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import ProtectedRoute from "./components/ProtctedRoutes"; 
import AdminDashboard from "./pages/AdminDashboard";
import Navebar from "./components/Navebar";
import Footer from "./components/Footer";


function App() {
  return (
    <>
    <Navebar/>
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/browsjobs" element={<Browsjob />} />
      <Route path="/jobdetails/:id" element={<JobDetails />} />
      <Route
        path="/candidatedashboard"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiterdashboard"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/postjob"
        element={
          <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
            <PostJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/editjob/:id"
        element={
          <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
            <EditJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      {/* Catch-all: unknown URLs go back home instead of a blank page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;