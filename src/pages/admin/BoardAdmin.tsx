import React, { useState } from 'react';
import '../../styles/pages.css';

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
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');

  const handleDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleAdd = () => {
    if (!title.trim()) return;
    const newPost: Post = {
      id: posts.length ? posts[0].id + 1 : 1,
      title,
      author: '관리자',
      date: new Date().toISOString().slice(0, 10),
      views: 0,
    };
    setPosts([newPost, ...posts]);
    setTitle('');
  };

  const filteredPosts = posts.filter(p => p.title.includes(search));

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
                    <td>{post.title}</td>
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
        </div>
      </div>
    </div>
  );
};

export default BoardAdmin; 