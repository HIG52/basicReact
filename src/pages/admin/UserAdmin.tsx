import React, { useState } from 'react';
import '../../styles/pages.css';

interface User {
  id: number;
  name: string;
  email: string;
  joinDate: string;
}

const initialUsers: User[] = [
  { id: 1, name: '홍길동', email: 'hong@test.com', joinDate: '2024-04-01' },
  { id: 2, name: '김철수', email: 'kim@test.com', joinDate: '2024-04-02' },
];

const UserAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleAdd = () => {
    if (!name.trim() || !email.trim()) return;
    const newUser: User = {
      id: users.length ? users[0].id + 1 : 1,
      name,
      email,
      joinDate: new Date().toISOString().slice(0, 10),
    };
    setUsers([newUser, ...users]);
    setName('');
    setEmail('');
  };

  const filteredUsers = users.filter(u => u.name.includes(search) || u.email.includes(search));

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>회원 관리</h1>
          <p className="page-description">회원 정보를 추가, 삭제할 수 있습니다.</p>
        </div>
      </div>
      <div className="container">
        <div className="board-container">
          <div className="board-header">
            <div className="board-search">
              <input
                type="text"
                placeholder="이름 또는 이메일 검색"
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
              placeholder="이름 입력"
              className="search-input"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ flex: 1 }}
            />
            <input
              type="email"
              placeholder="이메일 입력"
              className="search-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ flex: 1 }}
            />
            <button className="write-btn" onClick={handleAdd}>회원 추가</button>
          </div>
          <table className="board-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>이메일</th>
                <th>가입일</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr><td colSpan={5}>회원이 없습니다.</td></tr>
              ) : (
                filteredUsers.map((user, idx) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.joinDate}</td>
                    <td>
                      <button className="search-btn" onClick={() => handleDelete(user.id)}>
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

export default UserAdmin; 