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

  const emotionPercents = analyzeEmotionPercent(diary.content);
  const sortedEmotions = Object.entries(emotionPercents).sort((a, b) => b[1] - a[1]);
  const topEmotion = sortedEmotions[0][0];
  const musicList = recommendMusic(topEmotion);

  return (
    <section className="w-full max-w-xl bg-white/90 rounded-3xl shadow-xl p-10 flex flex-col items-center border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">감정 분석 결과</h2>
      <div className="flex flex-col items-center gap-2 mb-6">
        <span className="text-5xl" style={{ color: emotionMeta[topEmotion].color }}>{emotionMeta[topEmotion].emoji}</span>
        <span className="text-xl font-semibold" style={{ color: emotionMeta[topEmotion].color }}>{topEmotion}</span>
      </div>
      <div className="w-full bg-blue-50 rounded-xl p-4 text-gray-700 mb-6">
        <div className="text-sm text-gray-400 mb-1">내가 쓴 일기</div>
        <div className="text-base">{diary.content}</div>
      </div>
      <div className="w-full mb-6">
        <div className="text-sm text-gray-400 mb-2">감정별 분석</div>
        <ul className="space-y-2">
          {sortedEmotions.map(([emotion, percent]) => (
            <li key={emotion} className="flex items-center gap-2">
              <span className="w-16 text-sm font-medium" style={{ color: emotionMeta[emotion].color }}>{emotion}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                <div className="h-4 rounded-full" style={{ width: `${percent}%`, background: emotionMeta[emotion].color, transition: 'width 0.5s' }}></div>
              </div>
              <span className="w-10 text-right text-sm font-bold" style={{ color: emotionMeta[emotion].color }}>{percent}%</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full mb-6">
        <div className="text-sm text-gray-400 mb-2">추천 음악</div>
        <ul className="space-y-2">
          {musicList.map((m) => (
            <li key={m.url}>
              <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium hover:text-blue-800 transition">{m.title}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4 mt-4">
        <Link to="/write" className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition">다시 작성하기</Link>
        <Link to="/" className="bg-white border border-blue-400 text-blue-700 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-blue-50 transition">홈으로</Link>
      </div>
    </section>
  );
}

export default Result; 