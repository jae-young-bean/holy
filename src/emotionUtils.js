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

// 감정별 키워드
const emotionKeywords = {
  분노: ["화", "짜증", "분노", "열받", "성질", "폭발"],
  슬픔: ["슬프", "눈물", "우울", "상실", "외롭", "아프"],
  기쁨: ["기쁘", "행복", "즐겁", "웃음", "좋다", "설렘"],
  평온: ["평온", "차분", "안정", "편안", "여유", "느긋"],
  불안: ["불안", "걱정", "초조", "두렵", "긴장", "불편"],
};

export function analyzeEmotionPercent(text) {
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
  // 퍼센트 계산
  const result = {};
  for (const emotion of Object.keys(emotionKeywords)) {
    result[emotion] = total > 0 ? Math.round((counts[emotion] / total) * 100) : 0;
  }
  return result;
} 