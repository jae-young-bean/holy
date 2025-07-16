"use client";
import React from "react";
import { useLocation, Link } from "react-router-dom";

// 샘플 감정 분석 및 음악 추천 함수 (실제 분석 로직은 추후 연동)
const sampleEmotions = [
  { label: "기쁨", color: "#60a5fa", emoji: "😊" },
  { label: "슬픔", color: "#64748b", emoji: "😢" },
  { label: "분노", color: "#f87171", emoji: "😡" },
  { label: "평온", color: "#38bdf8", emoji: "😌" },
  { label: "불안", color: "#818cf8", emoji: "😰" },
];
const sampleMusic = [
  { title: "Blue Hour - TXT", url: "https://www.youtube.com/watch?v=Vd9QkWsd5p4" },
  { title: "Coldplay - Paradise", url: "https://www.youtube.com/watch?v=1G4isv_Fylg" },
  { title: "IU - Love Poem", url: "https://www.youtube.com/watch?v=0-q1KafFCLU" },
];

function Result() {
  const location = useLocation();
  const content = location.state?.content || "";
  // 임시로 랜덤 감정 분석 결과
  const emotion = sampleEmotions[Math.floor(Math.random() * sampleEmotions.length)];
  return (
    <section className="w-full max-w-xl bg-white/90 rounded-3xl shadow-xl p-10 flex flex-col items-center border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">감정 분석 결과</h2>
      <div className="flex flex-col items-center gap-2 mb-6">
        <span className="text-5xl" style={{ color: emotion.color }}>{emotion.emoji}</span>
        <span className="text-xl font-semibold" style={{ color: emotion.color }}>{emotion.label}</span>
      </div>
      <div className="w-full bg-blue-50 rounded-xl p-4 text-gray-700 mb-6">
        <div className="text-sm text-gray-400 mb-1">내가 쓴 일기</div>
        <div className="text-base">{content}</div>
      </div>
      <div className="w-full mb-6">
        <div className="text-sm text-gray-400 mb-2">추천 음악</div>
        <ul className="space-y-2">
          {sampleMusic.map((m) => (
            <li key={m.url}>
              <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium hover:text-blue-800 transition">{m.title}</a>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/write" className="mt-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition">다시 작성하기</Link>
    </section>
  );
}

export default Result; 