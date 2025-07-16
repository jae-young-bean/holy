"use client";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-xl p-12 flex flex-col items-center gap-8 border border-blue-100">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-2 tracking-tight">EmotionLog</h1>
      <p className="text-lg text-gray-600 text-center mb-4">
        감정을 기록하고, 분석하고, 음악으로 위로받는<br/>
        <span className="font-bold text-blue-700">2025년형 감정일기 웹서비스</span>
      </p>
      <ul className="text-gray-500 text-base space-y-2 mb-6">
        <li>📝 감정일기 작성</li>
        <li>🔍 감정 분석 및 시각화</li>
        <li>🎵 감정에 맞는 음악 추천</li>
        <li>🔒 안전한 개인정보 보호</li>
      </ul>
      <Link to="/write" className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg hover:scale-105 transition">지금 시작하기</Link>
    </section>
  );
}

export default Home; 