// 간단한 키워드 기반 감정 분석
export function analyzeEmotion(text) {
  const positive = ["행복", "기쁨", "좋다", "감사", "즐겁다", "사랑", "신난다", "웃다"];
  const negative = ["슬프다", "우울", "화난다", "짜증", "불안", "힘들다", "외롭다", "싫다"];

  let score = 0;
  for (const word of positive) {
    if (text.includes(word)) score++;
  }
  for (const word of negative) {
    if (text.includes(word)) score--;
  }
  if (score > 0) return "긍정";
  if (score < 0) return "부정";
  return "중립";
} 