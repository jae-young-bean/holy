"use client";

import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth.jsx";

function Write() {
  const [session, setSession] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!content.trim()) {
      setError("일기 내용을 입력해 주세요.");
      setLoading(false);
      return;
    }
    if (!session || !session.user || !session.user.id) {
      setError("로그인 세션이 유효하지 않습니다. 다시 로그인 해주세요.");
      setLoading(false);
      return;
    }
    const { data, error } = await supabase.from("diaries").insert([
      {
        user_id: session.user.id,
        content,
      },
    ]).select();
    if (error) {
      setError(error.message);
      console.error("일기 저장 오류:", error);
    } else if (data && data[0] && data[0].id) {
      navigate("/result", { state: { diaryId: data[0].id } });
    } else {
      setError("일기 저장 후 결과 페이지로 이동에 실패했습니다.");
    }
    setLoading(false);
  };

  if (!session) {
    return <Auth onAuth={() => supabase.auth.getSession().then(({ data: { session } }) => setSession(session))} />;
  }

  return (
    <section className="w-full max-w-xl bg-white/90 rounded-3xl shadow-xl p-10 flex flex-col items-center border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">감정일기 작성</h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <textarea
          className="w-full p-4 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 text-lg min-h-[120px] resize-none bg-blue-50"
          placeholder="오늘의 감정을 자유롭게 적어보세요."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
          disabled={loading}
        >
          {loading ? "저장 중..." : "일기 저장 및 분석"}
        </button>
      </form>
    </section>
  );
}

export default Write; 