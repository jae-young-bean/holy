"use client";

import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { analyzeEmotionWithAI } from './emotionUtils';

function DiaryForm({ user, onSubmit }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [emotion, setEmotion] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const emotionResult = await analyzeEmotionWithAI(content);
      const { error } = await supabase.from('diaries').insert([
        {
          user_id: user.id,
          content,
          emotion: emotionResult,
        },
      ]);
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        setEmotion(emotionResult);
        setContent('');
        if (onSubmit) onSubmit();
      }
    } catch (err) {
      setError('감정 분석 또는 저장 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <textarea
        className="w-full p-2 border rounded"
        rows={5}
        placeholder="오늘의 감정을 자유롭게 적어보세요."
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && (
        <div className="text-green-600 text-sm">
          일기가 저장되었습니다!<br />
          감정 분석 결과:<br />
          <b>{emotion}</b>
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? '저장 중...' : '일기 저장'}
      </button>
    </form>
  );
}

export default DiaryForm; 