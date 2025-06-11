import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../../services/api';

const UserEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      setError('');
      const res = await apiService.getUserDetail(Number(id));
      setLoading(false);
      if (res.success && res.data) {
        setName(res.data.name);
        setEmail(res.data.email);
        setRole(res.data.role);
      } else {
        setError(res.message || '데이터 불러오기 실패');
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setLoading(true);
    setError('');
    const res = await apiService.updateUser(Number(id), { name, email, role });
    setLoading(false);
    if (res.success) {
      navigate(`/admin/user/${id}`);
    } else {
      setError(res.message || '수정 실패');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>회원 정보 수정</h1>
        </div>
      </div>
      <div className="container">
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto' }}>
          <input
            type="text"
            placeholder="이름 입력"
            className="search-input"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: '100%', marginBottom: 16 }}
          />
          <input
            type="email"
            placeholder="이메일 입력"
            className="search-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', marginBottom: 16 }}
          />
          <select className="search-input" value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%', marginBottom: 16 }}>
            <option value="user">일반회원</option>
            <option value="admin">관리자</option>
          </select>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" className="write-btn" disabled={loading}>수정</button>
            <button type="button" className="search-btn" onClick={() => navigate(`/admin/user/${id}`)}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit; 