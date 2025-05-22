import React, { useState } from 'react';
import '../../styles/pages.css';

interface Notice {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
}

const initialNotices: Notice[] = [
  { id: 1, title: '공지사항 예시입니다.', author: '관리자', date: '2024-04-10', views: 100 },
  { id: 2, title: '두 번째 공지사항', author: '관리자', date: '2024-04-09', views: 80 },
];

const NoticeAdmin: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');

  const handleDelete = (id: number) => {
    setNotices(notices.filter(notice => notice.id !== id));
  };

  const handleAdd = () => {
    if (!title.trim()) return;
    const newNotice: Notice = {
      id: notices.length ? notices[0].id + 1 : 1,
      title,
      author: '관리자',
      date: new Date().toISOString().slice(0, 10),
      views: 0,
    };
    setNotices([newNotice, ...notices]);
    setTitle('');
  };

  const filteredNotices = notices.filter(n => n.title.includes(search));

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
            <input
              type="text"
              placeholder="공지사항 제목 입력"
              className="search-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ flex: 1 }}
            />
            <button className="write-btn" onClick={handleAdd}>공지사항 작성</button>
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
              {filteredNotices.length === 0 ? (
                <tr><td colSpan={6}>공지사항이 없습니다.</td></tr>
              ) : (
                filteredNotices.map((notice, idx) => (
                  <tr key={notice.id}>
                    <td>{notice.id}</td>
                    <td>{notice.title}</td>
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
        </div>
      </div>
    </div>
  );
};

export default NoticeAdmin; 