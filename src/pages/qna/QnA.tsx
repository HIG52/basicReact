import React from 'react';
import '../../styles/pages.css';

const QnA: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>Q&A</h1>
          <p className="page-description">궁금한 점을 물어보고 답변을 받아보세요.</p>
        </div>
      </div>
      
      <div className="container">
        <div className="qna-container">
          <div className="qna-header">
            <div className="qna-search">
              <input type="text" placeholder="검색어를 입력하세요" className="search-input" />
              <button className="search-btn">검색</button>
            </div>
            <button className="write-btn">질문하기</button>
          </div>
          
          <div className="qna-categories">
            <button className="category-btn active">전체</button>
            <button className="category-btn">답변완료</button>
            <button className="category-btn">답변대기</button>
            <button className="category-btn">인기질문</button>
          </div>
          
          <div className="qna-list">
            <div className="qna-item">
              <div className="qna-title">
                <span className="status answered">답변완료</span>
                <h3>React에서 상태관리는 어떻게 하나요?</h3>
              </div>
              <div className="qna-info">
                <span>작성자: 김철수</span>
                <span>작성일: 2024-04-10</span>
                <span>조회: 42</span>
                <span>답변: 3</span>
              </div>
            </div>
            
            <div className="qna-item">
              <div className="qna-title">
                <span className="status waiting">답변대기</span>
                <h3>TypeScript 사용시 주의사항이 궁금합니다.</h3>
              </div>
              <div className="qna-info">
                <span>작성자: 이영희</span>
                <span>작성일: 2024-04-09</span>
                <span>조회: 28</span>
                <span>답변: 0</span>
              </div>
            </div>
            
            <div className="qna-item">
              <div className="qna-title">
                <span className="status hot">인기질문</span>
                <h3>프론트엔드 개발자 취업 준비하기</h3>
              </div>
              <div className="qna-info">
                <span>작성자: 박지성</span>
                <span>작성일: 2024-04-08</span>
                <span>조회: 156</span>
                <span>답변: 12</span>
              </div>
            </div>
          </div>
          
          <div className="board-pagination">
            <button className="pagination-btn">&lt;</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn">4</button>
            <button className="pagination-btn">5</button>
            <button className="pagination-btn">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QnA; 