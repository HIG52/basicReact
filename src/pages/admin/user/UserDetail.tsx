import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../../../services/api';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      setError('');
      const res = await apiService.getUserDetail(Number(id));
      setLoading(false);
      if (res.success && res.data) {
        setUser(res.data);
      } else {
        setError(res.message || '데이터 불러오기 실패');
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    const res = await apiService.deleteUser(Number(id));
    if (res.success) {
      navigate('/admin/user');
    } else {
      alert(res.message || '삭제 실패');
    }
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!user) return <div>데이터가 없습니다.</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>회원 상세</h1>
        </div>
      </div>
      <div className="container">
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2>{user.name}</h2>
          <div style={{ color: '#888', marginBottom: 8 }}>
            이메일: {user.email} | 회원구분: {user.role === 'admin' ? '관리자' : '일반회원'} | 가입일: {user.joinDate}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
            <button className="write-btn" onClick={() => navigate(`/admin/user/edit/${id}`)}>수정</button>
            <button className="search-btn" onClick={handleDelete}>삭제</button>
            <button className="search-btn" onClick={() => navigate('/admin/user')}>목록</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail; 