import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../../../styles/pages.css';
import { apiService } from '../../../services/api';

interface Notice {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
}

const NoticeAdmin: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  const fetchNotices = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiService.getNotices(page, pageSize);
      console.log('API 응답:', res);
      if (res.success) {
        setNotices(res.data?.notices || []);
        setTotalPages(res.data?.totalPages || 1);
        console.log('totalPages:', res.data?.totalPages, 'totalItems:', res.data?.totalItems);
      } else {
        setError(res.message);
      }
    } catch (e) {
      console.error('API 호출 에러:', e);
      setError('공지사항 목록을 불러오지 못했습니다.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotices();
    // eslint-disable-next-line
  }, [page, search]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    const res = await apiService.deleteNotice(id);
    if (res.success) {
      fetchNotices();
    } else {
      alert(res.message || '삭제 실패');
    }
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>공지사항 관리</h1>
          <p className="page-description">공지사항을 작성, 삭제할 수 있습니다.</p>
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
            <button className="write-btn" style={{ flex: 1 }} onClick={() => navigate('/admin/notice/write')}>공지사항 작성</button>
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
              {notices.length === 0 ? (
                <tr><td colSpan={6}>공지사항이 없습니다.</td></tr>
              ) : (
                notices.map((notice) => (
                  <tr key={notice.id}>
                    <td>{notice.id}</td>
                    <td style={{ cursor: 'pointer', color: '#1976d2' }} onClick={() => navigate(`/admin/notice/${notice.id}`)}>{notice.title}</td>
                    <td>{notice.author}</td>
                    <td>{notice.date}</td>
                    <td>{notice.views}</td>
                    <td>
                      <button className="search-btn" onClick={() => handleDelete(notice.id)}>
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

export default NoticeAdmin; 