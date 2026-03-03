const BASE = import.meta.env.BASE_URL

export const QUESTIONS = [
  {
    id: 'q1',
    title: '새로운 동아리 부스들이 가득하다! 당신은?',
    options: [
      {id: 'q1a', label: '"재밌어 보여!" 일단 들어가서 체험한다', img: `${BASE}images/q1_a.jpg`, score: {E: 1}},
      {id: 'q1b', label: '"뭐 하는 데지?" 밖에서 설명을 먼저 읽는다', img: `${BASE}images/q1_b.jpg`, score: {I: 1}},
    ],
  },
  {
    id: 'q2',
    title: '드디어 입수 직전! 당신의 머릿속에는?',
    options: [
      {id: 'q2a', label: '"빨리 들어가서 고래 보고 싶다!"', img: `${BASE}images/q2_a.jpg`, score: {A: 1}},
      {id: 'q2b', label: '"장비 체크 한 번만 더 해야지."', img: `${BASE}images/q2_b.jpg`, score: {S: 1}},
    ],
  },
  {
    id: 'q3',
    title: '물속에서 엄청나게 큰 고래상어를 만난다면?',
    options: [
      {id: 'q3a', label: '수중 카메라 셔터를 미친 듯이 누른다', img: `${BASE}images/q3_a.jpg`, score: {B: 1}},
      {id: 'q3b', label: '거리를 유지하며 고래의 눈동자를 관찰한다', img: `${BASE}images/q3_b.webp`, score: {D: 1}},
    ],
  },
  {
    id: 'q4',
    title: '다이빙이 끝난 후 뒤풀이 시간, 당신은?',
    options: [
      {id: 'q4a', label: '"오늘 대박이었죠?" 모두와 신나게 떠든다', img: `${BASE}images/q4_a.jpg`, score: {E: 1}},
      {id: 'q4b', label: '"오늘 진짜 좋았다.." 조용히 여운을 즐긴다', img: `${BASE}images/q4_b.jpg`, score: {I: 1}},
    ],
  },
  {
    id: 'q5',
    title: '둘 중 더 끌리는 다이빙 코스는?',
    options: [
      {id: 'q5a', label: '한 번도 안 가본 미지의 난파선 탐험', img: `${BASE}images/q5_a.jpg`, score: {A: 1}},
      {id: 'q5b', label: '알록달록 산호초가 있는 평화로운 바다', img: `${BASE}images/q5_b.webp`, score: {S: 1}},
    ],
  },
  {
    id: 'q6',
    title: '당신이 더 소장하고 싶은 다이빙 사진은?',
    options: [
      {id: 'q6a', label: '광활한 바다를 배경으로 한 내 뒷모습', img: `${BASE}images/q6_a.webp`, score: {B: 1}},
      {id: 'q6b', label: '산호 틈에 숨은 귀여운 니모의 초근접샷', img: `${BASE}images/q6_b.webp`, score: {D: 1}},
    ],
  },
  {
    id: 'q7',
    title: '다이빙 마친 후, 로그북을 작성한다면 언제?',
    options: [
      {id: 'q7a', label: '피곤하니 일단 쉬고 여운을 즐기다 나중에 생각날 때 쓴다', img: `${BASE}images/q7_a.webp`, score: {E: 1}},
      {id: 'q7b', label: '기억 생생할 때 바로 로그북을 쓴다', img: `${BASE}images/q7_b.png`, score: {I: 1}},
    ],
  },
  {
    id: 'q8',
    title: '마지막 날, 선택할 수 있는 추가 일정이 생겼다. 당신은?',
    options: [
      {id: 'q8a', label: '"한 번뿐이야!" 즉흥으로 새로운 포인트를 추가한다', img: `${BASE}images/q8_a.png`, score: {A: 1}},
      {id: 'q8b', label: '"안전하게 마무리!" 익숙한 포인트에서 컨디션을 우선한다', img: `${BASE}images/q8_b.png`, score: {S: 1}},
    ],
  },
  {
    id: 'q9',
    title: '둘 중 더 끌리는 다이빙은?',
    options: [
      {
        id: 'q9a',
        label: '🌊 햇살이 비치는 주간 다이빙 — 탁 트인 시야와 전체 풍경을 즐긴다',
        img: `${BASE}images/q9_a.jpeg`,
        score: {B: 1},
      },
      {
        id: 'q9b',
        label: '🌙 어둠 속 야간 다이빙 — 라이트로 비춘 작은 생물을 찾아 집중한다',
        img: `${BASE}images/q9_b.jpg`,
        score: {D: 1},
      },
    ],
  }
]