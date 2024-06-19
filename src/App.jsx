import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Wall from "./Pages/Wall";
import { AuthProvider } from "../context/AuthContext";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/journal" element={<Wall />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
