import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../../styles/pages.css';
import { apiService } from '../../services/api';

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
}

const initialPosts: Post[] = [
  { id: 1, title: '첫 번째 게시글입니다.', author: '홍길동', date: '2024-04-10', views: 42 },
  { id: 2, title: 'React와 TypeScript를 함께 사용하는 방법', author: '김철수', date: '2024-04-09', views: 128 },
];

const BoardAdmin: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiService.getBoardList(page, pageSize, search);
      if (res.success) {
        setPosts(res.data?.list || []);
      } else {
        setError(res.message);
      }
    } catch (e) {
      setError('게시글 목록을 불러오지 못했습니다.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, [page, search]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    const res = await apiService.deleteBoard(id);
    if (res.success) {
      fetchPosts();
    } else {
      alert(res.message || '삭제 실패');
    }
  };

  const handleAdd = () => {
    navigate('/admin/board/write');
  };

  const filteredPosts = posts;
  const totalPages = 1;

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>게시글 관리</h1>
          <p className="page-description">게시글을 작성, 삭제할 수 있습니다.</p>
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
            <input
              type="text"
              placeholder="게시글 제목 입력"
              className="search-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ flex: 1 }}
              disabled
            />
            <button className="write-btn" onClick={handleAdd}>게시글 작성</button>
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
              {filteredPosts.length === 0 ? (
                <tr><td colSpan={6}>게시글이 없습니다.</td></tr>
              ) : (
                filteredPosts.map((post, idx) => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td style={{ cursor: 'pointer', color: '#1976d2' }} onClick={() => navigate(`/admin/board/${post.id}`)}>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.date}</td>
                    <td>{post.views}</td>
                    <td>
                      <button className="search-btn" onClick={() => handleDelete(post.id)}>
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

export default BoardAdmin; 