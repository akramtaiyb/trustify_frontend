import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Wall from "./Pages/Wall";
import Profile from "./Pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "../context/PrivateRoute";
import PublicRoute from "../context/PublicRoute";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PublicRoute element={Login} />} />
          <Route path="/signup" element={<PublicRoute element={SignUp} />} />
          <Route path="/journal" element={<PrivateRoute element={Wall} />} />
          <Route
            path="/profile/:username"
            element={<PrivateRoute element={Profile} />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
