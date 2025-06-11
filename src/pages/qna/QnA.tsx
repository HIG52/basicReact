import React, { useState, useEffect } from 'react';
import '../../styles/pages.css';
import { apiService } from '../../services/api';

const QnA: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [qnaList, setQnaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchQnaList();
    // eslint-disable-next-line
  }, [page, search]);

  const fetchQnaList = async () => {
    setLoading(true);
    setError('');
    const res = await apiService.getQnaList(page, 10, search);
    if (res.success) {
      setQnaList(res.data.qnaList || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } else {
      setError(res.message || 'Q&A 목록 조회 실패');
    }
    setLoading(false);
  };

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };

  if (loading) return <div className="loading">로딩중...</div>;
  if (error) return <div className="error">{error}</div>;

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
              <input type="text" placeholder="검색어를 입력하세요" className="search-input" value={searchInput} onChange={e => setSearchInput(e.target.value)} />
              <button className="search-btn" onClick={handleSearch}>검색</button>
            </div>
          </div>
          
          <div className="qna-list">
            {qnaList.map((item) => (
              <div className="qna-item" key={item.id}>
                <div className="qna-title" style={{ cursor: 'pointer' }} onClick={() => handleToggle(item.id)}>
                  <span className={`status ${item.status}`}>{
                    item.status === 'answered' ? '답변완료' : item.status === 'waiting' ? '답변대기' : '인기질문'
                  }</span>
                  <h3>{item.title}</h3>
                </div>
                <div className="qna-info">
                  <span>작성자: {item.author}</span>
                  <span>작성일: {item.date}</span>
                  <span>조회: {item.views}</span>
                  <span>답변: {item.answers}</span>
                </div>
                {openId === item.id && (
                  <div className="qna-detail" style={{ background: '#f9f9f9', padding: '16px', marginTop: '8px', borderRadius: '8px' }}>
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="board-pagination">
            <button className="pagination-btn" onClick={() => setPage(page - 1)} disabled={page === 1}>&lt;</button>
            {[...Array(totalPages)].map((_, idx) => (
              <button key={idx + 1} className={`pagination-btn${page === idx + 1 ? ' active' : ''}`} onClick={() => setPage(idx + 1)}>{idx + 1}</button>
            ))}
            <button className="pagination-btn" onClick={() => setPage(page + 1)} disabled={page === totalPages}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QnA; 