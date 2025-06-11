import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../../services/api';

const NoticeEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      setError('');
      const res = await apiService.getNoticeDetail(Number(id));
      setLoading(false);
      if (res.success && res.data) {
        setTitle(res.data.title);
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
    const res = await apiService.updateNotice(Number(id), { title });
    setLoading(false);
    if (res.success) {
      navigate(`/admin/notice/${id}`);
    } else {
      setError(res.message || '수정 실패');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="container">
          <h1>공지사항 수정</h1>
        </div>
      </div>
      <div className="container">
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto' }}>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="search-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: '100%', marginBottom: 16 }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" className="write-btn" disabled={loading}>수정</button>
            <button type="button" className="search-btn" onClick={() => navigate(`/admin/notice/${id}`)}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoticeEdit; 