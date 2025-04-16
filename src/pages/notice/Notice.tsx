import React from 'react';
import '../../styles/pages.css';

const Notice: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>공지사항</h1>
          <p className="page-description">중요한 소식과 업데이트 정보를 확인하세요.</p>
        </div>
      </div>
      
      <div className="container">
        <div className="notice-container">
          <div className="notice-header">
            <div className="notice-search">
              <input type="text" placeholder="검색어를 입력하세요" className="search-input" />
              <button className="search-btn">검색</button>
            </div>
          </div>
          
          <div className="notice-categories">
            <button className="category-btn active">전체</button>
            <button className="category-btn">중요</button>
            <button className="category-btn">일반</button>
            <button className="category-btn">업데이트</button>
          </div>
          
          <div className="notice-list">
            <div className="notice-item important">
              <div className="notice-title">
                <span className="badge">중요</span>
                <h3>시스템 점검 안내 (4/15 02:00-06:00)</h3>
              </div>
              <div className="notice-info">
                <span>작성일: 2024-04-10</span>
                <span>조회수: 156</span>
              </div>
            </div>
            
            <div className="notice-item">
              <div className="notice-title">
                <span className="badge update">업데이트</span>
                <h3>신규 기능 업데이트 안내</h3>
              </div>
              <div className="notice-info">
                <span>작성일: 2024-04-08</span>
                <span>조회수: 89</span>
              </div>
            </div>
            
            <div className="notice-item">
              <div className="notice-title">
                <h3>이용약관 개정 안내</h3>
              </div>
              <div className="notice-info">
                <span>작성일: 2024-04-05</span>
                <span>조회수: 234</span>
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

export default Notice; 