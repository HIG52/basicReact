import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/pages.css';
import { apiService } from '../../../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  role: string;
}

const UserAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiService.getUserList(page, pageSize, search);
      if (res.success) {
        setUsers(res.data?.list || []);
      } else {
        setError(res.message);
      }
    } catch (e) {
      setError('회원 목록을 불러오지 못했습니다.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [page, search]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    const res = await apiService.deleteUser(id);
    if (res.success) {
      fetchUsers();
    } else {
      alert(res.message || '삭제 실패');
    }
  };

  const handleAdd = async () => {
    if (!name.trim() || !email.trim()) return;
    const res = await apiService.createUser({ name, email, role });
    if (res.success) {
      setName('');
      setEmail('');
      setRole('user');
      fetchUsers();
    } else {
      alert(res.message || '회원 추가 실패');
    }
  };

  const totalPages = 1; // 서버에서 totalPages 받아오면 적용

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>회원 관리</h1>
          <p className="page-description">회원 정보를 추가, 삭제, 상세, 수정할 수 있습니다.</p>
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
            <select className="search-input" value={role} onChange={e => setRole(e.target.value)} style={{ flex: 1 }}>
              <option value="user">일반회원</option>
              <option value="admin">관리자</option>
            </select>
            <button className="write-btn" onClick={handleAdd}>회원 추가</button>
          </div>
          <table className="board-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>이메일</th>
                <th>회원구분</th>
                <th>가입일</th>
                <th>상세</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan={7}>회원이 없습니다.</td></tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role === 'admin' ? '관리자' : '일반회원'}</td>
                    <td>{user.joinDate}</td>
                    <td>
                      <button className="search-btn" onClick={() => navigate(`/admin/user/${user.id}`)}>
                        상세
                      </button>
                    </td>
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

export default UserAdmin; 