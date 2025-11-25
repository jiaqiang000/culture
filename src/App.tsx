import Encyclopedia from "@/pages/Encyclopedia";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import { Empty } from "./components/Empty";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/encyclopedia" element={<Encyclopedia />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/daily" element={<Empty />} />
        <Route path="/quiz" element={<Empty />} />
        <Route path="/etiquette" element={<Empty />} />
        <Route path="/profile" element={<Empty />} />
        <Route path="/events/mid-autumn" element={<Empty />} />
        <Route path="/events/*" element={<Empty />} />
        <Route path="*" element={<Empty />} />
      </Routes>
    </AuthContext.Provider>
  );
}
// <Route path="/encyclopedia" element={<Empty />} />
