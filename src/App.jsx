"use client";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Home from "./Home.jsx";
import Write from "./Write.jsx";
import Result from "./Result.jsx";

function Layout({ children }) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0fa] via-[#f5f8fa] to-[#dbeafe] font-['Inter','Pretendard','sans-serif']">
      <header className="w-full flex items-center justify-between px-8 py-5 bg-white/80 shadow-md backdrop-blur-md fixed top-0 left-0 z-10">
        <Link to="/" className="flex items-center gap-2 select-none">
          <span className="text-2xl font-extrabold tracking-tight text-blue-700">EmotionLog</span>
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link to="/" className={location.pathname === "/" ? "text-blue-700" : "text-gray-500 hover:text-blue-700 transition"}>홈</Link>
          <Link to="/write" className={location.pathname === "/write" ? "text-blue-700" : "text-gray-500 hover:text-blue-700 transition"}>일기 작성</Link>
        </nav>
      </header>
      <main className="pt-24 pb-10 flex flex-col items-center min-h-[80vh]">{children}</main>
      <footer className="w-full text-center text-xs text-gray-400 py-6 bg-white/70 mt-10">© 2024 EmotionLog. 감정을 기록하고, 나를 이해하는 공간.</footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 