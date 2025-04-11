import React from 'react';
import '../styles/pages.css';

const Board: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>자유게시판</h1>
          <p className="page-description">자유롭게 의견을 나누고 소통하는 공간입니다.</p>
        </div>
      </div>
      
      <div className="container">
        <div className="board-container">
          <div className="board-header">
            <div className="board-search">
              <input type="text" placeholder="검색어를 입력하세요" className="search-input" />
              <button className="search-btn">검색</button>
            </div>
            <button className="write-btn">글쓰기</button>
          </div>
          
          <div className="board-categories">
            <button className="category-btn active">전체</button>
            <button className="category-btn">일반</button>
            <button className="category-btn">질문</button>
            <button className="category-btn">정보</button>
            <button className="category-btn">토론</button>
          </div>
          
          <table className="board-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회</th>
                <th>추천</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td className="title-cell">
                  <span className="badge notice">공지</span>
                  <a href="#" className="post-title">첫 번째 게시글입니다.</a>
                  <span className="comment-count">[3]</span>
                </td>
                <td>홍길동</td>
                <td>2024-04-10</td>
                <td>42</td>
                <td>5</td>
              </tr>
              <tr>
                <td>2</td>
                <td className="title-cell">
                  <a href="#" className="post-title">React와 TypeScript를 함께 사용하는 방법</a>
                  <span className="comment-count">[2]</span>
                </td>
                <td>김철수</td>
                <td>2024-04-09</td>
                <td>128</td>
                <td>12</td>
              </tr>
              <tr>
                <td>3</td>
                <td className="title-cell">
                  <span className="badge hot">인기</span>
                  <a href="#" className="post-title">프론트엔드 개발자 취업 준비하기</a>
                  <span className="comment-count">[8]</span>
                </td>
                <td>이영희</td>
                <td>2024-04-08</td>
                <td>256</td>
                <td>24</td>
              </tr>
            </tbody>
          </table>
          
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

export default Board; 