// 간단한 키워드 기반 감정 분석 함수(구버전)는 완전히 삭제합니다.
// export function analyzeEmotion(text) { ... } <= 이 부분 전체 삭제

// 감정별 키워드(초기값)
export const baseEmotionKeywords = {
  joy: ["행복", "기쁨", "좋다", "감사", "즐겁다", "사랑", "신난다", "웃다", "기쁘", "즐겁", "웃음", "설렘", "최고", "추천"],
  sadness: ["슬프다", "우울", "눈물", "상실", "외롭다", "아프다", "아쉽다", "실망", "힘들다", "외롭", "아프", "우울"],
  anger: ["화난다", "짜증", "분노", "열받", "성질", "폭발", "싫다", "최악", "별로", "화", "짜증"],
  fear: ["불안", "걱정", "초조", "두렵다", "긴장", "불편", "무섭다", "공포"],
  surprise: ["놀랍다", "충격", "반전", "놀람"],
};

// 감정 키워드 자동 확장 함수 (빈도 기반)
export function autoExpandKeywords(reviews, topN = 100) {
  const wordCounts = {};
  reviews.forEach(text => {
    const words = text.split(/\s+/);
    words.forEach(word => {
      if (word.length > 1) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
  });
  // 상위 N개 단어 추출
  const sorted = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, topN).map(([w]) => w);
}

// 기존 키워드 기반 감정 분석 함수는 analyzeEmotionLocal로 이름 변경
export function analyzeEmotionLocal(text, emotionKeywords = baseEmotionKeywords) {
  const counts = {};
  let total = 0;
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    counts[emotion] = 0;
    for (const word of keywords) {
      const regex = new RegExp(word, "gi");
      const matches = text.match(regex);
      if (matches) {
        counts[emotion] += matches.length;
        total += matches.length;
      }
    }
  }
  // 등장한 감정만 비율(%) 계산
  const result = {};
  for (const [emotion, count] of Object.entries(counts)) {
    if (count > 0 && total > 0) {
      result[emotion] = Math.round((count / total) * 100);
    }
  }
  return result;
}

// Edge Function으로 감정 분석 요청
export async function analyzeEmotion(text) {
  // 실제 배포된 함수 엔드포인트로 변경 필요
  const endpoint = "https://<project-ref>.functions.supabase.co/swift-endpoint";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ diary: text }),
  });
  if (!response.ok) {
    throw new Error("감정 분석 요청 실패");
  }
  const data = await response.json();
  return data.result;
}

export function analyzeEmotionPercent(text) {
  const counts = {};
  let total = 0;
  for (const [emotion, keywords] of Object.entries(baseEmotionKeywords)) {
    counts[emotion] = 0;
    for (const word of keywords) {
      const regex = new RegExp(word, "gi");
      const matches = text.match(regex);
      if (matches) {
        counts[emotion] += matches.length;
        total += matches.length;
      }
    }
  }
  // 퍼센트 계산
  const result = {};
  for (const emotion of Object.keys(baseEmotionKeywords)) {
    result[emotion] = total > 0 ? Math.round((counts[emotion] / total) * 100) : 0;
  }
  return result;
} 