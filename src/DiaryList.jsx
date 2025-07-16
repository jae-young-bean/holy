"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { recommendMusic } from './musicRecommend';

function DiaryList({ user }) {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaries = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('diaries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);
      if (!error) setDiaries(data);
      setLoading(false);
    };
    fetchDiaries();
  }, [user]);

  if (loading) return <div>불러오는 중...</div>;
  if (diaries.length === 0) return <div>작성한 일기가 없습니다.</div>;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-2">최근 감정일기</h2>
      <ul className="space-y-2">
        {diaries.map((d) => (
          <li key={d.id} className="p-3 border rounded">
            <div className="text-sm text-gray-600 mb-1">{new Date(d.created_at).toLocaleString()}</div>
            <div className="mb-1">{d.content}</div>
            <div className="text-xs">감정 분석: <b>{d.emotion || '분석 안됨'}</b></div>
            {d.emotion && (
              <div className="mt-2">
                <span className="text-xs font-semibold">음악 추천:</span>
                <ul className="list-disc list-inside text-xs">
                  {recommendMusic(d.emotion).map((m) => (
                    <li key={m.url}>
                      <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{m.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiaryList; 