"use client";

import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function Auth({ onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    let result;
    if (isSignUp) {
      result = await supabase.auth.signUp({ email, password });
    } else {
      result = await supabase.auth.signInWithPassword({ email, password });
    }
    if (result.error) {
      setError(result.error.message);
    } else {
      onAuth();
    }
    setLoading(false);
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">{isSignUp ? '회원가입' : '로그인'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? '처리 중...' : isSignUp ? '회원가입' : '로그인'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          className="text-blue-500 underline"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
        </button>
      </div>
    </div>
  );
}

export default Auth; 