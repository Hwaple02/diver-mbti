import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="card">
      <h1 className="h1">다이버 MBTI 테스트</h1>
      <p className="p">
        이미지를 클릭해서 답변하세요. 결과는 서버에 저장되지 않습니다.
      </p>
      <Link className="btn" to="/quiz">시작하기</Link>
    </div>
  )
}
