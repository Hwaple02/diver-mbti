const BASE = import.meta.env.BASE_URL

export const QUESTIONS = [
  {
    id: 'q1',
    title: '다이빙 전 브리핑에서 당신은?',
    options: [
      { id: 'q1a', label: '사람들과 대화하며 분위기를 주도한다', img: `${BASE}images/q1_a.webp`, score: { E: 1 } },
      { id: 'q1b', label: '조용히 듣고 필요한 질문만 한다', img: `${BASE}images/q1_b.webp`, score: { I: 1 } },
    ],
  },
  {
    id: 'q2',
    title: '새 포인트에서 먼저 보는 것은?',
    options: [
      { id: 'q2a', label: '수심/시야/조류 같은 현재 조건', img: `${BASE}images/q2_a.webp`, score: { S: 1 } },
      { id: 'q2b', label: '어떤 장면이 펼쳐질지 전체 그림', img: `${BASE}images/q2_b.webp`, score: { N: 1 } },
    ],
  },
  {
    id: 'q3',
    title: '버디가 실수를 했을 때 당신은?',
    options: [
      { id: 'q3a', label: '원인과 절차를 빠르게 정리한다', img: `${BASE}images/q3_a.webp`, score: { T: 1 } },
      { id: 'q3b', label: '감정과 상태를 먼저 살핀다', img: `${BASE}images/q3_b.webp`, score: { F: 1 } },
    ],
  },
  {
    id: 'q4',
    title: '다이브 플랜은 보통?',
    options: [
      { id: 'q4a', label: '체크리스트와 계획을 선호한다', img: `${BASE}images/q4_a.webp`, score: { J: 1 } },
      { id: 'q4b', label: '상황에 맞춰 유연하게 바꾼다', img: `${BASE}images/q1_a.webp`, score: { P: 1 } },
    ],
  },
]
