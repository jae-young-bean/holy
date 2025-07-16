"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Link, useLocation } from "react-router-dom";
import { analyzeEmotionPercent } from "./emotionUtils";
import { recommendMusic } from "./musicRecommend";

const emotionMeta = {
  분노: { color: "#f87171", emoji: "😡" },
  슬픔: { color: "#64748b", emoji: "😢" },
  기쁨: { color: "#60a5fa", emoji: "😊" },
  평온: { color: "#38bdf8", emoji: "😌" },
  불안: { color: "#818cf8", emoji: "😰" },
};

// 영어 감정명 → 한글 감정명 매핑
const emotionMap = {
  joy: "기쁨",
  sadness: "슬픔",
  anger: "분노",
  fear: "불안",
  surprise: "평온", // 필요시 "놀람" 등으로 조정
};

function Result() {
  const [session, setSession] = useState(null);
  const [diary, setDiary] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const diaryId = location.state?.diaryId;
        let query = supabase.from("emotion_diary_entries").select("*").eq("user_id", session.user.id);
        if (diaryId) {
          query = query.eq("id", diaryId);
        } else {
          query = query.order("created_at", { ascending: false }).limit(1);
        }
        query.then(({ data }) => {
          setDiary(data && data[0]);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, [location.state]);

  if (loading) return <div className="text-center text-gray-500">불러오는 중...</div>;
  if (!session) return <div className="text-center text-gray-500">로그인이 필요합니다.</div>;
  if (!diary) return <div className="text-center text-gray-500">작성한 일기가 없습니다.<br/><Link to="/write" className="text-blue-600 underline">일기 작성하러 가기</Link></div>;

  return (
    <section className="w-full max-w-xl bg-white/90 rounded-3xl shadow-xl p-10 flex flex-col items-center border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">감정 분석 결과</h2>
      <div className="w-full bg-blue-50 rounded-xl p-4 text-gray-700 mb-6">
        <div className="text-sm text-gray-400 mb-1">내가 쓴 일기</div>
        <div className="text-base">{diary.content}</div>
      </div>
      <div className="w-full mb-6">
        <div className="text-sm text-gray-400 mb-2">AI 분석 및 추천</div>
        <div className="whitespace-pre-line text-base font-medium text-gray-800 border border-blue-100 rounded-xl bg-blue-50 p-4 min-h-[100px]">
          {diary.emotion ? diary.emotion : "분석 결과가 없습니다."}
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <Link to="/write" className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition">다시 작성하기</Link>
        <Link to="/" className="bg-white border border-blue-400 text-blue-700 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-blue-50 transition">홈으로</Link>
      </div>
    </section>
  );
}

export default Result; 