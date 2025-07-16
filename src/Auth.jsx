"use client";

import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

function Auth({ onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSignUpSuccess(false);
    let result;
    if (isSignUp) {
      result = await supabase.auth.signUp({ email, password });
      if (result.error) {
        setError(result.error.message);
      } else {
        setSignUpSuccess(true);
        setIsSignUp(false);
      }
    } else {
      result = await supabase.auth.signInWithPassword({ email, password });
      if (result.error) {
        setError(result.error.message);
      } else {
        onAuth && onAuth();
        navigate('/');
      }
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
        {signUpSuccess && <div className="text-green-600 text-sm">회원가입이 완료되었습니다! 로그인 해주세요.</div>}
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
          onClick={() => { setIsSignUp(!isSignUp); setError(''); setSignUpSuccess(false); }}
        >
          {isSignUp ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
        </button>
      </div>
    </div>
  );
}

export default Auth; 