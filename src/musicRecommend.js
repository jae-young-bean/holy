// 감정별 음악 추천 목록
const musicMap = {
  '긍정': [
    { title: 'Pharrell Williams - Happy', url: 'https://www.youtube.com/watch?v=ZbZSe6N_BXs' },
    { title: 'BTS - Dynamite', url: 'https://www.youtube.com/watch?v=gdZLi9oWNZg' },
  ],
  '부정': [
    { title: '김광석 - 바람이 불어오는 곳', url: 'https://www.youtube.com/watch?v=6QbH2C5Nqg8' },
    { title: 'Adele - Someone Like You', url: 'https://www.youtube.com/watch?v=hLQl3WQQoQ0' },
  ],
  '중립': [
    { title: 'IU - 밤편지', url: 'https://www.youtube.com/watch?v=BzYnNdJhZQw' },
    { title: 'Ed Sheeran - Photograph', url: 'https://www.youtube.com/watch?v=SPKBtZHuzKY' },
  ],
};

export function recommendMusic(emotion) {
  return musicMap[emotion] || [];
} 