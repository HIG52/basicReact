import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages.css';
import { apiService } from '../../services/api';

interface QnA {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
}

const QnAAdmin: React.FC = () => {
  const [qnas, setQnas] = useState<QnA[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  const fetchQnas = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiService.getQnaList(page, pageSize, search);
      if (res.success) {
        setQnas(res.data?.list || []);
      } else {
        setError(res.message);
      }
    } catch (e) {
      setError('Q&A 목록을 불러오지 못했습니다.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQnas();
    // eslint-disable-next-line
  }, [page, search]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    const res = await apiService.deleteQna(id);
    if (res.success) {
      fetchQnas();
    } else {
      alert(res.message || '삭제 실패');
    }
  };

  const totalPages = 1; // 서버에서 totalPages 받아오면 적용

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>Q&A 관리</h1>
          <p className="page-description">Q&A 게시글을 관리할 수 있습니다.</p>
        </div>
      </div>
      <div className="container">
        <div className="board-container">
          <div className="board-header">
            <div className="board-search">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="search-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button className="search-btn">검색</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
            <button className="write-btn" style={{ flex: 1 }} onClick={() => navigate('/admin/qna/write')}>Q&A 작성</button>
          </div>
          <table className="board-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {qnas.length === 0 ? (
                <tr><td colSpan={6}>Q&A가 없습니다.</td></tr>
              ) : (
                qnas.map((qna) => (
                  <tr key={qna.id}>
                    <td>{qna.id}</td>
                    <td style={{ cursor: 'pointer', color: '#1976d2' }} onClick={() => navigate(`/admin/qna/${qna.id}`)}>{qna.title}</td>
                    <td>{qna.author}</td>
                    <td>{qna.date}</td>
                    <td>{qna.views}</td>
                    <td>
                      <button className="search-btn" onClick={() => handleDelete(qna.id)}>
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* 페이징 */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0', gap: 4 }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={page === i + 1 ? 'write-btn' : 'search-btn'}
                onClick={() => setPage(i + 1)}
                style={{ minWidth: 32 }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QnAAdmin; 